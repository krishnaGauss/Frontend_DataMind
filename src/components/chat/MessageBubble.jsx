import React from 'react';
import { User, Bot } from 'lucide-react';
import FileIcon from '../common/FileIcon';

export const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';
  const isError = message.isError;
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-blue-600 text-white' 
            : message.type === 'system'
            ? 'bg-gray-500 text-white'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : isError
            ? 'bg-red-50 text-red-800 border border-red-200'
            : message.type === 'system'
            ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 font-medium mb-1">Sources:</p>
              <div className="space-y-1">
                {message.sources.map((source, idx) => (
                  <div key={idx} className="text-xs text-gray-500 flex items-center gap-1">
                    <FileIcon filename={source} />
                    {source}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};