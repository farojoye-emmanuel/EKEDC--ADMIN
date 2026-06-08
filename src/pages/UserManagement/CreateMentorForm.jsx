import React, { useState } from 'react';

// 🎯 Step A: Receive 'onClose' prop from the parent component
function CreateMentorForm({ setMentors, onClose }) {
  
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    designation: '',
    staffId: '',
    email: '',
    phone: '',
    linkedin: '',
    bio: '',
    experience: '',
    expertise: '',
    approach: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const expertiseArray = formData.expertise
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    const newMentor = {
      ...formData,
      id: Date.now().toString(),
      status: 'Not verified',
      image: imagePreview || null,
      expertise: expertiseArray,
    };

    if (typeof setMentors === 'function') {
      setMentors((prev) => [...prev, newMentor]);
    }
    
    // 🎯 Step B: Close the modal immediately without altering routes
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    /* 🎯 Step C: Changed layout system to a fixed fullscreen window overlay backdrop */
    <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 text-slate-700 animate-fade-in">
      
      {/* CARD PANEL */}
      <div className="w-full max-w-xl md:max-w-2xl bg-white rounded-2xl border border-slate-100 shadow-2xl flex flex-col max-h-[85vh] transition-all overflow-hidden">
        
        {/* HEADER AREA */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-sm font-bold text-slate-800">Create Mentor Account</h2>
          <button 
            type="button"
            onClick={onClose} // 🎯 Step D: Closes modal overlay directly
            className="text-slate-400 hover:text-slate-600 transition-colors text-base font-normal p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* THE FLAT-LIST SCROLLING FORM */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4 text-xs font-medium text-slate-700 custom-scrollbar">
          
          {/* PROFILE IMAGE UPLOAD FEATURE CONTAINER */}
          <div className="flex flex-col gap-1.5">
            <label>Profile Picture</label>
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-200 border border-slate-300 flex-shrink-0 overflow-hidden flex items-center justify-center text-slate-400 font-bold text-[10px]">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>IMG</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[11px] text-slate-700 cursor-pointer bg-white border border-slate-200 shadow-xs px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors w-fit">
                  Browse File
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <p className="text-[10px] text-slate-400 font-normal">Accepted formats: JPG, PNG.</p>
              </div>
            </div>
          </div>

          {/* FIRST NAME */}
          <div className="flex flex-col gap-1.5">
            <label>First Name <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="firstName" 
              required 
              placeholder="Enter first name" 
              value={formData.firstName} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* LAST NAME */}
          <div className="flex flex-col gap-1.5">
            <label>Last Name <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="lastName" 
              required 
              placeholder="Enter last name" 
              value={formData.lastName} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* DEPARTMENT */}
          <div className="flex flex-col gap-1.5">
            <label>Department <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="department" 
              required 
              placeholder="Enter department name" 
              value={formData.department} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* DESIGNATION */}
          <div className="flex flex-col gap-1.5">
            <label>Designation / Corporate Title <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="designation" 
              required 
              placeholder="e.g. Head of Marketing" 
              value={formData.designation} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* STAFF ID */}
          <div className="flex flex-col gap-1.5">
            <label>Staff ID Number <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="staffId" 
              required 
              placeholder="Enter staff identifier ID" 
              value={formData.staffId} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* EMAIL ADDRESS */}
          <div className="flex flex-col gap-1.5">
            <label>Email Address <span className="text-rose-500">*</span></label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="example@company.com" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* PHONE NUMBER */}
          <div className="flex flex-col gap-1.5">
            <label>Phone Number <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="phone" 
              required 
              placeholder="Enter contact number" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* LINKEDIN URL */}
          <div className="flex flex-col gap-1.5">
            <label>LinkedIn Profile URL</label>
            <input 
              type="url" 
              name="linkedin" 
              placeholder="https://linkedin.com/in/username" 
              value={formData.linkedin} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* BIO SUMMARY */}
          <div className="flex flex-col gap-1.5">
            <label>Bio / Professional Summary</label>
            <textarea 
              name="bio" 
              rows={3} 
              placeholder="Enter career highlights summary..." 
              value={formData.bio} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all resize-none" 
            />
          </div>

          {/* EXPERIENCE STATEMENT */}
          <div className="flex flex-col gap-1.5">
            <label>Experience Statement</label>
            <input 
              type="text" 
              name="experience" 
              placeholder="e.g. Over 15 years of brand industry leadership" 
              value={formData.experience} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* AREAS OF EXPERTISE */}
          <div className="flex flex-col gap-1.5">
            <label>Areas of Expertise <span className="text-slate-400 font-normal">(Separate items with commas)</span></label>
            <input 
              type="text" 
              name="expertise" 
              placeholder="Brand Strategy, Market Research, Optimization" 
              value={formData.expertise} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all" 
            />
          </div>

          {/* MENTORSHIP APPROACH */}
          <div className="flex flex-col gap-1.5">
            <label>Mentorship Approach</label>
            <textarea 
              name="approach" 
              rows={3} 
              placeholder="Describe how you assist and guide core paths..." 
              value={formData.approach} 
              onChange={handleChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none placeholder-slate-300 focus:border-slate-400 font-normal transition-all resize-none" 
            />
          </div>

          {/* STICKY FOOTER ACTION BAR */}
          <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClose} // 🎯 Step E: Closes modal overlay directly
              className="px-5 py-2 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-lg font-semibold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#C1121F] text-white hover:bg-[#a00f19] px-6 py-2 rounded-lg font-semibold tracking-wide shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              Generate Account
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateMentorForm;