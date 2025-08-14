import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { getMedicinesByName } from '@/data/medicines';
import { MapPin, Hash, Pill, Package, Search } from 'lucide-react';

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    city: '',
    pincode: '',
    medicineName: '',
    quantity: '',
    exactBrandOnly: false
  });
  
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  const handleMedicineSearch = (value: string) => {
    setFormData({ ...formData, medicineName: value });
    
    if (value.length >= 2) {
      const results = getMedicinesByName(value);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
      setSelectedMedicine(null);
    }
  };

  const selectMedicine = (medicine: any) => {
    setFormData({ ...formData, medicineName: medicine.name });
    setSelectedMedicine(medicine);
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.city || !formData.pincode || !formData.medicineName) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create request data
    const requestData = {
      city: formData.city,
      pincode: formData.pincode,
      medName: formData.medicineName,
      quantity: formData.quantity || '1',
      composition: selectedMedicine?.composition || 'Unknown',
      timestamp: new Date().toISOString(),
      userId: user?.id,
      exactBrandOnly: formData.exactBrandOnly
    };

    // Mock API call - just log to console
    console.log('Medicine request submitted:', requestData);

    // Store request in localStorage for "My Requests" page
    const existingRequests = JSON.parse(localStorage.getItem('medapp_requests') || '[]');
    const newRequest = { ...requestData, id: Date.now().toString() };
    localStorage.setItem('medapp_requests', JSON.stringify([...existingRequests, newRequest]));

    // Navigate to success page
    navigate('/success');
  };

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground bg-[var(--gradient-hero)] rounded-2xl p-8 mb-6">
            Request Medicine
          </h1>
          <p className="text-lg text-medical-gray max-w-2xl mx-auto">
            Find and request medicines from pharmacies in your area with our intelligent search system
          </p>
        </div>

        <Card className="shadow-[var(--shadow-card)] border-0 animate-scale-in bg-[var(--gradient-card)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <div className="p-2 bg-[var(--gradient-primary)] rounded-lg animate-bounce-subtle">
                <Pill className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>Medicine Request Form</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-medical-gray" />
                    <Select value={formData.city} onValueChange={(value) => setFormData({...formData, city: value})}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-medical-gray" />
                    <Input
                      id="pincode"
                      type="number"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="medicine">Medicine Name *</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-medical-gray" />
                  <Input
                    id="medicine"
                    type="text"
                    placeholder="Search medicine name or brand"
                    value={formData.medicineName}
                    onChange={(e) => handleMedicineSearch(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                
                {showResults && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full bg-card border border-border rounded-md shadow-[var(--shadow-float)] mt-1 animate-scale-in backdrop-blur-sm">
                    {searchResults.map((medicine, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-[var(--gradient-primary)] hover:text-primary-foreground cursor-pointer border-b border-border last:border-b-0 transition-[var(--transition-smooth)] hover:scale-105 transform-gpu"
                        onClick={() => selectMedicine(medicine)}
                      >
                        <div className="font-medium">{medicine.name}</div>
                        <div className="text-sm opacity-75">{medicine.composition}</div>
                        <div className="text-xs opacity-60 mt-1">
                          Brands: {medicine.brands.slice(0, 3).join(', ')}
                          {medicine.brands.length > 3 && ` +${medicine.brands.length - 3} more`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (Optional)</Label>
                <div className="relative">
                  <Package className="absolute left-3 top-3 h-4 w-4 text-medical-gray" />
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity (default: 1)"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="pl-10"
                    min="1"
                  />
                </div>
              </div>

              {selectedMedicine && (
                <div className="p-4 bg-[var(--gradient-hero)] rounded-lg space-y-3 animate-slide-in border border-primary/20 shadow-[var(--shadow-glow)]">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="exact-brand"
                      checked={formData.exactBrandOnly}
                      onCheckedChange={(checked) => setFormData({...formData, exactBrandOnly: checked})}
                    />
                    <Label htmlFor="exact-brand" className="text-sm font-medium">
                      Exact brand only (otherwise, show all brands with same composition)
                    </Label>
                  </div>
                  
                  <div className="text-sm space-y-2 p-3 bg-card/50 rounded-md backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <strong>Composition:</strong> {selectedMedicine.composition}
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-accent rounded-full mt-1.5"></span>
                      <div>
                        <strong>Available brands:</strong>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {selectedMedicine.brands.map((brand: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" variant="floating" size="lg" className="w-full text-lg font-semibold animate-glow-pulse">
                Submit Request
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"></div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};