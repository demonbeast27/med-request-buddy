import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Pill, LogOut, User } from 'lucide-react';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border shadow-[var(--shadow-soft)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-1 bg-[var(--gradient-primary)] rounded-lg group-hover:scale-110 transition-[var(--transition-bounce)] shadow-[var(--shadow-glow)]">
                <Pill className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-[var(--transition-smooth)]">MedRequest</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/">
                <Button
                  variant={isActive('/') ? 'medical' : 'ghost'}
                  size="sm"
                >
                  Home
                </Button>
              </Link>
              <Link to="/my-requests">
                <Button
                  variant={isActive('/my-requests') ? 'medical' : 'ghost'}
                  size="sm"
                >
                  My Requests
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-medical-gray" />
              <span className="text-sm text-medical-gray">{user.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-4">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'medical' : 'ghost'}
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link to="/my-requests">
              <Button
                variant={isActive('/my-requests') ? 'medical' : 'ghost'}
                size="sm"
              >
                My Requests
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};