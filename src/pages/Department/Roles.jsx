import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RolesModals from './RolesModals';

function Roles() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try parsing passed context from department grid row redirect links
  const targetDepartment = location.state?.departmentName || "Finance";

  // State initializing empty arrays by default matching your specs
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleTitleInput, setRoleTitleInput] = useState('');

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  const openModal = (type, role = null) => {
    setSelectedRole(role);
    setActiveModal(type);
    if (type === 'edit-role' && role) setRoleTitleInput(role.title);
    if (type === 'add-role') setRoleTitleInput('');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRole(null);
    setRoleTitleInput('');
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!roleTitleInput.trim()) return;
    setRoles(prev => [...prev, { id: Date.now(), title: roleTitleInput.trim() }]);
    closeModal();
  };

  const handleEditRole = (e) => {
    e.preventDefault();
    if (!roleTitleInput.trim() || !selectedRole) return;
    setRoles(prev => prev.map(r => r.id === selectedRole.id ? { ...r, title: roleTitleInput.trim() } : r));
    closeModal();
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;
    setRoles(prev => prev.filter(r => r.id !== selectedRole.id));
    closeModal();
  };

  const filteredRoles = useMemo(() => {
    return roles.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [roles, searchTerm]);

  const totalEntries = filteredRoles.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const lastIndex = currentPage * entriesPerPage;
  const firstIndex = lastIndex - entriesPerPage;
  const paginatedSelection = filteredRoles.slice(firstIndex, lastIndex);

  return (
    <div className="bg-slate-50 h-full w-full text-slate-800 flex flex-col justify-between overflow-hidden p-6 min-h-0">
      
      {/* HEADER ACTIONS BAR */}
      <div className="flex-shrink-0 mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 mb-2 flex items-center gap-1 transition-colors"
        >
          ← Return to Departments
        </button>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Roles</h1>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Total of {totalEntries} roles managed inside {targetDepartment}</p>
          </div>
          <button 
            onClick={() => openModal('add-role')}
            className="flex items-center gap-2 bg-[#C1121F] hover:bg-[#A00F1A] text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
          >
            <span className="text-base leading-none">+</span> Add Roles
          </button>
        </div>

        {/* SYSTEM SEARCH BAR FRAME */}
        <div className="flex justify-between items-center bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Show</span>
            <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} className="border border-slate-200 rounded px-1.5 py-1 bg-white outline-none font-medium text-slate-700">
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <span>entries</span>
          </div>
          <div className="relative w-full max-w-xs">
            <input type="text" placeholder="Search operational titles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-3 pr-8 py-1.5 border border-slate-200 rounded-md bg-white text-xs outline-none" />
            <svg className="w-3.5 h-3.5 absolute right-2.5 top-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </div>

      {/* RENDER FALLBACK LOGIC LAYER */}
      {totalEntries === 0 ? (
        <div className="flex-1 bg-white rounded-b-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">No Roles Configured</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4">This functional sector operational map currently has no assigned staff designations.</p>
          <button 
            onClick={() => openModal('add-role')}
            className="text-xs font-semibold text-[#C1121F] bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-md transition-colors"
          >
            Create First Role
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between overflow-hidden min-h-0">
          
          {/* DATA TABLES BLOCK MATCHING SCREENSHOT */}
          <div className="bg-white rounded-b-xl shadow-sm border border-slate-100 overflow-x-auto overflow-y-auto mb-4 flex-1 min-h-[200px]">
            <table className="w-full text-left border-collapse text-xs table-auto min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium whitespace-nowrap bg-slate-50/50 sticky top-0 z-10">
                  <th className="py-3 px-6 w-1/2">Roles</th>
                  <th className="py-3 px-4 text-center">Modify</th>
                  <th className="py-3 px-6 text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-normal">
                {paginatedSelection.map((role) => (
                  <tr key={role.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-3 px-6 font-medium text-slate-800 whitespace-nowrap">{role.title}</td>
                    
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button 
                        onClick={() => openModal('edit-role', role)}
                        className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-800 font-medium transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Role
                      </button>
                    </td>

                    <td className="py-3 px-6 text-right whitespace-nowrap">
                      <button 
                        onClick={() => openModal('delete-role', role)}
                        className="inline-flex items-center gap-1 text-[#C1121F] hover:text-[#A00F1A] font-medium transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION DATA INDICATOR CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-normal px-1 pb-1 flex-shrink-0 bg-slate-50">
            <div>Showing {firstIndex + 1} to {Math.min(lastIndex, totalEntries)} of {totalEntries} entries</div>
            <div className="flex items-center gap-1 select-none">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className={`px-2.5 py-1 rounded ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'}`}>Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`w-5 h-5 rounded flex items-center justify-center font-semibold text-[11px] ${currentPage === p ? 'bg-[#C1121F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className={`px-2.5 py-1 rounded ${currentPage === totalPages ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'}`}>Next</button>
            </div>
          </div>

        </div>
      )}

      {/* OVERLAY SYSTEM PORTALS */}
      <RolesModals 
        activeModal={activeModal} selectedRole={selectedRole} closeModal={closeModal}
        roleTitleInput={roleTitleInput} setRoleTitleInput={setRoleTitleInput}
        onAddRole={handleAddRole} onEditRole={handleEditRole} onDeleteRole={handleDeleteRole}
      />
    </div>
  );
}

export default Roles;