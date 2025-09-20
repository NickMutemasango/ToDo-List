import React from 'react';
import { Todo } from '../types';
import { formatTodoDate } from '../utils/dateUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`p-3 sm:p-4 border rounded-lg transition-all duration-300 ${
      todo.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between">
        {/* Checkbox and Content */}
        <div className="flex items-start space-x-2 sm:space-x-3 flex-grow min-w-0">
          {/*Checkbox with Green Background */}
          <label className="relative flex items-center cursor-pointer mt-0.5 group">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-full border-2 relative overflow-hidden transition-all duration-50 ${
              todo.completed 
                ? 'bg-green-500 border-green-500 scale-110' 
                : 'border-gray-300 group-hover:border-green-400 group-hover:scale-110'
            }`}>
              {/* Instant green background */}
              <div className={`absolute inset-0 bg-green-500 transition-opacity duration-10 ${
                todo.completed ? 'opacity-100' : 'opacity-0'
              }`}></div>
              
              {/* Checkmark */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-10 ${
                todo.completed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}>
                <svg 
                  className="w-3 h-3 text-white"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </label>
          
          {/* Content */}
          <div className="flex-grow min-w-0">
            <h3 className={`font-medium text-base sm:text-lg ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>
            
            {todo.description && (
              <p className={`text-sm mt-1 text-gray-600 ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
            
            <p className="text-xs text-gray-400 mt-2">
              {formatTodoDate(todo.createdAt)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-1 sm:space-x-2 ml-2 sm:ml-4 flex-shrink-0">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(todo)}
            className="p-1.5 sm:px-3 sm:py-1  cursor-pointer text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-1"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="hidden sm:inline">Edit</span>
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(todo)}
            className="p-1.5 sm:px-3 sm:py-1  cursor-pointer text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-1"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;