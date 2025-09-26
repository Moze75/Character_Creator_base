import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(100, (currentStep / totalSteps) * 100));

  return (
    <div className="w-full mb-8">
      {/* Barre de progression */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          role="progressbar"
        />
      </div>

      {/* Libellés d'étapes, en wrap + spacing + scroll horizontal si trop serré */}
      <div className="mt-3 text-xs sm:text-sm text-gray-400 overflow-x-auto">
        <div className="flex flex-wrap sm:flex-nowrap gap-x-4 gap-y-2 whitespace-nowrap">
          {steps.map((step, index) => (
            <span
              key={index}
              className={`${index <= currentStep ? 'text-red-400' : 'text-gray-500'} transition-colors shrink-0`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}