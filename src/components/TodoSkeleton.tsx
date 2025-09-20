import React from 'react';

const TodoSkeleton: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg bg-white animate-pulse">
      <div className="flex items-start space-x-3">
        <div className="h-5 w-5 bg-gray-200 rounded mt-1"></div>
        <div className="flex-grow space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-8 w-12 bg-gray-200 rounded"></div>
          <div className="h-8 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default TodoSkeleton;