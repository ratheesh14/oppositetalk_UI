import React from 'react';

interface ProgressBarProps {
  progressPercentage: number;
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
  label,
  showPercentage = true,
}) => {
  const percentage = Math.min(Math.max(progressPercentage, 0), 100);

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-slate-800 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
