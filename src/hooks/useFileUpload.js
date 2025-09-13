import { useState } from 'react';
import { FileService } from '../services/fileService';
import { v4 as uuidv4 } from 'uuid';

export const useFileUpload = () => {
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadFiles = async (files) => {
    setUploadingFiles(true);
    setUploadError(null);
    
    try {
      const result = await FileService.uploadFiles(files);
      
      const uploadMessage = {
        id: uuidv4(),
        type: 'system',
        content: `Successfully uploaded ${files.length} file(s): ${files.map(f => f.name).join(', ')}. Total chunks processed: ${result.total_chunks}`,
        timestamp: new Date().toLocaleTimeString()
      };
      
      return { success: true, message: uploadMessage, result };
    } catch (error) {
      const errorMessage = {
        id: uuidv4(),
        type: 'system',
        content: `Upload failed: ${error.message}`,
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      
      setUploadError(error.message);
      return { success: false, message: errorMessage, error };
    } finally {
      setUploadingFiles(false);
    }
  };

  return {
    uploadFiles,
    uploadingFiles,
    uploadError
  };
};
