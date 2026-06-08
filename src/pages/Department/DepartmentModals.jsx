import React from 'react';

function DepartmentModals({
  activeModal, selectedDept, closeModal,
  deptNameInput, setDeptNameInput,
  roleNameInput, setRoleNameInput,
  onAddDept, onEditDept, onDeleteDept,
  onAddRole, onDeleteRole
}) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-100 w-full max-w-sm overflow-hidden p-5 flex flex-col gap-4">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            {activeModal === 'add-dept' && 'Add New Department'}
            {activeModal === 'edit-dept' && 'Edit Department Name'}
            {activeModal === 'delete-dept' && 'Delete Department'}
            {activeModal === 'add-role' && `Add Role to ${selectedDept?.name}`}
            {activeModal === 'view-roles' && `${selectedDept?.name} Roles Panel`}
          </h3>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-sm font-semibold">✕</button>
        </div>

        {/* --- Add / Edit Department Form --- */}
        {(activeModal === 'add-dept' || activeModal === 'edit-dept') && (
          <form onSubmit={activeModal === 'add-dept' ? onAddDept : onEditDept} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase">Department Name</label>
              <input 
                type="text" required placeholder="e.g., Human Resources" value={deptNameInput}
                onChange={(e) => setDeptNameInput(e.target.value)}
                className="border border-slate-200 focus:border-slate-400 rounded-lg p-2 text-xs text-slate-800 outline-none w-full bg-slate-50/50"
              />
            </div>
            <button type="submit" className="w-full bg-[#C1121F] hover:bg-[#A00F1A] text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm">
              Save Record
            </button>
          </form>
        )}

        {/* --- Delete Confirmation Action --- */}
        {activeModal === 'delete-dept' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you absolutely sure you want to delete the <span className="font-semibold text-slate-800">"{selectedDept?.name}"</span> department? This action will wipe out all mapped structural rows permanently.
            </p>
            <div className="flex gap-2">
              <button onClick={closeModal} className="w-1/2 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold py-2 rounded-lg transition-colors">Cancel</button>
              <button onClick={onDeleteDept} className="w-1/2 bg-[#C1121F] hover:bg-[#A00F1A] text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm">Yes, Delete</button>
            </div>
          </div>
        )}

        {/* --- Simple Add Role Action --- */}
        {activeModal === 'add-role' && (
          <form onSubmit={onAddRole} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase">Role Title</label>
              <input 
                type="text" required placeholder="e.g., Lead Analyst" value={roleNameInput}
                onChange={(e) => setRoleNameInput(e.target.value)}
                className="border border-slate-200 focus:border-slate-400 rounded-lg p-2 text-xs text-slate-800 outline-none w-full bg-slate-50/50"
              />
            </div>
            <button type="submit" className="w-full bg-[#C1121F] hover:bg-[#A00F1A] text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm">
              Assign New Role
            </button>
          </form>
        )}

        {/* --- Manage Roles Nested Listing Window --- */}
        {activeModal === 'view-roles' && (
          <div className="flex flex-col gap-4 max-h-[400px]">
            <form onSubmit={onAddRole} className="flex items-center gap-1.5 border-b border-slate-100 pb-4">
              <input 
                type="text" required placeholder="Add another role here..." value={roleNameInput}
                onChange={(e) => setRoleNameInput(e.target.value)}
                className="border border-slate-200 focus:border-slate-400 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none flex-1 bg-slate-50/50"
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors">
                + Add
              </button>
            </form>

            <div className="overflow-y-auto flex flex-col gap-1.5 pr-0.5">
              {selectedDept?.roles.length === 0 ? (
                <p className="text-center text-slate-300 text-xs py-4">No roles attached to department yet.</p>
              ) : (
                selectedDept?.roles.map((role) => (
                  <div key={role.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">
                    <span className="text-xs text-slate-700 font-medium">{role.title}</span>
                    <button onClick={() => onDeleteRole(role.id)} className="text-[#C1121F] hover:text-[#A00F1A] font-medium text-[11px] p-0.5">✕</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default DepartmentModals;