import React from 'react';
import { Bot, Menu, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import SystemStatus from '../common/SystemStatus';
import { useMessageBox } from '../../hooks/useMessageBox';

export const Header = ({ currentSession, systemStatus, onReset, onToggleSidebar }) => {
  const { showMessageBox } = useMessageBox();

  const handleReset = () => {
    showMessageBox(
      'Are you sure you want to reset the entire knowledge base and all chat history? This action cannot be undone.',
      'confirm',
      onReset
    );
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-20">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar} 
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-semibold text-gray-800">
              RAG Document Chat
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            Current Session: {currentSession?.title || '...'}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <SystemStatus status={systemStatus} />
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};