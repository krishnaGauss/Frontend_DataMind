import { ApiService } from './api';
import { API_BASE_URL } from '../utils/constants';

export class ChatService {
  static async fetchHistory(token) {
    return ApiService.request('/chat-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  }

  static async createSession(token) {
    return ApiService.request('/new-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  }

  static async sendMessage(message, sessionId) {
    return ApiService.request('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id: sessionId }),
    });
  }

  static async saveSession(session) {
    try {
      await fetch(`${API_BASE_URL}/chat-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session }),
      });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  static async getStatus() {
    const response = await fetch(`${API_BASE_URL}/status`);
    return response.json();
  }

  static async resetSystem() {
    const response = await fetch(`${API_BASE_URL}/reset`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Reset failed');
  }
}