import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Pill, Mail, Lock } from 'lucide-react';
import heroImage from '@/assets/pharmacy-hero.jpg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to MedRequest!",
        });
        navigate('/');
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23206b85' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Hero Section */}
        <div className="hidden lg:block animate-fade-in">
          <div className="relative group">
            <img 
              src={heroImage} 
              alt="Modern pharmacy interior" 
              className="w-full h-full object-cover rounded-lg shadow-[var(--shadow-float)] group-hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-10 rounded-lg"></div>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex flex-col justify-center space-y-6 animate-slide-in">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-[var(--gradient-primary)] rounded-xl shadow-[var(--shadow-glow)] animate-bounce-subtle">
                <Pill className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">MedRequest</h1>
            </div>
            <p className="text-medical-gray text-lg max-w-md mx-auto">
              Your trusted medicine request platform - connecting you with local pharmacies instantly
            </p>
          </div>

          <Card className="shadow-[var(--shadow-float)] border-0 bg-[var(--gradient-card)] backdrop-blur-sm animate-scale-in hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-medical-gray" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-medical-gray" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  variant="medical" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-medical-gray">
                  Demo: Use any email and password (min 6 characters)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};