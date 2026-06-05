import React, { useState, useMemo } from 'react';
import { useAssessments } from './AssessmentContext';

function ViewAssessment() {
  const { assessments, deleteAssessmentResult } = useAssessments();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter functionality
  const filteredItems = useMemo(() => {
    return assessments.filter(item => {
      const query = searchTerm.toLowerCase();
      return (
        item.mentee.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
      );
    });
  }, [assessments, searchTerm]);

  // Pagination parameters
  const totalEntries = filteredItems.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const lastIndex = currentPage * entriesPerPage;
  const firstIndex = lastIndex - entriesPerPage;
  const currentSelection = filteredItems.slice(firstIndex, lastIndex);

  return (
    <div className="h-full w-full flex flex-col min-h-0 text-slate-800 bg-transparent px-1">
      
      {/* TOP-LEVEL BREADCRUMB NAVIGATION */}
      <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mb-2 flex-shrink-0">
        <span>Courses</span>
        <span className="text-slate-300 text-[8px]">&gt;</span>
        <span className="text-slate-600 font-medium">Assessment</span>
      </div>

      {/* HEADER ROW */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Assessment</h1>
        </div>

        {/* CONTROLS REGULATION BLOCK */}
        <div className="flex items-center justify-between md:justify-end gap-6 text-xs text-slate-400 font-normal">
          <div className="flex items-center gap-1.5">
            <span>Show</span>
            <select 
              value={entriesPerPage} 
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-slate-200 rounded px-1.5 py-0.5 bg-white outline-none font-medium text-slate-600 focus:border-slate-400"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <span>entries</span>
          </div>

          {/* INPUT LOOKUP FIELD ARCHITECTURE */}
          <div className="relative w-56">
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-3 pr-8 py-1.5 border border-slate-200 rounded-lg bg-slate-50/50 outline-none text-slate-700 placeholder-slate-400 focus:border-slate-300 focus:bg-white text-xs transition-all"
            />
            <svg className="w-3.5 h-3.5 absolute right-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING FOR THE EMPTY STATE */}
      {totalEntries === 0 ? (
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#C1121F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">No Assessment Results Found</h3>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            There are currently no records available. Create an assessment question template first to populate simulated student scores here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 min-h-0">
          {/* DATA VIEW COMPLIANCE LAYOUT TABLE */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-100 overflow-x-auto overflow-y-auto mb-4 flex-1 min-h-0">
            <table className="w-full text-left border-collapse text-xs min-w-[750px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-white sticky top-0 z-10">
                  <th className="py-2.5 px-6 w-20 text-left bg-white">S/N</th>
                  <th className="py-2.5 px-4 w-48 bg-white">Mentees</th>
                  <th className="py-2.5 px-4 w-64 bg-white">Email Address</th>
                  <th className="py-2.5 px-4 w-24 bg-white">Score</th>
                  <th className="py-2.5 px-4 w-40 bg-white">Assessment Date</th>
                  <th className="py-2.5 px-6 w-24 text-right bg-white">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-normal">
                {currentSelection.map((item, idx) => {
                  const scoreNum = item.score;
                  
                  let textScoreColor = "text-emerald-500";
                  if (scoreNum < 50) {
                    textScoreColor = "text-rose-500";
                  } else if (scoreNum <= 60) {
                    textScoreColor = "text-amber-500";
                  }

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-2 px-6 text-slate-400">{firstIndex + idx + 1}</td>
                      <td className="py-2 px-4 font-semibold text-slate-800 whitespace-nowrap">{item.mentee}</td>
                      <td className="py-2 px-4 text-slate-500 whitespace-nowrap">{item.email}</td>
                      <td className={`py-2 px-4 font-semibold ${textScoreColor}`}>{item.score}%</td>
                      <td className="py-2 px-4 text-slate-400 whitespace-nowrap">{item.date}</td>
                      <td className="py-2 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            {/* 🎯 FIXED: Preceded confirm block with explicit browser window global reference */}
                            if (window.confirm(`Are you sure you want to delete ${item.mentee}'s entry?`)) {
                              deleteAssessmentResult(item.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-[#C1121F] bg-slate-50 hover:bg-rose-50 px-2 py-1 rounded-md transition-all active:scale-95 text-[11px] font-medium group"
                          title="Delete record"
                        >
                          <svg className="w-3 h-3 group-hover:stroke-[#C1121F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* SYSTEM PAGINATION MECHANIC FOOTER CARD */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium px-1 pb-2 flex-shrink-0">
            <div>
              Showing {firstIndex + 1} to {Math.min(lastIndex, totalEntries)} of {totalEntries} entries
            </div>

            <div className="flex items-center gap-1 select-none text-[11px]">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={`px-2 py-1 transition-colors font-medium ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-800'}`}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNo => (
                <button
                  key={pageNo}
                  onClick={() => setCurrentPage(pageNo)}
                  className={`w-6 h-6 rounded flex items-center justify-center font-semibold border transition-all ${
                    currentPage === pageNo 
                      ? 'bg-[#C1121F] border-[#C1121F] text-white shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {pageNo}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={`px-2 py-1 transition-colors font-medium ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-800'}`}
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

export default ViewAssessment;