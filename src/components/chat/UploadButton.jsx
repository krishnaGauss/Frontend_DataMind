import React, { useRef } from 'react';
import { Upload, Loader } from 'lucide-react';

export const UploadButton = ({ onUpload, disabled }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onUpload(files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-50 disabled:text-gray-400"
      >
        {disabled ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
      </button>
    </>
  );
};