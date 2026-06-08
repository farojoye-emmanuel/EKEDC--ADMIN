import React, { useState, useMemo, useEffect } from 'react';
import DepartmentTable from './DepartmentTable';
import DepartmentModals from './DepartmentModals';

// 🚀 ACCEPT GLOBAL STATE PROPS PASSED DOWN FROM APP.JS
function Department({ departments, setDepartments }) {
  
  // ❌ REMOVED THE LOCAL STATE SO IT DOES NOT RESET ON UNMOUNT
  // const [departments, setDepartments] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [activeModal, setActiveModal] = useState(null); 
  const [selectedDept, setSelectedDept] = useState(null);
  const [deptNameInput, setDeptNameInput] = useState('');
  const [roleNameInput, setRoleNameInput] = useState('');

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  const openModal = (type, dept = null) => {
    setSelectedDept(dept);
    setActiveModal(type);
    if (type === 'edit-dept' && dept) setDeptNameInput(dept.name);
    if (type === 'add-dept') setDeptNameInput('');
    setRoleNameInput('');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedDept(null);
    setDeptNameInput('');
    setRoleNameInput('');
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!deptNameInput.trim()) return;
    setDepartments(prev => [...prev, { id: Date.now(), name: deptNameInput.trim(), roles: [] }]);
    closeModal();
  };

  const handleEditDepartment = (e) => {
    e.preventDefault();
    if (!deptNameInput.trim() || !selectedDept) return;
    setDepartments(prev => prev.map(d => d.id === selectedDept.id ? { ...d, name: deptNameInput.trim() } : d));
    closeModal();
  };

  const handleDeleteDepartment = () => {
    if (!selectedDept) return;
    setDepartments(prev => prev.filter(d => d.id !== selectedDept.id));
    closeModal();
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!roleNameInput.trim() || !selectedDept) return;

    const newRole = { id: Date.now(), title: roleNameInput.trim() };
    setDepartments(prev => prev.map(d => d.id === selectedDept.id ? { ...d, roles: [...d.roles, newRole] } : d));
    
    if (activeModal === 'view-roles') {
      setSelectedDept(prev => ({ ...prev, roles: [...prev.roles, newRole] }));
      setRoleNameInput('');
    } else {
      closeModal();
    }
  };

  const handleDeleteRole = (roleId) => {
    if (!selectedDept) return;
    setDepartments(prev => prev.map(d => d.id === selectedDept.id ? { ...d, roles: d.roles.filter(r => r.id !== roleId) } : d));
    setSelectedDept(prev => ({ ...prev, roles: prev.roles.filter(r => r.id !== roleId) }));
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [departments, searchTerm]);

  const totalEntries = filteredDepartments.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const lastIndex = currentPage * entriesPerPage;
  const firstIndex = lastIndex - entriesPerPage;
  const paginatedSelection = filteredDepartments.slice(firstIndex, lastIndex);

  return (
    <div className="bg-slate-50 h-full w-full text-slate-800 flex flex-col justify-between overflow-hidden p-6 min-h-0">
      
      {/* TOOLBAR CONTROLS HEADER */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Department</h1>
          <button 
            onClick={() => openModal('add-dept')}
            className="flex items-center gap-2 bg-[#C1121F] hover:bg-[#A00F1A] text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
          >
            <span className="text-base leading-none">+</span> Add Department
          </button>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Show</span>
            <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} className="border border-slate-200 rounded px-1.5 py-1 bg-white outline-none font-medium text-slate-700">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <span>entries</span>
          </div>
          <div className="relative w-full max-w-xs">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-3 pr-8 py-1.5 border border-slate-200 rounded-md bg-white text-xs outline-none" />
            <svg className="w-3.5 h-3.5 absolute right-2.5 top-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </div>

      {/* CORE DISPLAY LOGIC */}
      {totalEntries === 0 ? (
        /* INLINED FALLBACK EMPTY STATE DISPLAY */
        <div className="flex-1 bg-white rounded-b-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-[#C1121F]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">No Departments Formed Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4">Get started by creating your primary operating organization units and administrative roles.</p>
          <button 
            onClick={() => openModal('add-dept')}
            className="text-xs font-semibold text-[#C1121F] bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-md transition-colors"
          >
            Create Your First Department
          </button>
        </div>
      ) : (
        /* DATA SHEET VIEWS */
        <div className="flex-1 flex flex-col justify-between overflow-hidden min-h-0">
          <DepartmentTable paginatedSelection={paginatedSelection} openModal={openModal} />
          
          {/* LOCAL PAGINATION CONTROL BAR */}
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

      {/* OVERLAY LAYERS PANEL */}
      <DepartmentModals 
        activeModal={activeModal} selectedDept={selectedDept} closeModal={closeModal}
        deptNameInput={deptNameInput} setDeptNameInput={setDeptNameInput}
        roleNameInput={roleNameInput} setRoleNameInput={setRoleNameInput}
        onAddDept={handleAddDepartment} onEditDept={handleEditDepartment} onDeleteDept={handleDeleteDepartment}
        onAddRole={handleAddRole} onDeleteRole={handleDeleteRole}
      />
    </div>
  );
}

export default Department;