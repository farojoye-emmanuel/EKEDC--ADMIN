import React, { useState } from 'react';
import { useAssessments } from './AssessmentContext';

function CreateAssessment() {
  const { addNewAssessment } = useAssessments();
  
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');

  const handleSaveAssessment = (e) => {
    e.preventDefault();
    if (!questionText || !optionA || !optionB || !optionC || !optionD) {
      alert('Kindly fill up all required structural fields before compiling.');
      return;
    }

    // 1. Package the raw question data
    const questionPayload = {
      question: questionText,
      a: optionA,
      b: optionB,
      c: optionC,
      d: optionD
    };

    // 2. SIMULATION: Generate mock student results who "took" this assessment
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const simulatedMentees = [
      {
        id: `mock-student-${Date.now()}-1`,
        mentee: 'Devon Lane',
        email: 'devon.lane@evalia.com',
        score: Math.floor(Math.random() * (100 - 40 + 1)) + 40, // Generates a random realistic score between 40% and 100%
        date: today
      },
      {
        id: `mock-student-${Date.now()}-2`,
        mentee: 'Jane Cooper',
        email: 'jane.cooper@evalia.com',
        score: Math.floor(Math.random() * (100 - 55 + 1)) + 55, // Generates a passing score between 55% and 100%
        date: today
      }
    ];

    // 3. Dispatch both profiles into your global context state
    addNewAssessment(questionPayload, simulatedMentees);

    alert('Assessment records updated successfully! Data records mounted into dashboard profiles.');
    
    // Clear input states
    setQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
  };

  return (
    <div className="h-full w-full flex flex-col min-h-0 text-slate-800 overflow-y-auto pr-1">
      <h1 className="text-lg font-bold text-slate-900 tracking-tight flex-shrink-0 mb-4">Create Assessment</h1>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4 flex-1 w-full max-w-5xl mb-4">
        <div className="mb-6 bg-slate-50/50 p-3 rounded-xl border border-dashed border-slate-200">
          <p className="text-[11px] text-slate-400 italic leading-relaxed text-center font-normal px-2">
            Kindly ensure each question is clear, concise, and free of ambiguity. Ambiguous questions can lead to misunderstandings. When inputting assessment questions and answers, ensure each question has four options. Craft clear and concise answer choices, maintaining consistency in formatting.
          </p>
        </div>

        <form onSubmit={handleSaveAssessment} className="space-y-6">
          <div>
            <h2 className="text-[10px] uppercase tracking-wider font-bold text-[#C1121F] mb-3">Questions</h2>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-0.5">
                Question 1 <span className="text-[#C1121F] text-xs">*</span>
              </label>
              <textarea 
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Type your exam question here..."
                rows={3}
                className="w-full border border-slate-200/80 rounded-xl px-4 py-3 outline-none text-xs placeholder-slate-300 focus:border-slate-400 bg-white shadow-2xs resize-none transition-all"
              />
            </div>
          </div>

          <div>
            <h2 className="text-[10px] uppercase tracking-wider font-bold text-[#C1121F] mb-1">Options</h2>
            <p className="text-[10px] text-slate-400 italic mb-4">
              Note that the correct answer should be inputted in the field for <span className="font-semibold text-slate-600">Option A</span>. Options are going to be randomized when viewed by the mentees.
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-0.5">
                  Option A (Correct Answer) <span className="text-[#C1121F] text-xs">*</span>
                </label>
                <input 
                  type="text"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  placeholder="Type correct choice"
                  className="w-full h-10 border border-slate-200/80 rounded-xl px-4 outline-none text-xs placeholder-slate-300 focus:border-slate-400 bg-white shadow-2xs transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-0.5">
                  Option B <span className="text-[#C1121F] text-xs">*</span>
                </label>
                <input 
                  type="text"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  placeholder="Type alternative choice"
                  className="w-full h-10 border border-slate-200/80 rounded-xl px-4 outline-none text-xs placeholder-slate-300 focus:border-slate-400 bg-white shadow-2xs transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-0.5">
                  Option C <span className="text-[#C1121F] text-xs">*</span>
                </label>
                <input 
                  type="text"
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                  placeholder="Type alternative choice"
                  className="w-full h-10 border border-slate-200/80 rounded-xl px-4 outline-none text-xs placeholder-slate-300 focus:border-slate-400 bg-white shadow-2xs transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-0.5">
                  Option D <span className="text-[#C1121F] text-xs">*</span>
                </label>
                <input 
                  type="text"
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                  placeholder="Type alternative choice"
                  className="w-full h-10 border border-slate-200/80 rounded-xl px-4 outline-none text-xs placeholder-slate-300 focus:border-slate-400 bg-white shadow-2xs transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 flex-shrink-0">
            <button 
              type="button"
              onClick={() => alert('Feature active: Appending extra question templates...')}
              className="px-6 h-9 border border-[#C1121F] text-[#C1121F] hover:bg-rose-50 text-xs font-semibold rounded-lg transition-all active:scale-98"
            >
              Add more
            </button>
            <button 
              type="submit"
              className="px-8 h-9 bg-[#C1121F] hover:bg-[#A00F1A] text-white text-xs font-semibold rounded-lg transition-all shadow-xs active:scale-98"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAssessment;