import { ApiService } from './api';

export class AuthService {
  static async login(email, password) {
    return ApiService.request('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }
}