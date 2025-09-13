import { API_BASE_URL } from '../utils/constants';

export class ApiService {
  static async request(url, options = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Request failed');
    }
    return data;
  }
}