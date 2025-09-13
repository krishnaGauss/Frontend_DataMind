import React from 'react';
import { Send } from 'lucide-react';

export const MessageInput = ({ value, onChange, onSend, disabled, systemStatus }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex gap-2 items-end">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={systemStatus.has_documents 
            ? "Ask me anything about your uploaded documents..." 
            : "Press enter to send, Shift+Enter for new line"}
          disabled={disabled}
          className="flex-1 resize-none rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          rows="1"
          style={{ minHeight: '48px' }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};