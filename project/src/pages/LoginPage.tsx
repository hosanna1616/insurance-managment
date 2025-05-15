import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMfaInput, setShowMfaInput] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [remember, setRemember] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showMfaInput) {
      // First step - Show MFA input after email and password validation
      setShowMfaInput(true);
    } else {
      // Second step - Perform login with email, password, and MFA
      try {
        await login(email, password);
        navigate(from, { replace: true });
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 animate-fade-in">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {showMfaInput ? 'Verify Your Identity' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {showMfaInput 
                ? 'Please enter the verification code sent to your device' 
                : 'Enter your credentials to access your dashboard'
              }
            </p>
          </div>
          
          <div className="card">
            <form className="space-y-6" onSubmit={handleLogin}>
              {!showMfaInput ? (
                // Step 1: Email and Password
                <>
                  <Input
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    required
                    icon={<Mail className="h-5 w-5 text-gray-400" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    required
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-700 focus:ring-primary-500 border-gray-300 rounded"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <Link to="/forgot-password" className="font-medium text-primary-700 hover:text-primary-800">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                // Step 2: MFA Code
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary-100 p-4 mb-4">
                      <ShieldCheck className="h-10 w-10 text-primary-700" />
                    </div>
                  </div>
                  
                  <Input
                    label="Verification Code"
                    type="text"
                    autoComplete="one-time-code"
                    required
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="text-center text-lg letter-spacing-wide"
                    maxLength={6}
                  />
                  
                  <p className="text-sm text-gray-600 text-center">
                    We've sent a verification code to your email or phone. This code will expire in 10 minutes.
                  </p>
                </div>
              )}
              
              {error && (
                <div className="p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                {showMfaInput ? 'Verify & Sign In' : 'Continue'}
              </Button>
              
              {showMfaInput && (
                <button
                  type="button"
                  onClick={() => setShowMfaInput(false)}
                  className="w-full text-center text-sm text-gray-600 hover:text-gray-800 mt-2"
                >
                  Back to Login
                </button>
              )}
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New user?{' '}
                <Link to="/signup" className="font-medium text-primary-700 hover:text-primary-800">
                  Create an account here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;