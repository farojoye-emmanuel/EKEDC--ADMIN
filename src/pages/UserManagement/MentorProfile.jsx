import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useReviews } from '../../ReviewContext'; // Adjust the folder dots as needed to point back to src/

function MentorProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addReviewRecord } = useReviews();

  // 1. Full Restored Backing Data Engine (Matches your dynamic data properties)
  const defaultMentor = {
    id: id || '1',
    firstName: 'hshsh',
    lastName: 'hshsh',
    department: 'hshshs',
    designation: 'gsgsg',
    staffId: 'gsgsg',
    email: 'lhordosb30@gmail.com',
    phone: '09023456789',
    linkedin: 'https://linkedin.com',
    image: null, 
    bio: 'hshhxjdj',
    experience: 'hsss',
    expertise: ['Brand Strategy', 'Market Research'],
    approach: 'Daniel believes in a collaborative mentoring approach.'
  };

  const mentor = location.state?.mentor || defaultMentor;

  // ⚡ VIEW CONTROL
  const [isExpandedView, setIsExpandedView] = useState(false);

  // 2. Feedback Array Engine
  const [feedbacks, setFeedbacks] = useState([]);
  
  const [newFeedback, setNewFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    const formattedDate = new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });

    const freshReview = {
      id: Date.now(),
      author: isAnonymous ? 'Anonymous' : 'Current User',
      role: 'Mentee',
      text: newFeedback,
      date: formattedDate,
    };

    // 1. Update the local layout feedback list
    setFeedbacks([freshReview, ...feedbacks]);

    // 2. ⚡ DISPATCH GLOBAL CONTEXT: Push the review parameters directly into the Quarterly Matrix
    addReviewRecord({
      type: 'Mentor', // Lands automatically in the Mentor section tab
      name: `${mentor.firstName} ${mentor.lastName}`,
      email: mentor.email,
      department: mentor.department,
      designation: mentor.designation,
      status: 'Completed',
      date: formattedDate
    });

    // Clean up text field
    setNewFeedback('');
  };

  return (
    <div className="w-full bg-white text-slate-700 font-sans selection:bg-rose-100 selection:text-[#C1121F]">
      
      {/* PARENT VIEWPORT CONTAINER CLAMP */}
      <div className="flex h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full overflow-hidden">
        
        {/* =========================================================
            LEFT COLUMN: MENTOR DETAILS PANEL (SCROLL RESTORED)
            ========================================================= */}
        <div 
          className={`h-full border-slate-100 overflow-y-auto transition-all duration-300 custom-scrollbar
            ${isExpandedView 
              ? 'w-0 p-0 border-r-0 opacity-0 overflow-hidden shrink-0' 
              : 'w-full lg:w-[55%] p-6 md:p-10 lg:p-14 border-r shrink-0'
            }`}
        >
          {/* Breadcrumb Navigation */}
          <nav className="text-xs font-medium text-slate-400 mb-8 flex items-center gap-1.5">
            <button onClick={() => navigate(-1)} className="hover:text-slate-600 transition-colors cursor-pointer">Mentors</button>
            <span className="text-[10px] font-bold text-slate-300">➔</span>
            <span className="text-slate-500 font-semibold">Mentor's Profile</span>
          </nav>

          {/* Profile Header Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-slate-100 border border-slate-200/60 shadow-xs shrink-0 overflow-hidden flex items-center justify-center font-bold text-slate-400 text-3xl">
              {mentor.image ? (
                <img src={mentor.image} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="uppercase tracking-wide text-slate-400">{mentor.firstName?.[0]}{mentor.lastName?.[0]}</span>
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{mentor.firstName} {mentor.lastName}</h2>
              <div className="text-xs space-y-1 font-medium text-slate-500">
                <p><span className="text-slate-400 font-normal">Department:</span> <span className="text-slate-700">{mentor.department}</span></p>
                <p><span className="text-slate-400 font-normal">Designation:</span> <span className="text-slate-700">{mentor.designation}</span></p>
                <p><span className="text-slate-400 font-normal">Staff ID:</span> <span className="font-mono text-slate-700">{mentor.staffId}</span></p>
              </div>
            </div>
          </div>

          {/* Restored Content Stack */}
          <div className="space-y-6 text-xs leading-relaxed max-w-2xl pb-10">
            <div>
              <h3 className="text-slate-900 font-bold mb-1.5 text-sm">Bio/Summary</h3>
              <p className="text-slate-500 font-normal">{mentor.bio || 'No description provided.'}</p>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-1.5 text-sm">Experience</h3>
              <p className="text-slate-500 font-normal">{mentor.experience || 'No track record noted.'}</p>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-2.5 text-sm">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise && mentor.expertise.length > 0 ? (
                  mentor.expertise.map((skill, index) => (
                    <span key={index} className="bg-rose-50 text-[#C1121F] font-semibold px-3 py-1 rounded-md text-[10px] tracking-wide border border-rose-100/30">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 italic">None cataloged.</span>
                )}
              </div>
            </div>

            <div className="pt-1">
              <div className="border-l-[3px] border-[#C1121F] pl-4 py-0.5">
                <h3 className="text-slate-900 font-bold mb-1 text-sm">Mentorship Approach</h3>
                <p className="text-slate-500 font-normal">{mentor.approach || 'Collaborative development approach.'}</p>
              </div>
            </div>

            {/* Restored Contact Details Area */}
            <div className="pt-6 space-y-1.5 border-t border-slate-100 text-xs font-medium text-slate-500">
              <p className="flex items-center gap-2">
                <span className="text-slate-400 font-normal">Phone Number:</span> 
                <span className="text-slate-700 font-semibold">{mentor.phone || 'N/A'}</span>
              </p>
              <p>
                <span className="text-slate-400 font-normal">Email:</span> 
                <a href={`mailto:${mentor.email}`} className="text-[#C1121F] hover:underline font-semibold ml-1">{mentor.email}</a>
              </p>
              <p>
                <span className="text-slate-400 font-normal">LinkedIn:</span> 
                <a href={mentor.linkedin || '#'} target="_blank" rel="noreferrer" className="text-slate-600 underline hover:text-slate-900 ml-1">My profile</a>
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: FEEDBACK ENGINE WITH FIXED WIDTH BASIS
            ========================================================= */}
        <div 
          className={`h-full flex flex-col overflow-hidden transition-all duration-300 shrink-0
            ${isExpandedView 
              ? 'w-full bg-white p-6 md:p-10 lg:p-14' 
              : 'w-full lg:w-[45%] bg-slate-50/20 p-6 md:p-10 lg:p-12'
            }`}
        >
          {/* Scrollable Container Window */}
          <div className="flex-1 overflow-y-auto pr-1 pb-4 custom-scrollbar">
            
            {/* Header Module Navbar */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4 sticky top-0 bg-transparent backdrop-blur-md z-10">
              <div className="flex items-center gap-2">
                {isExpandedView && (
                  <button 
                    onClick={() => setIsExpandedView(false)} 
                    className="mr-2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    ← Back to Profile
                  </button>
                )}
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Feedbacks <span className="text-slate-400 font-normal text-xs ml-0.5">({feedbacks.length})</span>
                </h3>
              </div>

              <button 
                type="button" 
                onClick={() => setIsExpandedView(!isExpandedView)}
                className="text-[#C1121F] text-xs font-bold hover:underline cursor-pointer"
              >
                {isExpandedView ? 'Minimize View' : 'View all'}
              </button>
            </div>

            {/* CONDITIONAL LAYOUT CONDITIONAL */}
            {feedbacks.length === 0 ? (
              <div className={`flex flex-col items-center justify-center text-center px-6 rounded-2xl border border-dashed border-slate-200 bg-white/60 shadow-2xs transition-all duration-300
                ${isExpandedView ? 'max-w-md mx-auto my-auto py-24' : 'py-20 my-2'}`}
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xl mb-3">💬</div>
                <h4 className="text-xs font-bold text-slate-800 mb-1.5 tracking-tight">No Reviews Registered Yet</h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-normal">
                  There are currently no reviews documented for this mentor profile. Use the input panel below to publish the first feedback entry!
                </p>
              </div>
            ) : (
              /* CARD STREAM CONTAINER GRID */
              <div className={`grid gap-4 transition-all duration-300 ${isExpandedView ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {feedbacks.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs space-y-3 hover:border-slate-200/80 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-400">
                        <span>👤</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.author}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">{item.text}</p>
                    <div className="text-right text-[10px] text-slate-400 font-normal pt-1">{item.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions Dock Input Form */}
          <form onSubmit={handleAddFeedback} className="mt-auto pt-4 border-t border-slate-100 space-y-3 shrink-0">
            <textarea
              placeholder="Leave a new feedback review statement..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              className="w-full p-3 border border-slate-200 bg-white rounded-xl text-xs outline-none focus:border-slate-300 resize-none h-20 shadow-2xs transition-all font-normal placeholder-slate-400"
            />
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[11px] text-slate-400 font-medium select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded-sm border-slate-300 text-[#C1121F] focus:ring-[#C1121F] cursor-pointer"
                />
                Post anonymously
              </label>

              <button
                type="submit"
                disabled={!newFeedback.trim()}
                className="bg-[#C1121F] hover:bg-[#A00F1A] disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                Submit Feedback
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}

export default MentorProfile;