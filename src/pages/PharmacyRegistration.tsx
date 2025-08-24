import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  FileText, 
  Upload,
  CheckCircle,
  Star,
  Users
} from 'lucide-react';

const pharmacyRegistrationSchema = z.object({
  // Basic Information
  pharmacyName: z.string().min(2, 'Pharmacy name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  licenseNumber: z.string().min(5, 'License number must be at least 5 characters'),
  gstNumber: z.string().min(15, 'GST number must be 15 characters').max(15, 'GST number must be 15 characters'),
  
  // Contact Information
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  alternatePhone: z.string().optional(),
  
  // Address Information
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  pincode: z.string().min(6, 'Pincode must be 6 characters').max(6, 'Pincode must be 6 characters'),
  
  // Business Information
  establishedYear: z.string().min(4, 'Established year is required'),
  pharmacistName: z.string().min(2, 'Pharmacist name must be at least 2 characters'),
  pharmacistLicense: z.string().min(5, 'Pharmacist license must be at least 5 characters'),
  
  // Operational Details
  operatingHours: z.string().min(5, 'Operating hours are required'),
  deliveryRadius: z.string().min(1, 'Delivery radius is required'),
  specialties: z.array(z.string()).min(1, 'At least one specialty is required'),
  
  // Additional Information
  description: z.string().min(20, 'Description must be at least 20 characters'),
  
  // Agreements
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  dataProcessingAccepted: z.boolean().refine(val => val === true, 'You must accept data processing terms')
});

type PharmacyRegistrationForm = z.infer<typeof pharmacyRegistrationSchema>;

const specialtyOptions = [
  'General Medicines',
  'Prescription Drugs',
  'OTC Medications',
  'Ayurvedic Medicines',
  'Homeopathic Medicines',
  'Surgical Supplies',
  'Medical Equipment',
  'Baby Care Products',
  'Health Supplements',
  'Diabetic Care',
  'Elderly Care',
  'Women\'s Health'
];

const stateOptions = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const PharmacyRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const form = useForm<PharmacyRegistrationForm>({
    resolver: zodResolver(pharmacyRegistrationSchema),
    defaultValues: {
      specialties: [],
      termsAccepted: false,
      dataProcessingAccepted: false
    }
  });

  const onSubmit = async (data: PharmacyRegistrationForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Submitted Successfully!",
        description: "We'll review your application and get back to you within 2-3 business days.",
      });
      
      navigate('/success');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSpecialty = (specialty: string) => {
    const updatedSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(s => s !== specialty)
      : [...selectedSpecialties, specialty];
    
    setSelectedSpecialties(updatedSpecialties);
    form.setValue('specialties', updatedSpecialties);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 pt-16 space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Join Our Pharmacy Network
          </h1>
          <p className="text-lg text-medical-gray max-w-2xl mx-auto">
            Partner with us to reach more customers and grow your pharmacy business. 
            Fill out the registration form below to get started.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[var(--gradient-primary)] rounded-lg flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Expand Your Reach</h3>
              <p className="text-sm text-medical-gray">Connect with customers in your area</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[var(--gradient-primary)] rounded-lg flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Build Your Reputation</h3>
              <p className="text-sm text-medical-gray">Get reviews and build trust</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[var(--gradient-primary)] rounded-lg flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Streamlined Operations</h3>
              <p className="text-sm text-medical-gray">Manage orders efficiently</p>
            </div>
          </div>
        </div>

        <Card className="shadow-[var(--shadow-float)] border-0 bg-[var(--gradient-card)]">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-6 w-6" />
              <span>Pharmacy Registration Form</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Basic Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pharmacyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pharmacy Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pharmacy name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter owner name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pharmacy License Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter license number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gstNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter 15-digit GST number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span>Contact Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="alternatePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternate Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter alternate phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Address Information</span>
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter complete address with landmarks" 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border border-border z-50">
                              {stateOptions.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pincode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Business Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="establishedYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Established Year *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter year (e.g., 2010)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pharmacistName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Licensed Pharmacist Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pharmacist name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pharmacistLicense"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pharmacist License Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pharmacist license" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Operational Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Operational Details</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="operatingHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operating Hours *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Mon-Sun: 8:00 AM - 10:00 PM" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="deliveryRadius"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Radius (km) *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Specialties & Services Offered *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {specialtyOptions.map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <Checkbox
                            id={specialty}
                            checked={selectedSpecialties.includes(specialty)}
                            onCheckedChange={() => toggleSpecialty(specialty)}
                          />
                          <Label htmlFor={specialty} className="text-sm cursor-pointer">
                            {specialty}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {selectedSpecialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedSpecialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pharmacy Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your pharmacy, services, and what makes you unique" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Document Upload Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Required Documents</span>
                  </h3>
                  
                  <div className="bg-accent/10 p-4 rounded-lg space-y-2">
                    <p className="text-sm text-medical-gray">
                      Please prepare the following documents for upload after form submission:
                    </p>
                    <ul className="text-sm text-medical-gray space-y-1 ml-4">
                      <li>• Pharmacy License Certificate</li>
                      <li>• GST Registration Certificate</li>
                      <li>• Pharmacist License Certificate</li>
                      <li>• Business Registration Documents</li>
                      <li>• Address Proof</li>
                      <li>• Bank Account Details</li>
                    </ul>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Terms & Conditions</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer">
                              I accept the{' '}
                              <Button variant="link" className="p-0 h-auto text-primary">
                                Terms and Conditions
                              </Button>
                              {' '}and{' '}
                              <Button variant="link" className="p-0 h-auto text-primary">
                                Partnership Agreement
                              </Button>
                              *
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataProcessingAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer">
                              I consent to data processing as described in the{' '}
                              <Button variant="link" className="p-0 h-auto text-primary">
                                Privacy Policy
                              </Button>
                              *
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    variant="medical"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting Registration...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};