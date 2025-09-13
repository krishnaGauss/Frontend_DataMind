import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../../hooks/useChat';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useMessageBox } from '../../hooks/useMessageBox';
import { ChatService } from '../../services/chatService';
import { Header } from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import { ChatArea } from './ChatArea';
import { MessageInput } from './MessageInput';
import { UploadButton } from './UploadButton';

export const ChatApp = ({ token, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showMessageBox } = useMessageBox();
  const { uploadFiles, uploadingFiles } = useFileUpload();
  
  const {
    sessions,
    setSessions,
    currentSessionId,
    setCurrentSessionId,
    systemStatus,
    checkSystemStatus,
    createNewSession
  } = useChat(token);

  const handleNewChat = async () => {
    setIsSidebarOpen(false);
    try {
      await createNewSession();
    } catch (error) {
      showMessageBox('Failed to create a new chat. Please try again.', 'alert');
    }
  };

  const handleFileUpload = async (files) => {
    const result = await uploadFiles(files);
    
    if (result.message) {
      setSessions(prev => ({
        ...prev,
        [currentSessionId]: {
          ...prev[currentSessionId],
          messages: [...(prev[currentSessionId]?.messages || []), result.message]
        }
      }));
    }
    
    if (result.success) {
      await checkSystemStatus();
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !currentSessionId) return;

    const userMessage = {
      id: uuidv4(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setSessions(prev => ({
      ...prev,
      [currentSessionId]: {
        ...prev[currentSessionId],
        messages: [...(prev[currentSessionId]?.messages || []), userMessage],
        lastActivity: new Date().toISOString()
      }
    }));
    
    setIsLoading(true);
    const currentMessage = inputMessage;
    setInputMessage('');

    try {
      const result = await ChatService.sendMessage(currentMessage, currentSessionId);
      
      const botMessage = {
        id: uuidv4(),
        type: 'bot',
        content: result.response,
        timestamp: new Date().toLocaleTimeString(),
        sources: result.source_documents || []
      };
      
      setSessions(prev => {
        const updatedSessions = {
          ...prev,
          [currentSessionId]: {
            ...prev[currentSessionId],
            messages: [...(prev[currentSessionId]?.messages || []), botMessage],
            lastActivity: new Date().toISOString(),
          }
        };
        ChatService.saveSession(updatedSessions[currentSessionId]);
        return updatedSessions;
      });
      
    } catch (error) {
      const errorMessage = {
        id: uuidv4(),
        type: 'bot',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setSessions(prev => ({
        ...prev,
        [currentSessionId]: {
          ...prev[currentSessionId],
          messages: [...(prev[currentSessionId]?.messages || []), errorMessage],
          lastActivity: new Date().toISOString(),
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      await ChatService.resetSystem();
      setSessions({});
      setCurrentSessionId(null);
      await checkSystemStatus();
      await handleNewChat();
    } catch (error) {
      showMessageBox(`Reset failed: ${error.message}`, 'alert');
    }
  };

  const currentSessionMessages = sessions[currentSessionId]?.messages || [];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={setCurrentSessionId}
        onNewChat={handleNewChat}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <Header
          currentSession={sessions[currentSessionId]}
          systemStatus={systemStatus}
          onReset={handleReset}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex-1 flex w-full p-4 overflow-hidden">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden max-w-6xl mx-auto">
            <ChatArea
              messages={currentSessionMessages}
              isLoading={isLoading}
              systemStatus={systemStatus}
            />

            <div className="border-t border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row gap-2 items-end">
                <UploadButton onUpload={handleFileUpload} disabled={uploadingFiles} />
                <MessageInput
                  value={inputMessage}
                  onChange={setInputMessage}
                  onSend={sendMessage}
                  disabled={isLoading}
                  systemStatus={systemStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};