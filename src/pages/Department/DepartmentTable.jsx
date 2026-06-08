import React from 'react';
import { useNavigate } from 'react-router-dom'; // 🚀 ADDED NAVIGATION

function DepartmentTable({ paginatedSelection, openModal }) {
  const navigate = useNavigate(); // 🚀 HOOK CALL INITIALIZATION

  return (
    <div className="bg-white rounded-b-xl shadow-sm border border-slate-100 overflow-x-auto overflow-y-auto mb-4 flex-1 min-h-[250px]">
      <table className="w-full text-left border-collapse text-xs table-auto min-w-[700px]">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 font-medium whitespace-nowrap bg-slate-50/50 sticky top-0 z-10">
            <th className="py-3 px-6 w-1/4">Department</th>
            <th className="py-3 px-4 text-center">Roles Assignment</th>
            <th className="py-3 px-4 text-center">Modify</th>
            <th className="py-3 px-6 text-right">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-600 font-normal">
          {paginatedSelection.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
              <td className="py-3 px-6 font-medium text-slate-800 whitespace-nowrap">{item.name}</td>
              
              <td className="py-3 px-4 text-center whitespace-nowrap">
                {/* 🚀 FIXED TO ROUTE DIRECTLY ON CLICK */}
                <button 
                  onClick={() => navigate('/roles', { state: { departmentName: item.name } })}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-800 font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Roles
                </button>
              </td>

              <td className="py-3 px-4 text-center whitespace-nowrap">
                <button 
                  onClick={() => openModal('edit-dept', item)}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-800 font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Department
                </button>
              </td>

              <td className="py-3 px-6 text-right whitespace-nowrap">
                <button 
                  onClick={() => openModal('delete-dept', item)}
                  className="inline-flex items-center gap-1 text-[#C1121F] hover:text-[#A00F1A] font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Department
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;