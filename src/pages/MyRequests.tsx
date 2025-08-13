import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Pill, Package, Plus } from 'lucide-react';

interface MedicineRequest {
  id: string;
  city: string;
  pincode: string;
  medName: string;
  quantity: string;
  composition: string;
  timestamp: string;
  userId: string;
  exactBrandOnly: boolean;
}

export const MyRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<MedicineRequest[]>([]);

  useEffect(() => {
    // Load requests from localStorage
    const storedRequests = JSON.parse(localStorage.getItem('medapp_requests') || '[]');
    // Filter requests for current user
    const userRequests = storedRequests.filter((req: MedicineRequest) => req.userId === user?.id);
    setRequests(userRequests.reverse()); // Show newest first
  }, [user?.id]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = () => {
    // Mock status - in real app, this would come from API
    const statuses = ['Pending', 'Sent to Pharmacies', 'Responses Received'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const variant = randomStatus === 'Pending' ? 'secondary' : 
                   randomStatus === 'Sent to Pharmacies' ? 'default' : 'destructive';
    
    return <Badge variant={variant}>{randomStatus}</Badge>;
  };

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center space-y-6 py-16">
            <Pill className="h-16 w-16 text-medical-gray mx-auto" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">No Requests Yet</h1>
              <p className="text-lg text-medical-gray">
                You haven't made any medicine requests yet.
              </p>
            </div>
            <Link to="/">
              <Button variant="medical" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Request
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Requests</h1>
            <p className="text-medical-gray mt-2">
              Track all your medicine requests in one place
            </p>
          </div>
          <Link to="/">
            <Button variant="medical">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="shadow-[var(--shadow-card)] border-0">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="h-5 w-5 text-primary" />
                    <span className="capitalize">{request.medName}</span>
                  </CardTitle>
                  {getStatusBadge()}
                </div>
                <div className="flex items-center space-x-4 text-sm text-medical-gray">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(request.timestamp)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{request.city}, {request.pincode}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Composition:</span>
                      <span className="ml-2 text-medical-gray">{request.composition}</span>
                    </div>
                    <div className="text-sm flex items-center space-x-2">
                      <Package className="h-4 w-4 text-medical-gray" />
                      <span className="font-medium">Quantity:</span>
                      <span className="text-medical-gray">{request.quantity || '1'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Brand Preference:</span>
                      <span className="ml-2 text-medical-gray">
                        {request.exactBrandOnly ? 'Exact brand only' : 'Any brand with same composition'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};