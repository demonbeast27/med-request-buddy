
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PharmacyResponse } from '@/components/PharmacyResponse';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, CheckCircle, Loader2 } from 'lucide-react';

interface MockPharmacyResponse {
  id: string;
  pharmacyName: string;
  address: string;
  distance: string;
  price: number;
  availability: 'available' | 'out-of-stock' | 'alternative';
  estimatedTime: string;
  timestamp: Date;
}

export const LoadingState = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [pharmacyResponses, setPharmacyResponses] = useState<MockPharmacyResponse[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const medicineName = searchParams.get('medicine') || 'Medicine';
  const city = searchParams.get('city') || 'your city';

  const stages = [
    'Sending request to nearby pharmacies...',
    'Pharmacies are checking availability...',
    'Collecting responses and prices...',
    'Finalizing results...'
  ];

  const mockPharmacies = [
    { name: 'MediCare Pharmacy', address: 'MG Road, Sector 14', distance: '0.8 km' },
    { name: 'Apollo Pharmacy', address: 'Park Street, Central Mall', distance: '1.2 km' },
    { name: 'Wellness Forever', address: 'Brigade Road, Corner', distance: '1.5 km' },
    { name: 'Netmeds Retail', address: 'Commercial Street', distance: '2.1 km' },
    { name: 'PharmEasy Store', address: 'Indiranagar, 100 Feet Road', distance: '2.3 km' }
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          setIsComplete(true);
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 800);

    const stageInterval = setInterval(() => {
      setCurrentStage(prev => Math.min(prev + 1, stages.length - 1));
    }, 3000);

    // Simulate pharmacy responses coming in
    const responseTimeouts: NodeJS.Timeout[] = [];
    
    mockPharmacies.forEach((pharmacy, index) => {
      const timeout = setTimeout(() => {
        const mockResponse: MockPharmacyResponse = {
          id: `pharmacy-${index}`,
          pharmacyName: pharmacy.name,
          address: pharmacy.address,
          distance: pharmacy.distance,
          price: Math.floor(Math.random() * 200) + 50,
          availability: Math.random() > 0.7 ? 'out-of-stock' : 'available',
          estimatedTime: `${Math.floor(Math.random() * 30) + 10} mins`,
          timestamp: new Date()
        };
        
        setPharmacyResponses(prev => [...prev, mockResponse]);
      }, (index + 1) * 2000 + Math.random() * 3000);
      
      responseTimeouts.push(timeout);
    });

    // Auto-redirect after completion
    const redirectTimeout = setTimeout(() => {
      if (isComplete) {
        navigate('/success');
      }
    }, 8000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
      responseTimeouts.forEach(timeout => clearTimeout(timeout));
      clearTimeout(redirectTimeout);
    };
  }, [navigate, isComplete]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="shadow-[var(--shadow-card)] border-0 bg-[var(--gradient-card)] animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-[var(--gradient-primary)] rounded-lg">
                {isComplete ? (
                  <CheckCircle className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <Loader2 className="h-5 w-5 text-primary-foreground animate-spin" />
                )}
              </div>
              <span>
                {isComplete ? 'Request Complete!' : 'Processing Your Request'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Finding "{medicineName}" in {city}
              </h2>
              <p className="text-medical-gray">
                {stages[currentStage]}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-medical-gray">Progress</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3 animate-pulse" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{mockPharmacies.length}</div>
                <div className="text-sm text-medical-gray">Pharmacies Contacted</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-medical-green">{pharmacyResponses.length}</div>
                <div className="text-sm text-medical-gray">Responses Received</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-accent">
                  {pharmacyResponses.filter(r => r.availability === 'available').length}
                </div>
                <div className="text-sm text-medical-gray">Available</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">
                  {isComplete ? '100%' : `${Math.round(progress)}%`}
                </div>
                <div className="text-sm text-medical-gray">Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {pharmacyResponses.length > 0 && (
          <Card className="shadow-[var(--shadow-card)] border-0 bg-[var(--gradient-card)] animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Live Responses</span>
                </span>
                <Badge variant="secondary" className="animate-pulse">
                  <Clock className="h-3 w-3 mr-1" />
                  Real-time
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {pharmacyResponses.map((response) => (
                  <PharmacyResponse 
                    key={response.id} 
                    response={response}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
