import React, { useState } from 'react';
// 💡 Step 1: Import the Routing tools from react-router-dom
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGaugeHigh, 
  faBookOpen, 
  faStar, 
  faRightFromBracket,
  faUser,
  faBars,
  faXmark,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 💡 Step 2: Add exact matching URLs ('path') to your menu options
  const navItems = [
    { name: 'Dashboard', icon: faGaugeHigh, path: '/dashboard' },
    { name: 'User Management', icon: faUser, path: '/users' },
    { name: 'Course', icon: faBookOpen, path: '/course' },
    { name: 'Reviews', icon: faStar, path: '/reviews' },
    { name: 'Department', icon: faUsers, path: '/department' },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      
      {/* 1. SIDEBAR STRUCTURE */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#050B33] text-slate-300 flex flex-col justify-between p-4 pt-8 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen lg:min-w-[16rem]
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col gap-10">
          {/* Logo */}
          <div className="px-3">
            <div className="px-4 py-3 flex items-center justify-center">
              <img 
                src="/images/EKEDC.png" 
                alt="EKEDC" 
                className="w-[120px] h-auto block object-left object-contain" 
              />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)} // Close mobile drawer menu
                  className={({ isActive }) => `
                    w-full flex items-center gap-4 px-4 py-3 rounded-md text-xs font-medium transition-all duration-150 group
                    ${isActive 
                      ? 'bg-[#D61C4E] text-white font-semibold' 
                      : 'hover:bg-slate-800/40 text-slate-400 hover:text-white'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className={`text-sm w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} 
                      />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="pb-4">
          <NavLink 
            to="/login" 
            className="w-full flex items-center gap-4 px-4 py-3 text-xs font-medium rounded-md text-slate-400 hover:bg-red-950/20 hover:text-red-400 transition-all duration-150"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="text-sm w-5 h-5" />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>

      {/* MOBILE DRAW SHADOW OVERLAY */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* 2. RIGHT FRAME CONTAINMENT */}
      {/* 🎯 CHANGED: Added overflow-hidden to keep the viewport locked vertically */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER BLOCK */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between lg:justify-end px-6 sticky top-0 z-20 w-full flex-shrink-0">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-slate-600 text-lg p-2 focus:outline-none"
          >
            <FontAwesomeIcon icon={sidebarOpen ? faXmark : faBars} />
          </button>

          <div>
            <button className="my w-7 h-7 rounded-full bg-[#D61C4E] text-white flex items-center justify-center text-xs shadow-xs hover:bg-[#b0143d] transition-colors focus:outline-none">
              <FontAwesomeIcon icon={faUser} className="text-[10px]" />
            </button>
          </div>
        </header>

       {/* MAIN VIEWER CONTAINER */}
<main className="flex-1 bg-slate-100 overflow-hidden min-h-0 flex flex-col">
  {/* 🎯 FIX: Explicitly sizing this inner wrapper box to match viewport exactly and handle flex inheritance */}
  <div className="w-full h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4 lg:p-6 flex flex-col min-h-0 items-stretch">
    {/* 💡 Step 4: Outlet automatically injects whatever child component matches the URL */}
    <Outlet />
  </div>
</main>

      </div>
    </div>
  );
}

export default Layout;