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
import { ReviewProvider } from './ReviewContext'; // ⚡ GLOBAL REVIEWS CONNECTIVITY HUB

import CoursePage from './pages/Course/Course.jsx';
import CreateAssessment from './pages/Course/CreateAssessment.jsx'; 
import ViewAssessment from './pages/Course/ViewAssessment.jsx';     

// 🎯 1. IMPORT YOUR UPLOAD COURSE COMPONENT HERE
import UploadCourse from './pages/Course/UploadCourse.jsx'; 

// 🚀 IMPORT THE REAL MODULAR DEPARTMENT ORGANIZER HERE
import DepartmentComponent from './pages/Department/Department.jsx';
import Roles from './pages/Department/Roles.jsx';

// 👤 IMPORT THE USER MANAGEMENT COMPONENTS HERE
import UserManagementComponent from './pages/UserManagement/UserManagement.jsx';
import CreateMentorForm from './pages/UserManagement/CreateMentorForm.jsx';
import MentorProfile from './pages/UserManagement/MentorProfile.jsx';
// 🎯 NEW: IMPORT THE MENTEE REGISTRATION FORM HERE
import CreateMenteeForm from './pages/UserManagement/CreateMenteeForm.jsx';
import MenteeProfile from './pages/UserManagement/MenteeProfile';

// ⚡ UPDATED IMPORT: Target the modularized ReviewsPage instead of placeholder strings
import ReviewsPage from './pages/Reviews/QuarterlyReviews'; 
import Dashboard from './pages/Dashboard/Dashboard.jsx'; // Loaded from your dashboard file 

// =========================================================================
// 4. PUBLIC ROUTE PLACEHOLDERS 
// =========================================================================
const ForgetPassword = () => <AnimatedPage><div className="p-10 text-slate-700 text-sm">Forgot Password Screen</div></AnimatedPage>;
const ResetPassword = () => <AnimatedPage><div className="p-10 text-slate-700 text-sm">Reset Credentials Form</div></AnimatedPage>;

// =========================================================================
// 5. MAIN INTERIOR DASHBOARD AREA MOUNTED HOOKS 
// =========================================================================
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

const RolesView = () => (
  <AnimatedPage>
    <Roles />
  </AnimatedPage>
);

// =========================================================================
// 🎯 2. UPDATED: ANIMATED WRAPPER WITH THE ONADDCOURSE HANDLER MAPPING
// =========================================================================
const UploadCourseView = ({ courses, setCourses }) => {
  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  return (
    <AnimatedPage>
      <UploadCourse onAddCourse={handleAddCourse} />
    </AnimatedPage>
  );
};

// ⚡ CLEAN HOOKUP: Wraps the modular functional page logic into your animation layout frame
const Reviews = () => (
  <AnimatedPage>
    <ReviewsPage />
  </AnimatedPage>
);

const DepartmentView = ({ departments, setDepartments }) => (
  <AnimatedPage>
    <DepartmentComponent departments={departments} setDepartments={setDepartments} />
  </AnimatedPage>
);

// =========================================================================
// 6. MASTER ROUTER ARCHITECTURE WITH SPLASH SCREEN INTEGRATION
// =========================================================================
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [coursesData, setCoursesData] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  
  // 👤 GLOBAL STATE CONTAINERS (Prevents data from wiping on view changes)
  const [mentorsData, setMentorsData] = useState([]);
  const [menteesData, setMenteesData] = useState([]); // 🎯 PERSISTENT MENTEE STATE ENGINE

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
    // ⚡ STEP 1: Wrap entire app structure with ReviewProvider data highway
    <ReviewProvider>
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
              
              {/* ✅ LIVE REPLACED DASHBOARD ROUTE LINK */}
              <Route 
                path="dashboard" 
                element={
                  <AnimatedPage>
                    <Dashboard 
                      mentors={mentorsData} 
                      mentees={menteesData} 
                      courses={coursesData} 
                    />
                  </AnimatedPage>
                } 
              />
              
              {/* 👤 USER ROUTE BRANCHES WITH MENTEE PIPELINES INTEGRATED */}
              <Route 
                path="users" 
                element={
                  <AnimatedPage>
                    <UserManagementComponent 
                      mentors={mentorsData} 
                      setMentors={setMentorsData} 
                      mentees={menteesData} 
                      setMentees={setMenteesData} 
                    />
                  </AnimatedPage>
                } 
              />
              <Route 
                path="users/create-mentor" 
                element={<AnimatedPage><CreateMentorForm setMentors={setMentorsData} /></AnimatedPage>} 
              />
              
              {/* 🎯 MENTEE PROFILE FORM ENTRY COMPONENT */}
              <Route 
                path="users/create-mentee" 
                element={
                  <AnimatedPage>
                    <CreateMenteeForm setMentees={setMenteesData} />
                  </AnimatedPage>
                } 
              />

              {/* ⚡ ALIGNED TRACKER PATH PARAMETERS PERMANENTLY */}
              <Route 
                path="users/mentor-profile/:id" 
                element={<AnimatedPage><MentorProfile /></AnimatedPage>} 
              />

              {/* 🎯 MENTEE PROFILE ROUTE WITH THE SAME ANIMATION WRAPPER */}
              <Route 
                path="mentees/profile/:id" 
                element={<AnimatedPage><MenteeProfile /></AnimatedPage>} 
              />

              {/* ⚡ Unified Route Paths pointing directly to your reviews module */}
              <Route 
                path="quarterly-reviews" 
                element={<Reviews />} 
              />
              
              <Route 
                path="course" 
                element={<Course courses={coursesData} setCourses={setCoursesData} />} 
              />
              
              <Route path="reviews" element={<Reviews />} />
              
              <Route 
                path="Department" 
                element={<DepartmentView departments={departmentsData} setDepartments={setDepartmentsData} />} 
              />
              <Route path="Roles" element={<RolesView />} />

              <Route path="create-assessment" element={<CreateAssessmentView />} />
              <Route path="view-assessment" element={<ViewAssessmentView />} />
              
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
    </ReviewProvider>
  );
}

export default App;