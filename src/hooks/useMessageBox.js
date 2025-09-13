import { useContext } from 'react';
import { MessageBoxContext } from '../contexts/MessageBoxContext';

export const useMessageBox = () => {
  const context = useContext(MessageBoxContext);
  if (!context) throw new Error('useMessageBox must be used within MessageBoxProvider');
  return context;
};