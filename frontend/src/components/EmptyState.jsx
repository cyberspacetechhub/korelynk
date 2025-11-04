import React from 'react';
import { Plus, Search, BookOpen, Users, Calendar } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Search, 
  title, 
  description, 
  actionText, 
  onAction,
  actionIcon: ActionIcon = Plus 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center mb-6 max-w-sm">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <ActionIcon className="w-4 h-4 mr-2" />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;