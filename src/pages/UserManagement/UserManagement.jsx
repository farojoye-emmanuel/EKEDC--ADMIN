import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMentorForm from './CreateMentorForm'; 
// 🎯 NEW: IMPORT THE COMPLETED MENTEE MODAL FORM HERE
import CreateMenteeForm from './CreateMenteeForm';

function UserManagement({ mentors = [], setMentors, mentees = [], setMentees }) {
  const navigate = useNavigate();

  // 1. Core Component UI State Parameters
  const [activeTab, setActiveTab] = useState('Mentor'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal Overlay Control Toggles
  const [showCreateModal, setShowCreateModal] = useState(false);
  // 🎯 NEW: OVERLAY TOGGLE STATE CONTAINER FOR MENTEES
  const [showCreateMenteeModal, setShowCreateMenteeModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ type: null, targetData: null });
  
  // Action Menu Dropdown References
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Toggle dropdown selection window positions safely
  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  // Close actionable dropdown popups instantly when clicking anywhere else on screen
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // =========================================================
  // ADMINISTRATIVE VERIFICATION & REMOVAL ACTION HANDLERS
  // =========================================================
  const handleConfirmVerify = () => {
    if (confirmModal.targetData && typeof setMentors === 'function') {
      setMentors((prev) =>
        prev.map((m) => (m.id === confirmModal.targetData.id ? { ...m, status: 'Verified' } : m))
      );
    }
    setConfirmModal({ type: null, targetData: null }); 
  };

  const handleConfirmDelete = () => {
    if (confirmModal.targetData && typeof setMentors === 'function') {
      setMentors((prev) => prev.filter((m) => m.id !== confirmModal.targetData.id));
    }
    setConfirmModal({ type: null, targetData: null }); 
  };

  const handleConfirmApproveMentee = () => {
    if (confirmModal.targetData && typeof setMentees === 'function') {
      setMentees((prev) =>
        prev.map((m) => (m.id === confirmModal.targetData.id ? { ...m, status: 'Verified' } : m))
      );
    }
    setConfirmModal({ type: null, targetData: null });
  };

  const handleConfirmDeleteMentee = () => {
    if (confirmModal.targetData && typeof setMentees === 'function') {
      setMentees((prev) => prev.filter((m) => m.id !== confirmModal.targetData.id));
    }
    setConfirmModal({ type: null, targetData: null });
  };

  // =========================================================
  // DATA INTERSECTION AND LIVE FILTER ENGINE
  // =========================================================
  const currentDataset = activeTab === 'Mentor' ? mentors : mentees;

  const filteredData = currentDataset.filter((user) => {
    const firstNameStr = (user.firstName || '').toLowerCase();
    const lastNameStr = (user.lastName || '').toLowerCase();
    const deptStr = (user.department || '').toLowerCase();
    const designationStr = (user.designation || '').toLowerCase();
    const staffIdStr = (user.staffId || '').toLowerCase();
    const emailStr = (user.email || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return (
      firstNameStr.includes(query) || 
      lastNameStr.includes(query) ||
      deptStr.includes(query) || 
      designationStr.includes(query) ||
      staffIdStr.includes(query) || 
      emailStr.includes(query)
    );
  });

  // Calculate quick entry counts
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="w-full min-h-screen bg-slate-50/40 p-4 md:p-8 text-slate-700 font-sans selection:bg-rose-100 selection:text-[#C1121F]">
      
      {/* SECTION HEADER BLOCK */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Users Management</h1>
          <p className="text-xs text-slate-400 mt-0.5 font-normal">
            Monitor registration metrics, update authentication parameter records, and clear profiles.
          </p>
        </div>
        
        {/* 🎯 UPDATED DYNAMIC GENERATION TRIGGER MODAL BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (activeTab === 'Mentor') {
              setShowCreateModal(true);
            } else {
              // ✅ Correctly triggers the mentee form as a popup directly inside layout frame context!
              setShowCreateMenteeModal(true); 
            }
          }}
          className="bg-[#C1121F] hover:bg-[#A00F1A] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer w-fit"
        >
          <span className="text-sm font-black">+</span> Create account for {activeTab.toLowerCase()}
        </button>
      </div>

      {/* FILTER CONTROL DASHBOARD HOUSING CONTAINER */}
      <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-xs p-4 mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Dataset Selection Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-100 lg:border-none pb-2 lg:pb-0">
          <button
            type="button"
            onClick={() => { setActiveTab('Mentor'); setSearchQuery(''); setCurrentPage(1); }}
            className={`pb-2 lg:pb-1 text-xs font-bold tracking-wide relative transition-colors cursor-pointer ${
              activeTab === 'Mentor' ? 'text-[#C1121F]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Mentor
            {activeTab === 'Mentor' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C1121F] rounded-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('Mentee'); setSearchQuery(''); setCurrentPage(1); }}
            className={`pb-2 lg:pb-1 text-xs font-bold tracking-wide relative transition-colors cursor-pointer ${
              activeTab === 'Mentee' ? 'text-[#C1121F]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Mentee
            {activeTab === 'Mentee' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C1121F] rounded-full" />
            )}
          </button>
        </div>

        {/* Search Input & Pagination Limits */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3.5 w-full lg:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-normal">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-2 py-1 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-600 outline-none font-medium focus:bg-white text-xs"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()} records...`}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-8 pr-3 py-2 border border-slate-200 bg-slate-50/50 rounded-xl outline-none text-xs text-slate-700 placeholder-slate-400 focus:bg-white focus:border-slate-300 transition-all font-normal"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>
      </div>

      {/* CORE REUSABLE COMPONENT TABLE MODULE GRID */}
      <div className="w-full overflow-x-auto bg-white rounded-2xl border border-slate-100 shadow-xs pb-6">
        <table className="w-full text-left text-xs border-collapse min-w-full">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold tracking-wider bg-slate-50/20 text-[10px]">
              <th className="py-2 pl-6 pr-4 w-16">Profile</th>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Department</th>
              {/* ✅ BOTH MENTOR AND MENTEE TABLES NOW SHARE THESE COLUMNS PERMANENTLY */}
              <th className="py-2 px-4">Designation</th>
              <th className="py-2 px-4">Staff ID</th>
              <th className="py-2 px-4">Email Address</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 pr-6 pl-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {currentEntries.length === 0 ? (
              <tr>
                {/* Unified colSpan set to 9 to account for all permanent table headers */}
                <td colSpan={9} className="py-20 text-center text-slate-400 font-normal">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl opacity-50">📁</span>
                    <p className="text-xs font-semibold text-slate-400 tracking-wide">
                      {activeTab === 'Mentee' 
                        ? 'Mentee indexing list module registers are currently vacant.' 
                        : 'No matching mentor records discovered.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentEntries.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                  
                  {/* Avatar Circle Container */}
                  <td className="py-3 pl-6 pr-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400 font-bold text-xs shadow-xs">
                      {item.image ? (
                        <img src={item.image} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="uppercase">{item.firstName?.[0] || 'U'}</span>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-3 px-4 font-bold text-slate-900 tracking-tight">{item.firstName}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{item.lastName}</td>
                  <td className="py-3 px-4 text-slate-500 font-normal">{item.department}</td>
                  
                  {/* ✅ DATA CELLS RENDERED UNIVERSALLY WITHOUT CONDITIONAL CHECKS */}
                  <td className="py-3 px-4 text-slate-500 font-normal">{item.designation || 'N/A'}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono font-normal">{item.staffId || 'N/A'}</td>
                  <td className="py-3 px-4 text-slate-400 font-normal max-w-[200px] truncate">{item.email}</td>
                  
                  {/* Status Badges */}
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] tracking-wide inline-block ${
                      item.status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-rose-50 text-[#C1121F] border border-rose-100'
                    }`}>
                      {item.status || 'Not verified'}
                    </span>
                  </td>

                  {/* DROP ACTION CONTEXT BUTTON OVERLAYS */}
                  <td className="py-3 pr-6 pl-4 text-right">
                    <div 
                      className="relative inline-block text-left" 
                      ref={activeDropdownId === item.id ? dropdownRef : null}
                    >
                      <button
                        type="button"
                        onClick={(e) => toggleDropdown(item.id, e)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 border border-rose-100 text-[#C1121F] font-bold rounded-lg bg-white hover:bg-rose-50/40 transition-all text-[11px] active:scale-95 cursor-pointer shadow-2xs"
                      >
                        Action <span className="text-[7px] transform scale-90">▼</span>
                      </button>

                      {activeDropdownId === item.id && (
                        <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-100 shadow-xl rounded-xl py-1 z-50 text-left text-slate-700 animate-in fade-in slide-in-from-top-1 duration-150">
                          {item.status !== 'Verified' && (
                            <button
                              type="button"
                              onClick={() => {
                                setConfirmModal({ 
                                  type: activeTab === 'Mentor' ? 'verify' : 'verify_mentee', 
                                  targetData: item 
                                });
                                setActiveDropdownId(null);
                              }}
                              className="w-full px-4 py-2 text-xs hover:bg-slate-50 text-slate-700 flex items-center gap-2 transition-colors font-semibold cursor-pointer"
                            >
                              <span className="text-emerald-500 font-bold">✓</span> Verify Account
                            </button>
                          )}
                          
                         <button
  type="button"
  onClick={() => {
    setActiveDropdownId(null);
    
    // 🔀 DYNAMIC ROUTING PATH BRAID BASED ON THE ACTIVE TAB STATE
    if (activeTab === 'Mentor') {
      navigate(`/users/mentor-profile/${item.id}`, { state: { mentor: item } });
    } else {
      // Directs seamlessly to your new Mentee profile viewport layout
      navigate(`/mentees/profile/${item.id}`, { state: { mentee: item } });
    }
  }}
  className="w-full px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 flex items-center gap-2 transition-colors font-medium cursor-pointer"
>
  👁️ View Profile
</button>
                          
                          <hr className="my-1 border-slate-100" />
                          
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmModal({ 
                                type: activeTab === 'Mentor' ? 'delete' : 'delete_mentee', 
                                targetData: item 
                              });
                              setActiveDropdownId(null);
                            }}
                            className="w-full px-4 py-2 text-xs hover:bg-rose-50 text-rose-600 flex items-center gap-2 transition-colors font-bold cursor-pointer"
                          >
                            🗑️ Delete Account
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* COMPONENT FOOTER ENTRIES MANAGER & PAGINATION */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-[11px] text-slate-400 px-2 font-normal">
        <div>
          Showing {totalEntries > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-1 font-semibold">
            <button 
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={`px-2.5 py-1 rounded-lg transition-colors ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-slate-800 cursor-pointer'}`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer ${
                  currentPage === page ? 'bg-[#C1121F] text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={`px-2.5 py-1 rounded-lg transition-colors ${currentPage === totalPages ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-slate-800 cursor-pointer'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Render overlay elements if states are called */}
      {showCreateModal && <CreateMentorForm setMentors={setMentors} onClose={() => setShowCreateModal(false)} />}
      
      {/* 🎯 NEW: RENDERS THE COMPLETED SCROLLABLE MENTEE MODAL HERE */}
      {showCreateMenteeModal && <CreateMenteeForm setMentees={setMentees} onClose={() => setShowCreateMenteeModal(false)} />}

      {/* CONFIRMATION POPUP WINDOW MODAL SUB-MODULE ARCHITECTURE */}
      {confirmModal.type && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-[340px] w-full p-6 shadow-2xl border border-slate-100/70 transform transition-all animate-in zoom-in-95 duration-150">
            
            {/* Delete Account Modal State Rendering */}
            {(confirmModal.type === 'delete' || confirmModal.type === 'delete_mentee') && (
              <>
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 mb-4">
                  <span className="text-rose-600 text-base font-black">⚠️</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Delete {confirmModal.type === 'delete' ? 'Mentor' : 'Mentee'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">Are you sure you want to delete this profile account record? This parameters configuration change cannot be reversed.</p>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setConfirmModal({ type: null, targetData: null })} className="w-full py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">Cancel</button>
                  <button type="button" onClick={confirmModal.type === 'delete' ? handleConfirmDelete : handleConfirmDeleteMentee} className="w-full py-2 bg-[#C1121F] text-white text-xs font-bold rounded-xl hover:bg-[#A00F1A] cursor-pointer transition-colors shadow-xs">Delete</button>
                </div>
              </>
            )}

            {/* Verification Processing Modal State Rendering */}
            {(confirmModal.type === 'verify' || confirmModal.type === 'verify_mentee') && (
              <>
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 mb-4">
                  <span className="text-[#2B2D62] text-sm font-black">ℹ️</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Verify {confirmModal.type === 'verify' ? 'Mentor' : 'Mentee'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">Are you sure you want verify this registration profile account credentials clear status?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setConfirmModal({ type: null, targetData: null })} className="w-full py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">Cancel</button>
                  <button type="button" onClick={confirmModal.type === 'verify' ? handleConfirmVerify : handleConfirmApproveMentee} className="w-full py-2 bg-[#2B2D62] text-white text-xs font-bold rounded-xl hover:bg-[#1E2046] cursor-pointer transition-colors shadow-xs">Verify</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default UserManagement;