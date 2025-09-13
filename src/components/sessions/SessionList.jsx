import React from 'react'
import { Search } from 'lucide-react';
import { useState } from 'react';

const SessionList = ({ sessions, currentSessionId, onSelectSession }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = Object.values(sessions)
    .filter(session => 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      session.messages?.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));

  return (
    <>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text"
          placeholder="Search chat history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {filteredSessions.length > 0 ? (
          filteredSessions.map(session => (
            <div 
              key={session.id} 
              onClick={() => onSelectSession(session.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                currentSessionId === session.id 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <h4 className="font-medium text-sm truncate">{session.title}</h4>
              <p className="text-xs text-gray-500">
                {new Date(session.lastActivity).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm mt-4">No sessions found.</p>
        )}
      </div>
    </>
  );
};

export default SessionList