import React, { useState } from 'react';
import { useReviews } from '../../ReviewContext'; // Adjust path back to where ReviewContext is located

function ReviewsPage() {
  // ⚡ LINKED TO GLOBAL STATE: Reads live reviews generated from User Management
  const { globalReviews } = useReviews();

  // Navigation, Filter, and View State Controls
  const [activeTab, setActiveTab] = useState('Mentor');
  const [selectedQuarter, setSelectedQuarter] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Download Action Handler (Compiles and Exports Data Records)
  const handleDownloadReview = (record) => {
    const csvContent = [
      ['Quarterly Performance Review Report'],
      ['Generated Date', new Date().toLocaleDateString()],
      [],
      ['Target Type', record.type],
      ['Full Name', record.name],
      ['Email Address', record.email],
      ['Department', record.department],
      ['Designation', record.designation],
      ['Review Status', record.status],
      ['Evaluation Date', record.date],
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Review_${record.name.replace(/\s+/g, '_')}_Q${selectedQuarter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Live Query Filters running over global context records
  const filteredData = globalReviews.filter((item) => {
    if (item.type !== activeTab) return false;
    const nameStr = (item.name || '').toLowerCase();
    const emailStr = (item.email || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return nameStr.includes(query) || emailStr.includes(query);
  });

  // Calculate Pagination boundary structures
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="w-full min-h-screen bg-slate-50/40 p-4 md:p-8 text-slate-700 font-sans selection:bg-rose-100 selection:text-[#C1121F]">
      
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quarterly Reviews</h1>
      </div>

      {/* ⚡ EMPTY STATE SENSITIVITY: Renders automatically if globalReviews array is empty */}
      {globalReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-2xl border border-slate-100 shadow-xs">
          <div className="w-48 h-48 mb-6 flex items-center justify-center relative">
            <span className="text-6xl select-none">📋</span>
            <span className="absolute top-6 left-6 text-amber-400 text-lg">★</span>
          </div>
          <p className="text-xs font-medium text-slate-400 tracking-wide">You have no reviews yet</p>
        </div>
      ) : (
        /* POPULATED INTERACTIVE VIEW MODULE */
        <>
          <div className="w-full bg-white rounded-t-2xl border-t border-x border-slate-100/80 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-4 border-b border-slate-100 md:border-none pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => { setActiveTab('Mentor'); setCurrentPage(1); }}
                  className={`pb-1 text-xs font-bold tracking-wide relative cursor-pointer ${activeTab === 'Mentor' ? 'text-[#C1121F]' : 'text-slate-400'}`}
                >
                  Mentor
                  {activeTab === 'Mentor' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C1121F] rounded-full" />}
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('Mentee'); setCurrentPage(1); }}
                  className={`pb-1 text-xs font-bold tracking-wide relative cursor-pointer ${activeTab === 'Mentee' ? 'text-[#C1121F]' : 'text-slate-400'}`}
                >
                  Mentee
                  {activeTab === 'Mentee' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C1121F] rounded-full" />}
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium ml-0 md:ml-4">
                <div className="flex items-center gap-1.5">
                  <span>Quarter</span>
                  <select value={selectedQuarter} onChange={(e) => setSelectedQuarter(e.target.value)} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 text-xs">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="flex items-center gap-1.5">
                  <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 text-xs">
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Show</span>
                <select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }} className="px-2 py-1 border border-slate-200 bg-white rounded-lg text-slate-600 text-xs">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span>entries</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full sm:w-56 pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/30 rounded-xl text-xs text-slate-700"
                />
                <span className="absolute right-2.5 top-2 text-slate-400 text-xs pointer-events-none">🔍</span>
              </div>
            </div>

          </div>

          <div className="w-full overflow-x-auto bg-white border-x border-b border-slate-100 rounded-b-2xl shadow-xs">
            <table className="w-full text-left text-xs border-collapse min-w-full font-medium">
              <thead>
                <tr className="border-b border-slate-100 text-slate-800 font-bold bg-slate-50/30 text-[11px]">
                  <th className="py-3.5 pl-6 pr-4">{activeTab === 'Mentor' ? 'Mentors' : 'Mentees'}</th>
                  <th className="py-3.5 px-4">Work Email Address</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Designation</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 pr-6 pl-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600">
                {currentEntries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="py-3.5 pl-6 pr-4 font-semibold text-slate-900">{item.name}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.email}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.department}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.designation}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] inline-block ${
                        item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/60' : 'bg-amber-50/60 text-amber-600 border border-amber-100/40'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{item.date}</td>
                    <td className="py-3.5 pr-6 pl-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownloadReview(item)}
                        className={`font-bold text-[11px] bg-transparent border-none cursor-pointer hover:underline ${item.status === 'Completed' ? 'text-rose-500' : 'text-slate-400'}`}
                      >
                        Download Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-[11px] text-slate-400 px-2">
            <div>
              Showing {totalEntries > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 font-semibold">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={`px-2 py-1 ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500'}`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${currentPage === page ? 'bg-[#C1121F] text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={`px-2 py-1 ${currentPage === totalPages ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default ReviewsPage;