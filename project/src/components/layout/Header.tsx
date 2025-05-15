import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <span className="text-primary-700 font-heading font-bold text-xl md:text-2xl backdrop-blur-sm">InsureEase</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-700 ${
                  location.pathname === link.path
                    ? 'text-primary-700'
                    : isScrolled
                    ? 'text-gray-800'
                    : 'text-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-1"
                >
                  <User size={16} />
                  <span>My Account</span>
                  <ChevronDown size={16} />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-dropdown opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <Link to="/policies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Policies</Link>
                    <button 
                      onClick={logout} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/browse-policies">
                  <Button>Browse Policies</Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white animate-slide-down">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium py-2 ${
                    location.pathname === link.path ? 'text-primary-700' : 'text-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium py-2">Dashboard</Link>
                  <button 
                    onClick={logout} 
                    className="text-sm font-medium py-2 text-left text-error-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="pt-4 flex flex-col space-y-3">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/browse-policies">
                    <Button className="w-full">Browse Policies</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;