import React from 'react';

const FormSkeleton = ({ fields = 4 }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="space-y-6">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
          </div>
        ))}
        <div className="flex justify-end">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;