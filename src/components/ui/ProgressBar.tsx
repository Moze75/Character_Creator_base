import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
      <div 
        className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
      <div className="flex justify-between mt-2 text-sm text-gray-400">
        {steps.map((step, index) => (
          <span 
            key={index}
            className={`${index <= currentStep ? 'text-red-400' : 'text-gray-600'} transition-colors`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}