import React from 'react';

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-3">
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;