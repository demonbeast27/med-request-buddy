import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, FileText } from 'lucide-react';

export const Success = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-2xl mx-auto p-6 pt-16">
        <Card className="shadow-[var(--shadow-card)] border-0 text-center">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-medical-green" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Request Sent Successfully!
              </h1>
              <p className="text-lg text-medical-gray">
                Your medicine request has been sent to pharmacies in your area.
              </p>
            </div>
            
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <p className="text-sm text-medical-gray">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-sm text-medical-gray text-left space-y-1">
                <li>• Nearby pharmacies will receive your request</li>
                <li>• They'll check availability and respond with prices</li>
                <li>• You'll receive notifications about available options</li>
                <li>• You can choose the best offer and complete your purchase</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="medical" size="lg" className="w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Request Another Medicine
                </Button>
              </Link>
              <Link to="/my-requests">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <FileText className="h-4 w-4 mr-2" />
                  View My Requests
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};