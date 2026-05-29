import React from 'react';
// 💡 This brings in the router tools we installed
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// 💡 This imports your updated layout component file
import Layout from './components/Layout';

// =========================================================================
// 1. LOGIN SCREEN WORKSPACE (Temporary placeholder function)
// =========================================================================
const Login = () => {
  const navigate = useNavigate(); // The navigation tool

  return (
    <div className="min-h-screen bg-[#050B33] flex items-center justify-center p-6 text-white text-center font-sans antialiased">
      <div className="max-w-sm w-full bg-slate-900/40 p-8 rounded-xl border border-slate-800 backdrop-blur-xs">
        <div className="bg-white p-2 rounded-md shadow-sm inline-block border border-slate-200 mb-6">
          <span className="font-extrabold text-xl tracking-wider text-[#050B33]">
            EK<span className="text-amber-500">⚡</span>DC
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2">Login Gateway</h2>
        <p className="text-xs text-slate-400 mb-6">Enter your administrative credentials to access the operational panel.</p>
        
        <div className="space-y-3">
          <input type="text" placeholder="Staff Email Address" className="w-full bg-slate-800/60 border border-slate-700 rounded-md py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-[#D61C4E]" />
          
          <div className="relative">
            <input type="password" placeholder="Password" className="w-full bg-slate-800/60 border border-slate-700 rounded-md py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-[#D61C4E]" />
            {/* 💡 Forgot Password link placement */}
            <div className="text-right mt-1.5">
              <button 
                type="button" 
                onClick={() => navigate('/forgot-password')} 
                className="text-[11px] text-slate-400 hover:text-white transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={() => navigate('/dashboard')} 
            className="w-full bg-[#D61C4E] hover:bg-[#b0143d] py-2.5 rounded-md text-xs font-semibold tracking-wide transition-colors mt-2"
          >
            Authenticate Access
          </button>
        </div>

        {/* 💡 NEW: Create Account Feature Section */}
        <div className="mt-6 pt-5 border-t border-slate-800/60 text-xs text-slate-400">
          New to the platform?{' '}
          <button 
            type="button"
            onClick={() => navigate('/register')} 
            className="text-[#D61C4E] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
          >
            Create an Account
          </button>
        </div>

      </div>
    </div>
  );
};

const SignUp = () => <div className="p-10 text-slate-700 text-sm">Create New Account View</div>;
const ForgetPassword = () => <div className="p-10 text-slate-700 text-sm">Forgot Password Screen</div>;
const ResetPassword = () => <div className="p-10 text-slate-700 text-sm">Reset Credentials Form</div>;

// =========================================================================
// 2. MAIN INTERIOR WORKSPACE CARDS
// These are the simple cards that show up on the right side of your sidebar
// =========================================================================
const Dashboard = () => (
  <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
    <h2 className="text-base font-bold text-slate-800 mb-1">Dashboard Matrix Overview</h2>
    <p className="text-xs text-slate-400">Welcome back to the Eko Electricity Distribution Company grid manager system portal.</p>
  </div>
);

const UserManagement = () => (
  <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
    <h2 className="text-base font-bold text-slate-800 mb-1">User Account Management</h2>
    <p className="text-xs text-slate-400">Configure administrative access parameters and corporate workforce credentials.</p>
  </div>
);

const Course = () => (
  <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
    <h2 className="text-base font-bold text-slate-800 mb-1">Course & Training Modules</h2>
    <p className="text-xs text-slate-400">Deploy technical training guides, grid safety assessments, and procedural courses.</p>
  </div>
);

const Reviews = () => (
  <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
    <h2 className="text-base font-bold text-slate-800 mb-1">Consumer Reviews Feed</h2>
    <p className="text-xs text-slate-400">Analyze consumer reports and customer experience benchmarks.</p>
  </div>
);

const Department = () => (
  <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
    <h2 className="text-base font-bold text-slate-800 mb-1">Department Operations Hub</h2>
    <p className="text-xs text-slate-400">Manage internal district grid divisions and transmission sectors.</p>
  </div>
);

// =========================================================================
// 3. THE MASTER ROUTER MAP
// =========================================================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Isolated full-screen pages (No sidebar frame) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Section Layout frame (Draws your navigation sidebar panel) */}
        <Route path="/" element={<Layout />}>
          
          {/* If a user goes to your website root path, kick them straight to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* These switch links drop cleanly into your Layout's placeholder */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="course" element={<Course />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="department" element={<Department />} />
          
        </Route>

        {/* Catch-all safety guard */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;