import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Framework Layout Frame
import Layout from './components/Layout';

// 2. Public Full-Screen Gateway Page
import Login from './components/authenticator/login';
import SignUp from './components/authenticator/SignUp';

// 💡 3. ANIMATION LAYER & DATA PROVIDER IMPORTS
import AnimatedPage from './components/AnimatedPage';
import { AssessmentProvider } from './pages/Course/AssessmentContext'; 

import CoursePage from './pages/Course/Course.jsx';
import CreateAssessment from './pages/Course/CreateAssessment.jsx'; 
import ViewAssessment from './pages/Course/ViewAssessment.jsx';     

// 🎯 1. IMPORT YOUR UPLOAD COURSE COMPONENT HERE
import UploadCourse from './pages/Course/UploadCourse.jsx'; 

// =========================================================================
// 4. PUBLIC ROUTE PLACEHOLDERS 
// =========================================================================
const ForgetPassword = () => <AnimatedPage><div className="p-10 text-slate-700 text-sm">Forgot Password Screen</div></AnimatedPage>;
const ResetPassword = () => <AnimatedPage><div className="p-10 text-slate-700 text-sm">Reset Credentials Form</div></AnimatedPage>;

// =========================================================================
// 5. MAIN INTERIOR DASHBOARD AREA PAGES 
// =========================================================================
const Dashboard = () => (
  <AnimatedPage>
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
      <h2 className="text-base font-bold text-slate-800 mb-1">Dashboard Matrix Overview</h2>
      <p className="text-xs text-slate-400">Welcome back to the Eko Electricity Distribution Company grid manager system portal.</p>
    </div>
  </AnimatedPage>
);

const UserManagement = () => (
  <AnimatedPage>
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
      <h2 className="text-base font-bold text-slate-800 mb-1">User Account Management</h2>
      <p className="text-xs text-slate-400">Configure administrative access parameters and corporate workforce credentials.</p>
    </div>
  </AnimatedPage>
);

const Course = ({ courses, setCourses }) => (
  <AnimatedPage>
    <CoursePage courses={courses} setCourses={setCourses} />
  </AnimatedPage>
);

const CreateAssessmentView = () => (
  <AnimatedPage>
    <CreateAssessment />
  </AnimatedPage>
);

const ViewAssessmentView = () => (
  <AnimatedPage>
    <ViewAssessment />
  </AnimatedPage>
);

// =========================================================================
// 🎯 2. UPDATED: ANIMATED WRAPPER WITH THE ONADDCOURSE HANDLER MAPPING
// =========================================================================
const UploadCourseView = ({ courses, setCourses }) => {
  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]); // Safely appends data object to top-level state arrays
  };

  return (
    <AnimatedPage>
      {/* Passing the functional appending array mapping down into the form */}
      <UploadCourse onAddCourse={handleAddCourse} />
    </AnimatedPage>
  );
};

const Reviews = () => (
  <AnimatedPage>
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
      <h2 className="text-base font-bold text-slate-800 mb-1">Consumer Reviews & Performance Feedback</h2>
      <p className="text-xs text-slate-400">Analyze consumer reports, customer experience benchmarks, and feed metrics.</p>
    </div>
  </AnimatedPage>
);

const Department = () => (
  <AnimatedPage>
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
      <h2 className="text-base font-bold text-slate-800 mb-1">Department Operations Hub</h2>
      <p className="text-xs text-slate-400">Manage internal district grid divisions and transmission sectors.</p>
    </div>
  </AnimatedPage>
);

// =========================================================================
// 6. MASTER ROUTER ARCHITECTURE WITH SPLASH SCREEN INTEGRATION
// =========================================================================
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); 
    }, 7000);

    return () => clearTimeout(timer); 
  }, []);

  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white select-none overflow-hidden">
        <div className="animate-fade-in-rise flex flex-col items-center">
          <div className="mb-8">
            <img src="/images/EKEDC.png" alt="EKEDC Logo" className="h-20 w-auto" />
          </div>
          <div className="text-center px-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="animate-text-reveal">Welcome to</span>
              <span className="text-orange-500 ml-3">EKEDC Admin</span>
            </h1>
            <p className="text-xs text-slate-400 mt-3 tracking-widest uppercase animate-pulse">
              Loading Secure Hub Console...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AssessmentProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Full screen static views */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Core Administrative Framework (Sidebar + Header Structure) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" replace />} />
            
            {/* Internal target links */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            
            <Route 
              path="course" 
              element={<Course courses={coursesData} setCourses={setCoursesData} />} 
            />
            
            <Route path="reviews" element={<Reviews />} />
            <Route path="department" element={<Department />} />

            {/* SUB-ROUTES INJECTED HERE SO OUTLET RENDERS THEM CORRECTLY */}
            <Route path="create-assessment" element={<CreateAssessmentView />} />
            <Route path="view-assessment" element={<ViewAssessmentView />} />
            
            {/* ========================================================================= */}
            {/* 🎯 3. UPDATED ROUTE: Swapped to load the wrapper instead of raw un-mapped component */}
            {/* ========================================================================= */}
            <Route 
              path="upload-course" 
              element={<UploadCourseView courses={coursesData} setCourses={setCoursesData} />} 
            />
          </Route>

          {/* Safety catch-all path tracker redirection element */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </AssessmentProvider>
  );
}

export default App;