import React, { createContext, useContext, useState } from 'react';

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  // This holds the student results shown in ViewAssessment
  const [assessments, setAssessments] = useState([
    // Optional: Keep a default row here so the table isn't blank at start
    { id: 'init-1', mentee: 'Alex Johnson', email: 'alex.j@nexus.com', score: 78, date: '2026-06-02' }
  ]);
  
  // This holds the actual questions you design in CreateAssessment
  const [questionBank, setQuestionBank] = useState([]);

  const addNewAssessment = (newQuestion, generatedResults) => {
    // 1. Save the question data to your question bank
    setQuestionBank(prev => [...prev, { id: Date.now().toString(), ...newQuestion }]);
    
    // 2. Push the simulated student scores directly into the ViewAssessment table pipeline
    setAssessments(prev => [...generatedResults, ...prev]);
  };

 // ... inside AssessmentContext.js

const deleteAssessmentResult = (id) => {
  setAssessments(prev => prev.filter(item => item.id !== id));
};

return (
  <AssessmentContext.Provider 
    value={{ assessments, questionBank, addNewAssessment, deleteAssessmentResult }}
  >
    {children}
  </AssessmentContext.Provider>
);
}

export const useAssessments = () => useContext(AssessmentContext);