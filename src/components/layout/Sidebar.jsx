import React from 'react';
import { X, Plus, LogOut } from 'lucide-react';
import { Button } from '../common/Button';
import SessionList from '../sessions/SessionList';

const Sidebar = ({ sessions, currentSessionId, onSelectSession, onNewChat, onLogout, isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Chats</h2>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <Button onClick={onNewChat} className="w-full flex items-center justify-center gap-2 mb-4">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
          
          <SessionList 
            sessions={sessions} 
            currentSessionId={currentSessionId} 
            onSelectSession={(id) => {
              onSelectSession(id);
              onClose();
            }} 
          />
          
          <div className="mt-auto pt-4 border-t border-gray-200">
            <Button onClick={onLogout} variant="danger" className="w-full flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
