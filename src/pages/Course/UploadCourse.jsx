import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadCourse({ onAddCourse }) {
  const navigate = useNavigate();

  // Form Fields State Parameters
  const [courseTitle, setCourseTitle] = useState('');
  const [learningObjective, setLearningObjective] = useState('');
  const [department, setDepartment] = useState('');
  const [duration, setDuration] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);

  // 🎯 DYNAMIC PROGRESS METRIC TRACKING PIPELINE
  const progressPercentage = useMemo(() => {
    let filledFields = 0;
    const totalFields = 5;

    if (courseTitle.trim() !== '') filledFields++;
    if (learningObjective.trim() !== '') filledFields++;
    if (department !== '') filledFields++;
    if (duration.trim() !== '') filledFields++;
    if (attachedFile !== null) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  }, [courseTitle, learningObjective, department, duration, attachedFile]);

  // Handle Mock Local File Upload Triggers
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  // Submit Handler to append data upward to main view dashboard arrays
  const handleSubmit = (e) => {
    e.preventDefault();
    if (progressPercentage < 100) return; // Lock form submission safety guards

    const finalNewCourseObj = {
      id: Date.now(),
      administrator: 'Administrator', // Matches "My Courses" view row (image_a78458.png)
      mentor: 'Daniel Francis',       // 🎯 ADDED: Standard placeholder name for "Mentors" column tabs
      title: courseTitle,
      objective: learningObjective,
      department: department,
      // 🚀 FIXED: Changed to strict lowercase 'not-verified' to sync perfectly with activeTab conditional evaluation logic
      status: 'not-verified', 
      date: new Date().toLocaleDateString('en-GB'), // Renders current date as DD/MM/YYYY
    };

    onAddCourse(finalNewCourseObj);
    navigate('/course'); // Route straight back to display grid matrices
  };

  return (
    /* 🎯 OUTER WRAPPER: Constrained to screen height on desktop so content stays anchored inside view */
    <div className="w-full h-full min-h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] flex items-center justify-center bg-slate-50/50 p-3 md:p-6 text-slate-700">
      
      {/* CARD ARCHITECTURE PANEL */}
      <div className="w-full max-w-xl md:max-w-2xl bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col md:max-h-[85vh] transition-all overflow-hidden">
        
        {/* HEADER AREA */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-sm font-bold text-slate-800">Upload Material</h2>
          <button 
            onClick={() => navigate('/course')} 
            className="text-slate-400 hover:text-slate-600 transition-colors text-base font-normal p-1"
          >
            ✕
          </button>
        </div>

        {/* COMPLIANCE CONTAINER INPUT BODY FORM */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4 text-xs font-medium text-slate-700 custom-scrollbar">
          
          {/* COURSE TITLE INPUT */}
          <div className="flex flex-col gap-1.5">
            <label>Course Title <span className="text-rose-500">*</span></label>
            <input 
              type="text"
              placeholder="Enter your course title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all"
            />
          </div>

          {/* LEARNING OBJECTIVES FIELD */}
          <div className="flex flex-col gap-1.5">
            <label>Learning Objective</label>
            <input 
              type="text"
              placeholder="Enter your learning objective"
              value={learningObjective}
              onChange={(e) => setLearningObjective(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all"
            />
          </div>

          {/* DEPARTMENT MATRIX SELECTION OPTION BOX */}
          <div className="flex flex-col gap-1.5">
            <label>Department <span className="text-rose-500">*</span></label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none text-slate-600 font-normal focus:border-slate-400 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%20%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_top_50%] bg-no-repeat transition-all"
            >
              <option value="" disabled hidden>Select department</option>
              <option value="Finance">Finance</option>
              <option value="Transmission">Transmission</option>
              <option value="Distribution">Distribution</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>

          {/* DURATION RUNNING TRACKS METER METRIC */}
          <div className="flex flex-col gap-1.5">
            <label>Estimated Course Duration <span className="text-rose-500">*</span></label>
            <input 
              type="text"
              placeholder="e.g 1 hour, 25 minutes"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all"
            />
          </div>

          {/* DRAG AND DROP GRAPHIC BLOCK LAYOUT AREA ELEMENT */}
          <div className="flex flex-col gap-1.5">
            <label>Upload Course <span className="text-rose-500">*</span></label>
            <div className="w-full border border-dashed border-slate-200 bg-slate-50/30 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all hover:bg-slate-50/70 relative">
              <input 
                type="file"
                id="course-file-upload"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-2xl text-slate-400 font-light mb-1">+</span>
              <p className="text-[11px] text-slate-500 font-normal">
                {attachedFile ? (
                  <span className="text-emerald-500 font-semibold">✓ Attached: {attachedFile.name}</span>
                ) : (
                  <>Drag and drop files here <br /> <span className="text-slate-300 my-1 block">or</span></>
                )}
              </p>
              {!attachedFile && (
                <label htmlFor="course-file-upload" className="mt-1 px-3 py-1 border border-slate-300 text-slate-600 bg-white rounded font-semibold text-[10px] pointer-events-none">
                  Browse Your Computer
                </label>
              )}
            </div>
          </div>

          {/* METRIC TRACK FILL SYSTEM & SUBMIT PANEL FOOTER */}
          <div className="sticky bottom-0 bg-white pt-3 mt-4 border-t border-slate-100 flex flex-col gap-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="text-[10px] text-slate-400 font-normal">
                  Uploading files - {progressPercentage}%
                </div>
              </div>
              <button
                type="submit"
                disabled={progressPercentage < 100}
                className={`px-8 py-2 rounded-lg font-semibold tracking-wide transition-all ${
                  progressPercentage === 100
                    ? 'bg-[#C1121F] text-white hover:bg-[#a00f19] cursor-pointer shadow-xs active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Upload
              </button>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                style={{ width: `${progressPercentage}%` }}
                className="bg-[#C1121F] h-full rounded-full transition-all duration-300"
              />
            </div>
          </div>

        </form>
      </div>

    </div>
  );
}

export default UploadCourse;