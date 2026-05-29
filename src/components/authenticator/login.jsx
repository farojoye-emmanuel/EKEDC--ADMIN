import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';

const Login = () => {
  const navigate = useNavigate();
  
  // Local state tracking variables for the form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Controls the password visibility eye icon

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Authenticating admin user...", { email, password });
    
    // Smoothly route the administrator onto the internal system grid panel layout
    navigate('/dashboard');
  };

  return (
    <AnimatedPage>
      {/* Outer container matches the light background color behind your design asset */}
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 font-sans antialiased">
        
        {/* The Main Centered Login Box Grid Container */}
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-10 text-center text-slate-800">
          
          {/* 1. EKEDC Corporate Brand Logo Header Section */}
          <div className="mb-6 flex justify-center">
            <img 
              src={process.env.PUBLIC_URL + '/images/EKEDC.png'} // 💡 Make sure your logo file name matches what's in public/images!
              alt="EKEDC Logo" 
              className="w-36 h-auto object-contain block"
              onError={(e) => {
                // Fallback elegant text backup token framework if image is missing
                e.target.style.display = 'none';
                document.getElementById('brand-fallback').style.display = 'block';
              }}
            />
          </div>

          {/* 2. Page Sub-Header Identifier Text */}
          <h2 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">
            Admin Login
          </h2>

          {/* 3. Core Credentials Form Engine */}
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            
            {/* Work Email Field Block */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Work Email Address <span className="text-rose-500">*</span>
              </label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your official email address" 
                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition-colors" 
              />
            </div>

            {/* Password Field Block with Integrated Inline Action Icon */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full bg-white border border-slate-200 rounded-lg py-3 pl-4 pr-10 text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition-colors" 
                />
                
                {/* Interactive Eye Icon Button for switching type field parameter settings */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 bg-transparent border-none p-1 cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    // Eye Open SVG Icon
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    // Eye Slash Closed SVG Icon (Matches your design blueprint exactly)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 4. Full Width Execution Crimson Button Area */}
            <div className="pt-3">
              <button 
                type="submit"
                className="w-full bg-[#D61C4E] hover:bg-[#b0143d] text-white py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-colors duration-200 shadow-sm cursor-pointer text-center"
              >
                Login
              </button>
            </div>
          </form>

          {/* 5. Interlink Navigation Track Line Options */}
          <div className="mt-8 space-y-3 text-xs font-semibold text-center">
            <div>
              <button 
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-slate-800 hover:text-slate-500 bg-transparent border-none p-0 cursor-pointer transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            
            <div className="pt-2 border-t border-slate-100 text-slate-400 font-normal">
              New user?{' '}
              <button 
                type="button"
                onClick={() => navigate('/register')}
                className="text-[#D61C4E] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </AnimatedPage>
  );
};

export default Login;