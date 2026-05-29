import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';

const SignUp = () => {
  const navigate = useNavigate();
  
  // Updated state parameters to perfectly match the split design layout names
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    staffId: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Submitting custom interface account...", formData);
    alert("Account created successfully! Redirecting to login portal...");
    navigate('/login');
  };

  return (
    <AnimatedPage>
      {/* Outer container background matches your dark theme backdrop */}
      <div className="min-h-screen bg-[#050B33] flex items-center justify-center p-4 font-sans antialiased">
        
        {/* The White Floating Modal Card Box Frame Container */}
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-slate-800">
          
          {/* Header Bar Track Line Area Container */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Create Account</h2>
            <button 
              type="button"
              onClick={() => navigate('/login')} 
              className="text-slate-400 hover:text-slate-600 transition-colors bg-transparent border-none cursor-pointer p-1 text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Core Form Data Fields Layout */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-left">
            
            {/* Row 1: Split Name Section Field Track */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name" 
                  className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name" 
                  className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition-colors" 
                />
              </div>
            </div>

            {/* Row 2: Work Email Address Track */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Work Email Address <span className="text-rose-500">*</span>
              </label>
              <input 
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your official email address" 
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition-colors" 
              />
            </div>

            {/* Row 3: Staff ID Track */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Staff ID <span className="text-rose-500">*</span>
              </label>
              <input 
                type="text"
                name="staffId"
                required
                value={formData.staffId}
                onChange={handleChange}
                placeholder="Enter your staff ID" 
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition-colors" 
              />
            </div>

            {/* Row 4: Password Track Layout */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <input 
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create your password" 
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition-colors" 
              />
            </div>

            {/* Row 5: Confirm Password Track Layout */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <input 
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password" 
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition-colors" 
              />
            </div>

            {/* Bottom Footer Area Layout holding the right-aligned action element button */}
            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                className="bg-[#D61C4E] hover:bg-[#b0143d] text-white py-2.5 px-6 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-200 shadow-xs cursor-pointer"
              >
                Create account
              </button>
            </div>

          </form>

        </div>
      </div>
    </AnimatedPage>
  );
};

export default SignUp;