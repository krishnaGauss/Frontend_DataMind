import React from 'react'
import { Bot, Loader } from 'lucide-react';

const LoadingIndicator = () => (
  <div className="flex gap-3 justify-start">
    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
      <Bot className="w-4 h-4" />
    </div>
    <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-2">
        <Loader className="w-4 h-4 animate-spin" />
        <span className="text-sm">Thinking...</span>
      </div>
    </div>
  </div>
);

export default LoadingIndicator