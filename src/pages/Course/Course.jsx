import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CourseEmptyState from './CourseEmptyState';

function Course({ courses, setCourses }) {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('not-verified'); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); 

  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.closest('.action-trigger')) return;

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setActiveDropdownId(null);
  }, [activeTab, searchTerm, entriesPerPage]);

  const imageAssets = {
    notVerified: '/images/object1.png', 
    verified: '/images/object2.png',      
    myCourses: '/images/object1.png'      
  };

  const handleNavigate = (pageName) => {
    if (pageName === 'Create Assessment Page') {
      navigate('/create-assessment'); 
    } else if (pageName === 'View Assessment Page') {
      navigate('/view-assessment');   
    } else if (pageName === 'Upload Course Page') {
      navigate('/upload-course'); 
    }
    if (setActiveDropdownId) setActiveDropdownId(null);
  };

  const handleVerifyAction = (id) => {
    setCourses(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, type: 'verified', status: 'Verified' };
      }
      return item;
    }));
    setActiveDropdownId(null);
  };

  const handleDeleteOrDeclineRow = (id) => {
    setCourses(prev => prev.filter(item => item.id !== id));
    setActiveDropdownId(null);
  };

  const filteredDataRows = useMemo(() => {
    const records = courses || [];
    return records.filter(row => {
      // 🚀 FIXED: 'my-courses' is a layout view tab, not a data status. 
      // If activeTab is 'my-courses', we bypass the status comparison so all courses display.
      if (activeTab !== 'my-courses') {
        const currentCourseStatus = row.type || row.status;
        if (currentCourseStatus?.toLowerCase() !== activeTab.toLowerCase()) return false;
      }

      const query = searchTerm.toLowerCase();
      
      const instructorName = activeTab === 'my-courses'
        ? (row.administrator || 'Administrator').toLowerCase()
        : (row.mentor || 'Daniel Francis').toLowerCase();
        
      const titleText = (row.title || '').toLowerCase();
      const deptText = (row.department || '').toLowerCase();
      const objectiveText = (row.objective || '').toLowerCase();

      return (
        instructorName.includes(query) ||
        titleText.includes(query) ||
        deptText.includes(query) ||
        objectiveText.includes(query)
      );
    });
  }, [courses, activeTab, searchTerm]);

  const totalEntries = filteredDataRows.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const lastEntryIndex = currentPage * entriesPerPage;
  const firstEntryIndex = lastEntryIndex - entriesPerPage;
  const paginatedSelection = filteredDataRows.slice(firstEntryIndex, lastEntryIndex);

  return (
    <div className="bg-slate-50 h-full w-full text-slate-800 flex flex-col justify-between overflow-hidden min-h-0">
      
      <div className="flex-shrink-0">
        {/* HEADER SECTION PANEL */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Courses</h1>
          
          {activeTab === 'my-courses' && (
            <button 
              onClick={() => handleNavigate('Upload Course Page')}
              className="flex items-center gap-2 bg-[#C1121F] hover:bg-[#A00F1A] text-white font-medium text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              Upload Course
            </button>
          )}
        </div>

        {/* HORIZONTAL TAB BAR NAVIGATION */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-slate-200 mb-3 pb-3 sm:pb-0 gap-3">
          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none text-xs font-medium -mb-[1px] sm:-mb-[9px]">
            <button 
              onClick={() => setActiveTab('not-verified')}
              className={`pb-2 px-2.5 transition-all duration-150 font-semibold ${activeTab === 'not-verified' ? 'text-[#C1121F] border-b-2 border-[#C1121F]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Not verified
            </button>
            <button 
              onClick={() => setActiveTab('verified')}
              className={`pb-2 px-2.5 transition-all duration-150 font-semibold ${activeTab === 'verified' ? 'text-[#C1121F] border-b-2 border-[#C1121F]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Verified
            </button>
            <button 
              onClick={() => setActiveTab('my-courses')}
              className={`pb-2 px-2.5 transition-all duration-150 font-semibold ${activeTab === 'my-courses' ? 'text-[#C1121F] border-b-2 border-[#C1121F]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              My Courses
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 text-[11px] text-slate-500 sm:mb-3">
            <div className="flex items-center gap-1 flex-shrink-0">
              <span>Show</span>
              <select 
                value={entriesPerPage} 
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-slate-200 rounded px-1 py-0.5 bg-white outline-none font-medium text-slate-700 focus:border-slate-400"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span>entries</span>
            </div>

            <div className="relative w-full max-w-[140px] sm:max-w-xs">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-2.5 pr-7 py-1 border border-slate-200 rounded-md bg-white outline-none text-slate-700 placeholder-slate-300 focus:border-slate-400 text-[11px]"
              />
              <svg className="w-3 h-3 absolute right-2 top-1.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {totalEntries === 0 ? (
        <CourseEmptyState 
          imageSrc={activeTab === 'not-verified' ? imageAssets.notVerified : activeTab === 'verified' ? imageAssets.verified : imageAssets.myCourses}
          altText="No courses present"
          message={
            activeTab === 'not-verified' 
              ? "you have no courses yet." 
              : activeTab === 'verified'
              ? "you have no verified courses yet." 
              : "You have not uploaded courses yet." 
          }
          showButton={activeTab === 'my-courses'}
          onButtonClick={() => handleNavigate('Upload Course Page')}
        />
      ) : (
        <div className="flex-1 flex flex-col justify-between overflow-hidden min-h-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto overflow-y-auto mb-3 flex-1 min-h-[250px] mx-0.5 pb-28">
            <table className="w-full text-left border-collapse text-xs table-auto min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium whitespace-nowrap bg-slate-50/50 sticky top-0 z-10">
                  {/* 🚀 FIXED: In image_a78458.png, the first column header is completely empty for the My Courses tab */}
                  <th className="py-2 px-4">{activeTab === 'my-courses' ? '' : 'Mentors'}</th>
                  <th className="py-2 px-2">Course Title</th>
                  <th className="py-2 px-2">Learning Objective</th>
                  <th className="py-2 px-2">Department</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-normal">
                {paginatedSelection.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-1.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {activeTab === 'my-courses' 
                        ? (item.administrator || 'Administrator') 
                        : (item.mentor || 'Daniel Francis')}
                    </td>
                    <td className="py-1.5 px-2 whitespace-nowrap">{item.title}</td>
                    <td className="py-1.5 px-2 max-w-[280px] truncate" title={item.objective}>{item.objective}</td>
                    <td className="py-1.5 px-2 whitespace-nowrap">{item.department}</td>
                    <td className="py-1.5 px-2 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] tracking-wide capitalize ${
                        item.status?.toLowerCase() === 'verified'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {item.status?.toLowerCase() === 'not-verified' ? 'Not Verified' : item.status}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 whitespace-nowrap text-slate-400">{item.date}</td>
                    
                    <td className="py-1.5 px-4 text-right relative whitespace-nowrap">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownId(activeDropdownId === item.id ? null : item.id);
                        }}
                        className="action-trigger inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-rose-200 hover:border-rose-300 text-rose-500 hover:bg-rose-50/50 rounded-md transition-all font-medium text-[11px]"
                      >
                        Action
                        <svg className={`w-2 h-2 transition-transform duration-200 ${activeDropdownId === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {activeDropdownId === item.id && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-4 top-7 w-40 bg-white border border-slate-100 rounded-lg shadow-xl py-1 z-50 text-left overflow-hidden text-[11px] font-normal"
                        >
                          <button 
                            onClick={() => handleNavigate('Upload Course Page')}
                            className="w-full px-3 py-1.5 text-slate-600 hover:bg-slate-50 text-left transition-colors block border-b border-slate-50"
                          >
                            Download Course
                          </button>

                          {(activeTab === 'not-verified' || item.status?.toLowerCase() === 'not-verified') && (
                            <>
                              <button 
                                onClick={() => handleVerifyAction(item.id)}
                                className="w-full px-3 py-1.5 text-slate-600 hover:bg-slate-50 text-left transition-colors block border-b border-slate-50"
                              >
                                Verify Course
                              </button>
                              <button 
                                onClick={() => handleDeleteOrDeclineRow(item.id)}
                                className="w-full px-3 py-1.5 text-[#C1121F] hover:bg-rose-50 text-left transition-colors block"
                              >
                                Decline Course
                              </button>
                            </>
                          )}

                          {(activeTab === 'verified' || item.status?.toLowerCase() === 'verified') && (
                            <>
                              <button 
                                onClick={() => handleNavigate('Create Assessment Page')}
                                className="w-full px-3 py-1.5 text-slate-600 hover:bg-slate-50 text-left transition-colors block border-b border-slate-50"
                              >
                                Create Assessment
                              </button>
                              <button 
                                onClick={() => handleNavigate('View Assessment Page')}
                                className="w-full px-3 py-1.5 text-slate-600 hover:bg-slate-50 text-left transition-colors block border-b border-slate-50"
                              >
                                View Assessment
                              </button>
                              <button 
                                onClick={() => handleDeleteOrDeclineRow(item.id)}
                                className="w-full px-3 py-1.5 text-[#C1121F] hover:bg-rose-50 text-left transition-colors block"
                              >
                                Delete Course
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SYSTEM PAGINATION MECHANIC FOOTER CARD */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-normal px-1 pb-1 flex-shrink-0 bg-slate-50">
            <div>
              Showing {firstEntryIndex + 1} to {Math.min(lastEntryIndex, totalEntries)} of {totalEntries} entries
            </div>

            <div className="flex items-center gap-1 select-none">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={`px-2 py-1 rounded transition-colors font-medium ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNo => (
                <button
                  key={pageNo}
                  onClick={() => setCurrentPage(pageNo)}
                  className={`w-5 h-5 rounded flex items-center justify-center font-semibold text-[11px] transition-all ${
                    currentPage === pageNo 
                      ? 'bg-[#C1121F] text-white shadow-sm' 
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {pageNo}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={`px-2 py-1 rounded transition-colors font-medium ${currentPage === totalPages ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Course;