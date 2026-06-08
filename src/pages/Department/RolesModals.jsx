import React from 'react';

function RolesModals({
  activeModal,
  selectedRole,
  closeModal,
  roleTitleInput,
  setRoleTitleInput,
  onAddRole,
  onEditRole,
  onDeleteRole
}) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-100 w-full max-w-sm overflow-hidden p-5 flex flex-col gap-4">
        
        {/* Modal Header Frame */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            {activeModal === 'add-role' && 'Create Corporate Role'}
            {activeModal === 'edit-role' && 'Modify Designation Title'}
            {activeModal === 'delete-role' && 'Remove Role Assignment'}
          </h3>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-sm font-semibold">✕</button>
        </div>

        {/* --- Add / Edit Form Operations --- */}
        {(activeModal === 'add-role' || activeModal === 'edit-role') && (
          <form onSubmit={activeModal === 'add-role' ? onAddRole : onEditRole} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase">Role Title</label>
              <input 
                type="text"
                required
                placeholder="e.g., Finance HOD"
                value={roleTitleInput}
                onChange={(e) => setRoleTitleInput(e.target.value)}
                className="border border-slate-200 focus:border-slate-400 rounded-lg p-2 text-xs text-slate-800 outline-none w-full bg-slate-50/50"
              />
            </div>
            <button type="submit" className="w-full bg-[#C1121F] hover:bg-[#A00F1A] text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm">
              Save Designation
            </button>
          </form>
        )}

        {/* --- Delete Confirmation Screen --- */}
        {activeModal === 'delete-role' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to permanently clear out the <span className="font-semibold text-slate-800">"{selectedRole?.title}"</span> role classification profile? This structural row cannot be restored.
            </p>
            <div className="flex gap-2">
              <button onClick={closeModal} className="w-1/2 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold py-2 rounded-lg transition-colors">Cancel</button>
              <button onClick={onDeleteRole} className="w-1/2 bg-[#C1121F] hover:bg-[#A00F1A] text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm">Confirm Delete</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default RolesModals;