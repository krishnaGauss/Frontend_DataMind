import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';

export const ChatArea = ({ messages, isLoading, systemStatus }) => {
  const chatAreaRef = useRef(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Bot className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-6">Start by uploading documents or ask a question.</p>
          <div className="bg-white rounded-lg p-4 border border-gray-200 max-w-md mx-auto">
            <p className="text-sm text-gray-500">Upload some documents first to start chatting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
    </div>
  );
};