import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Phone, 
  Star, 
  CheckCircle, 
  XCircle, 
  Package,
  Navigation,
  MessageCircle
} from 'lucide-react';

interface PharmacyOffer {
  id: string;
  pharmacyName: string;
  address: string;
  distance: string;
  price: number;
  availability: 'available' | 'out-of-stock' | 'alternative';
  estimatedTime: string;
  rating: number;
  reviewCount: number;
  phone: string;
  isVerified: boolean;
  discount?: number;
  originalPrice?: number;
}

const mockPharmacyOffers: PharmacyOffer[] = [
  {
    id: '1',
    pharmacyName: 'MediCare Plus Pharmacy',
    address: 'MG Road, Sector 14, Near Metro Station',
    distance: '0.8 km',
    price: 145,
    originalPrice: 165,
    discount: 12,
    availability: 'available',
    estimatedTime: '15 mins',
    rating: 4.8,
    reviewCount: 342,
    phone: '+91 98765 43210',
    isVerified: true
  },
  {
    id: '2',
    pharmacyName: 'Apollo Pharmacy',
    address: 'Park Street, Central Mall, Ground Floor',
    distance: '1.2 km',
    price: 155,
    availability: 'available',
    estimatedTime: '20 mins',
    rating: 4.6,
    reviewCount: 289,
    phone: '+91 98765 43211',
    isVerified: true
  },
  {
    id: '3',
    pharmacyName: 'Wellness Forever',
    address: 'Brigade Road, Corner Shop',
    distance: '1.5 km',
    price: 168,
    availability: 'alternative',
    estimatedTime: '25 mins',
    rating: 4.4,
    reviewCount: 156,
    phone: '+91 98765 43212',
    isVerified: false
  },
  {
    id: '4',
    pharmacyName: 'Netmeds Retail',
    address: 'Commercial Street, Shop 45',
    distance: '2.1 km',
    price: 0,
    availability: 'out-of-stock',
    estimatedTime: '30 mins',
    rating: 4.5,
    reviewCount: 201,
    phone: '+91 98765 43213',
    isVerified: true
  },
  {
    id: '5',
    pharmacyName: 'PharmEasy Store',
    address: 'Indiranagar, 100 Feet Road',
    distance: '2.3 km',
    price: 152,
    availability: 'available',
    estimatedTime: '35 mins',
    rating: 4.7,
    reviewCount: 378,
    phone: '+91 98765 43214',
    isVerified: true
  }
];

export const PharmacyResults = () => {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-medical-gray'
        }`}
      />
    ));
  };

  const availableOffers = mockPharmacyOffers.filter(offer => offer.availability === 'available');
  const alternativeOffers = mockPharmacyOffers.filter(offer => offer.availability === 'alternative');
  const outOfStockOffers = mockPharmacyOffers.filter(offer => offer.availability === 'out-of-stock');

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Medicine Found at {availableOffers.length} Pharmacies
        </h2>
        <p className="text-medical-gray">
          Compare prices and choose the best option for you
        </p>
      </div>

      {/* Available Offers */}
      {availableOffers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-medical-green" />
            <span>Available Now ({availableOffers.length})</span>
          </h3>
          <div className="grid gap-4">
            {availableOffers.map((offer) => {
              const availabilityInfo = getAvailabilityInfo(offer.availability);
              const AvailabilityIcon = availabilityInfo.icon;

              return (
                <Card 
                  key={offer.id} 
                  className={`transition-all duration-300 hover:shadow-[var(--shadow-hover)] border animate-fade-in ${availabilityInfo.bgColor}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-foreground text-lg">{offer.pharmacyName}</h3>
                              {offer.isVerified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(offer.rating)}
                              <span className="text-sm text-medical-gray ml-2">
                                {offer.rating} ({offer.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <Badge variant={availabilityInfo.variant} className="flex items-center space-x-1">
                            <AvailabilityIcon className="h-3 w-3" />
                            <span>{availabilityInfo.text}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2 text-medical-gray">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{offer.address}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-medical-gray">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{offer.distance} • {offer.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                        <div className="text-right space-y-1">
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="h-5 w-5 text-medical-gray" />
                            <span className="text-2xl font-bold text-foreground">₹{offer.price}</span>
                          </div>
                          {offer.discount && offer.originalPrice && (
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-medical-gray line-through">₹{offer.originalPrice}</span>
                              <Badge variant="outline" className="text-medical-green border-medical-green">
                                {offer.discount}% OFF
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col space-y-2 w-full lg:w-auto">
                          <Button variant="medical" className="w-full lg:w-auto">
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Alternative Offers */}
      {alternativeOffers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Package className="h-5 w-5 text-accent" />
            <span>Alternative Available ({alternativeOffers.length})</span>
          </h3>
          <div className="grid gap-4">
            {alternativeOffers.map((offer) => {
              const availabilityInfo = getAvailabilityInfo(offer.availability);
              const AvailabilityIcon = availabilityInfo.icon;

              return (
                <Card 
                  key={offer.id} 
                  className={`transition-all duration-300 hover:shadow-[var(--shadow-hover)] border animate-fade-in ${availabilityInfo.bgColor}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-foreground text-lg">{offer.pharmacyName}</h3>
                              {offer.isVerified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(offer.rating)}
                              <span className="text-sm text-medical-gray ml-2">
                                {offer.rating} ({offer.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <Badge variant={availabilityInfo.variant} className="flex items-center space-x-1">
                            <AvailabilityIcon className="h-3 w-3" />
                            <span>{availabilityInfo.text}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2 text-medical-gray">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{offer.address}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-medical-gray">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{offer.distance} • {offer.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                        <div className="text-right space-y-1">
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="h-5 w-5 text-medical-gray" />
                            <span className="text-2xl font-bold text-foreground">₹{offer.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 w-full lg:w-auto">
                          <Button variant="outline" className="w-full lg:w-auto">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Ask About Alternative
                          </Button>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                              <Navigation className="h-4 w-4 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Out of Stock */}
      {outOfStockOffers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-destructive" />
            <span>Currently Out of Stock ({outOfStockOffers.length})</span>
          </h3>
          <div className="grid gap-4">
            {outOfStockOffers.map((offer) => {
              const availabilityInfo = getAvailabilityInfo(offer.availability);
              const AvailabilityIcon = availabilityInfo.icon;

              return (
                <Card 
                  key={offer.id} 
                  className={`transition-all duration-300 hover:shadow-[var(--shadow-hover)] border animate-fade-in ${availabilityInfo.bgColor} opacity-60`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-foreground text-lg">{offer.pharmacyName}</h3>
                              {offer.isVerified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(offer.rating)}
                              <span className="text-sm text-medical-gray ml-2">
                                {offer.rating} ({offer.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <Badge variant={availabilityInfo.variant} className="flex items-center space-x-1">
                            <AvailabilityIcon className="h-3 w-3" />
                            <span>{availabilityInfo.text}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2 text-medical-gray">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{offer.address}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-medical-gray">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{offer.distance} • {offer.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 w-full lg:w-auto">
                        <Button variant="outline" className="w-full lg:w-auto" disabled>
                          Currently Unavailable
                        </Button>
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <Phone className="h-4 w-4 mr-2" />
                          Call for Updates
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};