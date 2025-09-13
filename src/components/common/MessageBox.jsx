import React from 'react';

export const MessageBox = ({ message, onConfirm, onCancel, type }) => {
  if (!message) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
        <p className="text-lg text-gray-800 font-semibold mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          {type === 'confirm' && (
            <button 
              onClick={onCancel} 
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={onConfirm} 
            className={`px-4 py-2 rounded-lg transition-colors ${
              type === 'confirm' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {type === 'confirm' ? 'Confirm' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};