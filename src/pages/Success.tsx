import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PharmacyResults } from '@/components/PharmacyResults';
import { CheckCircle, Home, FileText } from 'lucide-react';

export const Success = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-6 pt-16 space-y-8 animate-fade-in">
        <Card className="shadow-[var(--shadow-float)] border-0 text-center bg-[var(--gradient-card)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] animate-scale-in">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <CheckCircle className="h-16 w-16 text-medical-green animate-bounce-subtle" />
                <div className="absolute inset-0 rounded-full bg-medical-green/20 animate-ping"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Request Sent Successfully!
              </h1>
              <p className="text-lg text-medical-gray">
                Your medicine request has been sent to pharmacies in your area.
              </p>
            </div>
            
            <div className="bg-[var(--gradient-hero)] rounded-lg p-6 space-y-3 border border-primary/20 shadow-[var(--shadow-glow)] animate-slide-in">
              <p className="text-base text-primary font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span>What happens next?</span>
              </p>
              <ul className="text-sm text-medical-gray text-left space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  <span>Nearby pharmacies will receive your request</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  <span>They'll check availability and respond with prices</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  <span>You'll receive notifications about available options</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  <span>You can choose the best offer and complete your purchase</span>
                </li>
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

        {/* Pharmacy Results Section */}
        <Card className="shadow-[var(--shadow-float)] border-0 bg-[var(--gradient-card)] animate-fade-in">
          <CardContent className="p-8">
            <PharmacyResults />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};