import React from 'react';

function UserModals({ activeModal, selectedMentor, closeModal, onConfirmVerify, onConfirmDelete }) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm p-6 flex flex-col items-start text-left gap-4 animate-fade-in-rise">
        
        {/* Delete Mentor Modal Layout */}
        {activeModal === 'delete' && (
          <>
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Delete Mentor</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Are you sure you want to delete this mentor? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 w-full mt-2">
              <button type="button" onClick={closeModal} className="w-1/2 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold py-2.5 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="button" onClick={onConfirmDelete} className="w-1/2 bg-[#C1121F] hover:bg-[#A00F1A] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-sm">
                Delete
              </button>
            </div>
          </>
        )}

        {/* Verify Mentor Modal Layout */}
        {activeModal === 'verify' && (
          <>
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-[#2D316A]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Verify Mentor</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Are you sure you want verify this mentor? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 w-full mt-2">
              <button type="button" onClick={closeModal} className="w-1/2 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold py-2.5 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="button" onClick={onConfirmVerify} className="w-1/2 bg-[#2D316A] hover:bg-[#1E214A] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-sm">
                Verify
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default UserModals;