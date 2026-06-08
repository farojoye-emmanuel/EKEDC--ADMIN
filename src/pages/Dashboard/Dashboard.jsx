import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ mentors = [], mentees = [], courses = [] }) {
  const navigate = useNavigate();
  // 📱 Mobile drawer active state toggle
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // 📊 1. LIVE QUANTITY COUNTERS
  const totalMentors = mentors.length;
  const totalMentees = mentees.length;
  const totalCourses = courses.length;

  // ⏱️ 2. RECENT 10-MINUTE FILTERS 
  const recentMentors = useMemo(() => {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    return mentors.filter(m => {
      if (!m.createdAt) return true; 
      return new Date(m.createdAt).getTime() >= tenMinutesAgo;
    });
  }, [mentors]);

  const recentMentees = useMemo(() => {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    return mentees.filter(m => {
      if (!m.createdAt) return true; 
      return new Date(m.createdAt).getTime() >= tenMinutesAgo;
    });
  }, [mentees]);

  // 🔔 3. NOTIFICATION GENERATOR STREAM
  const notifications = useMemo(() => {
    const list = [];
    
    mentors.forEach(m => {
      list.push({
        id: `mentor-${m.id || Math.random()}`,
        name: `${m.firstName || 'User'} ${m.lastName || ''}`,
        timestamp: m.createdAt ? new Date(m.createdAt).getTime() : Date.now(),
        unread: true
      });
    });

    mentees.forEach(m => {
      list.push({
        id: `mentee-${m.id || Math.random()}`,
        name: `${m.firstName || 'User'} ${m.lastName || ''}`,
        timestamp: m.createdAt ? new Date(m.createdAt).getTime() : Date.now(),
        unread: true
      });
    });

    return list.sort((a, b) => b.timestamp - a.timestamp);
  }, [mentors, mentees]);

  return (
    <div className="w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-[#F8F9FC] text-slate-700 font-sans overflow-hidden flex relative">
      
      {/* =========================================================
          LEFT LAYOUT: COUNTERS & TABLES
          ========================================================= */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
        
        {/* Page Title */}
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>

        {/* 📊 STATS CARD GRID AREA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {/* Total Mentors */}
          <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-100/80 shadow-2xs space-y-1">
            <p className="text-xs font-medium text-slate-400">Total Registered Mentors</p>
            <h3 className="text-2xl md:text-3xl font-bold text-[#E63946]">{totalMentors}</h3>
          </div>

          {/* Total Mentees */}
          <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-100/80 shadow-2xs space-y-1">
            <p className="text-xs font-medium text-slate-400">Total Registered Mentees</p>
            <h3 className="text-2xl md:text-3xl font-bold text-[#1D3557]">{totalMentees}</h3>
          </div>

          {/* Total Courses */}
          <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-100/80 shadow-2xs space-y-1">
            <p className="text-xs font-medium text-slate-400">Total Courses</p>
            <h3 className="text-2xl md:text-3xl font-bold text-[#FFB703]">{totalCourses}</h3>
          </div>
        </div>

        {/* 👤 RECENT MENTORS PANEL */}
        <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-100/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Recent Registered Mentors</h3>
            <button 
              onClick={() => navigate('/users')} 
              className="text-[#E63946] text-xs font-semibold hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>

          <div className="w-full overflow-x-auto rounded-lg">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="text-slate-400 font-medium border-b border-slate-100">
                  <th className="py-3 pl-4 w-12"></th>
                  <th className="py-3 px-3">First Name</th>
                  <th className="py-3 px-3">Last Name</th>
                  <th className="py-3 px-3">Work Email Address</th>
                  <th className="py-3 px-3">Staff ID</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 pr-4">Designation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                {recentMentors.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-slate-400 font-normal italic bg-slate-50/10">
                      No mentors registered within the last 10 minutes.
                    </td>
                  </tr>
                ) : (
                  recentMentors.map((m) => (
                    <tr key={m.id || Math.random()} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-2.5 pl-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200/50">
                          {m.image ? <img src={m.image} alt="" className="w-full h-full object-cover" /> : "👤"}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-900 font-semibold">{m.firstName || m.name?.split(' ')[0] || 'Daniel'}</td>
                      <td className="py-2.5 px-3">{m.lastName || m.name?.split(' ')[1] || 'Francis'}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-normal">{m.email || 'danielfrancis22@ekedc.io'}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{m.staffId || '123467'}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-normal">{m.department || 'Finance'}</td>
                      <td className="py-2.5 pr-4 text-slate-500 font-normal">{m.designation || 'Finance HOD'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🎯 RECENT MENTEES PANEL */}
        <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-100/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Recent Registered Mentees</h3>
            <button 
              onClick={() => navigate('/users')} 
              className="text-[#E63946] text-xs font-semibold hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>

          <div className="w-full overflow-x-auto rounded-lg">
            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="text-slate-400 font-medium border-b border-slate-100">
                  <th className="py-3 pl-4 w-12"></th>
                  <th className="py-3 px-3">First Name</th>
                  <th className="py-3 px-3">Last Name</th>
                  <th className="py-3 px-3">Work Email Address</th>
                  <th className="py-3 px-3">Staff ID</th>
                  <th className="py-3 pr-4">Designation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                {recentMentees.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-slate-400 font-normal italic bg-slate-50/10">
                      No mentees registered within the last 10 minutes.
                    </td>
                  </tr>
                ) : (
                  recentMentees.map((m) => (
                    <tr key={m.id || Math.random()} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-2.5 pl-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200/50">
                          {m.image ? <img src={m.image} alt="" className="w-full h-full object-cover" /> : "👤"}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-900 font-semibold">{m.firstName || m.name?.split(' ')[0] || 'Daniel'}</td>
                      <td className="py-2.5 px-3">{m.lastName || m.name?.split(' ')[1] || 'Francis'}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-normal">{m.email || 'danielfrancis22@ekedc.io'}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{m.staffId || '123467'}</td>
                      <td className="py-2.5 pr-4 text-slate-500 font-normal">{m.designation || 'Finance HOD'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* =========================================================
          RIGHT LAYOUT: NOTIFICATIONS SIDEBAR (DESKTOP PANEL / MOBILE SLIDE-OVER)
          ========================================================= */}
      {/* 🌟 OVERLAY BACKDROP LAYER FOR MOBILE DRAWERCLOSURE */}
      {mobileDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* 🌟 MUTABLE CONTAINER: Translates off-screen on mobile unless toggled open. Unlocked on Desktop. */}
      <div className={`
        fixed md:static top-0 right-0 h-full w-80 md:w-[350px] bg-white border-l border-slate-100 
        flex flex-col overflow-hidden shrink-0 transition-transform duration-300 ease-in-out z-50
        ${mobileDrawerOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        
        {/* Panel Title Header Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">Notifications</h3>
          {/* Close action resets state wrapper variables */}
          <button 
            type="button" 
            onClick={() => setMobileDrawerOpen(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Context Stream */}
        <div className="flex-1 p-4 space-y-4 bg-white overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex gap-3 items-start p-1 bg-white group">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-sm">
                    🔔
                  </div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#E63946] rounded-full border border-white" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-tight">Welcome to Virtual Mentoring Portal!</h4>
                  <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                    Welcome, Grace Femi, to VMP. We're thrilled to have you on board. Explore our platform, connect with your mentor, and make the most of this valuable opportunity.
                  </p>
                </div>
              </div>
            ))
          ) : (
            notifications.map((item) => (
              <div key={item.id} className="flex gap-3 items-start p-1 bg-white group">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-sm">
                    🔔
                  </div>
                  {item.unread && (
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#E63946] rounded-full border border-white" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-tight">Welcome to Virtual Mentoring Portal!</h4>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                    Welcome, <span className="font-semibold text-slate-700">{item.name}</span>, to VMP. We're thrilled to have you on board. Explore our platform, connect with your mentor, and make the most of this valuable opportunity.
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* 🌟 FLOATING TOGGLE BUTTON FOR MOBILE */}
      {/* Positioned cleanly on bottom right viewports, hidden automatically on medium screens and up */}
      <button
        type="button"
        onClick={() => setMobileDrawerOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-12 h-12 bg-[#1D3557] text-white rounded-full shadow-lg flex items-center justify-center text-xl z-30 active:scale-95 transition-transform cursor-pointer border border-white/10"
      >
        🔔
      </button>

    </div>
  );
}

export default Dashboard;