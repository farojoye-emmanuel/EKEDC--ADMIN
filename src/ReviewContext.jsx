import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const ReviewContext = createContext();

// 2. Create the Provider Component
export function ReviewProvider({ children }) {
  // Global useState array that tracks all reviews created across the system
  const [globalReviews, setGlobalReviews] = useState([]);

  // Helper function to easily push a new review from User Management
  const addReviewRecord = (newRecord) => {
    setGlobalReviews((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        date: newRecord.status === 'Completed' ? new Date().toLocaleDateString('en-GB') : '———',
        ...newRecord,
      },
    ]);
  };

  return (
    <ReviewContext.Provider value={{ globalReviews, addReviewRecord }}>
      {children}
    </ReviewContext.Provider>
  );
}

// 3. Custom hook for easy importing
export function useReviews() {
  return useContext(ReviewContext);
}