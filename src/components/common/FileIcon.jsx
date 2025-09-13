import React from 'react'
import { FileText, Table } from 'lucide-react';

const FileIcon = ({ filename }) => {
  if (filename.toLowerCase().endsWith('.pdf')) {
    return <FileText className="w-4 h-4 text-red-500" />;
  } else if (filename.toLowerCase().endsWith('.csv')) {
    return <Table className="w-4 h-4 text-green-500" />;
  }
  return <FileText className="w-4 h-4 text-gray-500" />;
};


export default FileIcon