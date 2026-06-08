import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useReviews } from '../../ReviewContext'; // Adjust the folder dots as needed to point back to src/

function MenteeProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addReviewRecord } = useReviews();

  // 1. Fallback / Mock Data representing a fresh Mentee Profile if no state is passed
  const defaultMentee = {
    id: id || '1',
    firstName: 'Daniel',
    lastName: 'Francis',
    department: 'Marketing',
    designation: 'Head of marketing',
    staffId: '1235678',
    email: 'lhordosb30@gmail.com',
    phone: '09023456789',
    linkedin: 'https://linkedin.com',
    image: null,
    bio: 'A driven and resourceful personal assistant with a passion for organization and efficiency. With an extensive background in managing schedules, travel itineraries, and administrative tasks, I am on a mission to excel in my role and contribute to my employer\'s success.',
  };

  // Uses the real data passed from your User Management table, or falls back to default layout text
  const mentee = location.state?.mentee || defaultMentee;

  // ⚡ EMPTY STATE BY DEFAULT: Initialized as an empty array so it forces the empty state view
  const [improvements, setImprovements] = useState([]);

  return (
    <div className="w-full bg-white text-slate-700 font-sans selection:bg-rose-100 selection:text-[#C1121F]">
      
      {/* TWO COLUMN FLEX LAYOUT CONTEXT */}
      <div className="flex h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full overflow-hidden">
        
        {/* =========================================================
            LEFT COLUMN: MENTEE PROFILE DETAILS (SCROLLABLE)
            ========================================================= */}
        <div className="w-full lg:w-[58%] p-6 md:p-10 lg:p-14 border-r border-slate-100 h-full overflow-y-auto custom-scrollbar shrink-0">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-xs font-medium text-slate-400 mb-8 flex items-center gap-1.5">
            <button onClick={() => navigate(-1)} className="hover:text-slate-600 transition-colors cursor-pointer">Mentees</button>
            <span className="text-[10px] font-bold text-slate-300">➔</span>
            <span className="text-slate-500 font-semibold">Mentee's Profile</span>
          </nav>

          {/* Mentee Header Component Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-slate-100 border border-slate-200/60 shadow-xs shrink-0 overflow-hidden flex items-center justify-center font-bold text-slate-400 text-3xl">
              {mentee.image ? (
                <img src={mentee.image} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="uppercase tracking-wide text-slate-400">
                  {mentee.firstName?.[0]}{mentee.lastName?.[0]}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{mentee.firstName} {mentee.lastName}</h2>
              <div className="text-xs space-y-1 font-medium text-slate-500">
                <p><span className="text-slate-400 font-normal">Department:</span> <span className="text-slate-700">{mentee.department}</span></p>
                <p><span className="text-slate-400 font-normal">Designation:</span> <span className="text-slate-700">{mentee.designation}</span></p>
                <p><span className="text-slate-400 font-normal">Staff ID:</span> <span className="font-mono text-slate-700">{mentee.staffId}</span></p>
              </div>
              
              {/* Star Rating Matrix Block */}
              <div className="flex items-center gap-1 pt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-xs">★</span>
                ))}
                <span className="text-[10px] text-slate-400 font-medium ml-1">(4.5)</span>
              </div>
            </div>
          </div>

          {/* Mentee Biography Core Content Section */}
          <div className="space-y-6 text-xs leading-relaxed max-w-2xl pb-10">
            <div>
              <h3 className="text-slate-900 font-bold mb-2 text-sm">Bio/Summary</h3>
              <p className="text-slate-500 font-normal leading-relaxed">{mentee.bio || 'No profile biography summary has been written yet.'}</p>
            </div>

            {/* Communication Base Footer Info */}
            <div className="pt-6 space-y-2 border-t border-slate-100 text-xs font-medium text-slate-500">
              <p className="flex items-center gap-2">
                <span className="text-slate-400 font-normal">Phone Number:</span> 
                <span className="text-slate-700 font-semibold">{mentee.phone || 'N/A'}</span>
              </p>
              <p>
                <span className="text-slate-400 font-normal">Email:</span> 
                <a href={`mailto:${mentee.email}`} className="text-[#C1121F] hover:underline font-semibold ml-1">{mentee.email}</a>
              </p>
              <p>
                <span className="text-slate-400 font-normal">LinkedIn:</span> 
                <a href={mentee.linkedin || '#'} target="_blank" rel="noreferrer" className="text-slate-600 underline hover:text-slate-900 ml-1">My profile</a>
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: AREA OF IMPROVEMENT (DEFAULT EMPTY STATE)
            ========================================================= */}
        <div className="w-full lg:w-[42%] bg-slate-50/20 p-6 md:p-10 lg:p-12 h-full overflow-y-auto custom-scrollbar shrink-0">
          
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-5">
              Area of Improvement
            </h3>

            {/* ⚡ CONDITIONAL EMPTY STATE CONDITIONAL IF EMPTY */}
            {improvements.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-lg mb-3 shadow-3xs">
                  🚀
                </div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">No Focus Areas Declared</h4>
                <p className="text-[11px] text-slate-400 max-w-xs leading-normal font-normal">
                  This mentee hasn't detailed or updated their development growth fields yet. Development badges will automatically track here once saved!
                </p>
              </div>
            ) : (
              /* ACTIVE SKILLS BADGE GRID (Appears as soon as dataset array fills up) */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {improvements.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 border border-slate-100 bg-white p-3 rounded-xl shadow-3xs hover:border-slate-200 transition-colors">
                    <span className="text-sm bg-amber-50 p-1.5 rounded-lg text-amber-600 shrink-0">
                      {item.type === 'skill' ? '💪' : '🌱'}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Mini toggle test trigger to test layout switching states */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button 
                type="button"
                onClick={() => setImprovements([
                  { name: 'Skill Development', type: 'skill' },
                  { name: 'Personal Development', type: 'personal' },
                  { name: 'Technical Training', type: 'skill' },
                  { name: 'Strategic Planning', type: 'personal' }
                ])}
                className="text-[10px] uppercase tracking-wider font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                Simulate Populated Badges
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MenteeProfile;