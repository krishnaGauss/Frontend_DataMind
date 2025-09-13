import React, { createContext, useState, useCallback } from 'react';
import { MessageBox } from '../components/common/MessageBox';

export const MessageBoxContext = createContext();

export const MessageBoxProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('alert');
  const [callbacks, setCallbacks] = useState({ onConfirm: () => {}, onCancel: () => {} });

  const showMessageBox = useCallback((message, messageType = 'alert', onConfirm = () => {}, onCancel = () => {}) => {
    setContent(message);
    setType(messageType);
    setCallbacks({ onConfirm, onCancel });
    setIsOpen(true);
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    callbacks.onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
    callbacks.onCancel();
  };

  return (
    <MessageBoxContext.Provider value={{ showMessageBox }}>
      {children}
      <MessageBox
        message={isOpen ? content : null}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        type={type}
      />
    </MessageBoxContext.Provider>
  );
};