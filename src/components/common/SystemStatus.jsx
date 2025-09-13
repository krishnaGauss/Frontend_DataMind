import React from 'react'

const SystemStatus = ({ status }) => (
  <div className="hidden sm:flex text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${status.has_documents ? 'bg-green-500' : 'bg-gray-400'}`}></div>
      {status.document_count} documents loaded
    </div>
  </div>
);

export default SystemStatus