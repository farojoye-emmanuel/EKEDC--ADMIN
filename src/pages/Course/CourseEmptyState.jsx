import React from 'react';

function CourseEmptyState({ imageSrc, altText, message, showButton, onButtonClick }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-rise">
      {/* Dynamic Illustration Container */}
      {/* Fixed Centralized Illustration Container */}
<div className="mb-8 max-w-[200px] md:max-w-[280px] flex justify-center items-center">
  <img 
    src={imageSrc} 
    alt={altText} 
    className="w-full h-auto object-contain block mx-auto"
  />
</div>

      {/* State Descriptive Message */}
      <p className="text-sm text-slate-400 font-normal tracking-wide">
        {message}
      </p>

      {/* Conditionally Render the Action Button (Only for "My Courses") */}
      {showButton && (
        <button
          onClick={onButtonClick}
          className="mt-6 flex items-center gap-2 bg-[#C1121F] hover:bg-[#A00F1A] text-white font-medium text-sm px-6 py-3 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
        >
          {/* Action Cloud/Upload Icon Vector */}
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload Course
        </button>
      )}
    </div>
  );
}

export default CourseEmptyState;