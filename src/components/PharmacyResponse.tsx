
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, IndianRupee, Package, CheckCircle, XCircle } from 'lucide-react';

interface PharmacyResponseProps {
  response: {
    id: string;
    pharmacyName: string;
    address: string;
    distance: string;
    price: number;
    availability: 'available' | 'out-of-stock' | 'alternative';
    estimatedTime: string;
    timestamp: Date;
  };
}

export const PharmacyResponse = ({ response }: PharmacyResponseProps) => {
  const getAvailabilityInfo = (availability: string) => {
    switch (availability) {
      case 'available':
        return {
          icon: CheckCircle,
          text: 'Available',
          variant: 'default' as const,
          bgColor: 'bg-medical-green/10',
          iconColor: 'text-medical-green'
        };
      case 'out-of-stock':
        return {
          icon: XCircle,
          text: 'Out of Stock',
          variant: 'destructive' as const,
          bgColor: 'bg-destructive/10',
          iconColor: 'text-destructive'
        };
      default:
        return {
          icon: Package,
          text: 'Alternative Available',
          variant: 'secondary' as const,
          bgColor: 'bg-accent/10',
          iconColor: 'text-accent'
        };
    }
  };

  const availabilityInfo = getAvailabilityInfo(response.availability);
  const AvailabilityIcon = availabilityInfo.icon;

  return (
    <Card className={`animate-slide-in border transition-all duration-300 hover:shadow-md ${availabilityInfo.bgColor}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{response.pharmacyName}</h3>
              <Badge variant={availabilityInfo.variant} className="flex items-center space-x-1">
                <AvailabilityIcon className="h-3 w-3" />
                <span>{availabilityInfo.text}</span>
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center space-x-2 text-medical-gray">
                <MapPin className="h-4 w-4" />
                <span>{response.address}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-medical-gray">
                <Clock className="h-4 w-4" />
                <span>{response.distance} • {response.estimatedTime}</span>
              </div>
              
              {response.availability === 'available' && (
                <div className="flex items-center space-x-2 text-medical-gray">
                  <IndianRupee className="h-4 w-4" />
                  <span className="font-medium text-foreground">₹{response.price}</span>
                </div>
              )}
            </div>
            
            <div className="text-xs text-medical-gray">
              Responded {Math.floor((Date.now() - response.timestamp.getTime()) / 1000)}s ago
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
