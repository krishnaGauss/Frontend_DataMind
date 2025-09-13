import { useState, useCallback, useEffect } from 'react';
import { ChatService } from '../services/chatService';

export const useChat = (token) => {
  const [sessions, setSessions] = useState({});
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [systemStatus, setSystemStatus] = useState({ has_documents: false, document_count: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const checkSystemStatus = useCallback(async () => {
    try {
      const status = await ChatService.getStatus();
      setSystemStatus(status);
    } catch (error) {
      console.error('Error checking system status:', error);
    }
  }, []);

  const fetchChatHistory = useCallback(async () => {
    try {
      const data = await ChatService.fetchHistory(token);
      setSessions(data.sessions);
      const sessionIds = Object.keys(data.sessions);
      if (sessionIds.length > 0) {
        const sortedSessions = sessionIds.sort((a, b) => 
          new Date(data.sessions[b].lastActivity) - new Date(data.sessions[a].lastActivity)
        );
        setCurrentSessionId(sortedSessions[0]);
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  }, [token]);

  const createNewSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ChatService.createSession(token);
      const newSession = data.session;
      setSessions(prev => ({
        ...prev,
        [newSession.id]: { ...newSession, messages: [] }
      }));
      setCurrentSessionId(newSession.id);
    } catch (error) {
      console.error('Error creating new session:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchChatHistory();
      checkSystemStatus();
    }
  }, [token, fetchChatHistory, checkSystemStatus]);

  return {
    sessions,
    setSessions,
    currentSessionId,
    setCurrentSessionId,
    systemStatus,
    isLoading,
    checkSystemStatus,
    createNewSession
  };
};