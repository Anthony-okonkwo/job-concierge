import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Sparkles, Eye, EyeOff, Mail, Lock } from 'lucide-react';

// Added the local fallback just to keep your dev environment bulletproof!
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: 'admin' | 'staff' | 'customer';
  };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const springEntrance: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 120, damping: 14 } 
    }
  };

  const shakeAnimation: Variants = {
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    },
    idle: { x: 0 }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials. Please try again.');
      }

      const data: AuthResponse = await response.json();
      localStorage.setItem('jobConciergeToken', data.token);
      
      // Using React Router for a seamless SPA transition
      navigate('/dashboard'); 

    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F7F9FC] font-sans">
      
      {/* LEFT SIDE: Brand Story (Hidden on Mobile, flex on Large screens) */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#0A2342] text-white relative overflow-hidden p-12">
        {/* Decorative background gradient matching your Dashboard AI button */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_left,_#0275D8_0%,_transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_bottom_right,_#00C2D1_0%,_transparent_60%)]"></div>
        
        <div className="z-10 flex flex-col items-center text-center max-w-md">
          {/* Replicating the Dashboard Logo Component */}
          <div className="w-20 h-20 mb-8 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">JobConcierge</h1>
          <p className="text-lg text-gray-300">
            CyberPurview AI pipeline. Your intelligent bridge to global professional opportunities.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="flex-1 flex justify-center items-center p-6 lg:p-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={springEntrance}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <motion.div animate={isError ? "shake" : "idle"} variants={shakeAnimation}>
            
            {/* Mobile Logo (Only shows on small screens) */}
            <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#0A2342]">JobConcierge</h1>
            </div>

            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-[#0A2342] mb-2">Welcome back</h2>
              <p className="text-gray-500">Log in to manage your job pipeline.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0A2342]">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="tony.stark@cyberpurview.com"
                    required
                    className={`w-full pl-11 pr-4 py-3 bg-[#F7F9FC] border rounded-xl outline-none transition-all ${
                      isError ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#0275D8] focus:ring-4 focus:ring-[#0275D8]/10'
                    }`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-[#0A2342]">Password</label>
                  <span className="text-sm text-[#0275D8] hover:text-[#00C2D1] cursor-pointer font-medium transition-colors">
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`w-full pl-11 pr-12 py-3 bg-[#F7F9FC] border rounded-xl outline-none transition-all ${
                      isError ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#0275D8] focus:ring-4 focus:ring-[#0275D8]/10'
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {isError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-medium text-center">
                  {errorMessage}
                </motion.p>
              )}

              {/* Login Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg flex justify-center items-center gap-2 mt-4 ${
                  isLoading 
                    ? 'bg-[#0275D8]/70 cursor-not-allowed' 
                    : 'bg-[#0275D8] hover:bg-[#0A2342] hover:shadow-xl hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    Authenticating...
                  </>
                ) : 'Log In to Concierge'}
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-400 font-medium">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Google Button */}
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-[#F7F9FC] transition-colors font-medium text-[#0A2342]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

            </form>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;