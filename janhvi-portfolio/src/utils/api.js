export const IMAGE_BASE = 'https://janhvi-backend.onrender.com';
const API_BASE = 'https://janhvi-backend.onrender.com/api';

const getToken = () => localStorage.getItem('authToken');

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  async getConfig() {
    const res = await fetch(`${API_BASE}/config`);
    if (!res.ok) throw new Error('Failed to fetch config');
    return res.json();
  },

  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async verifyToken() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Token invalid');
    return res.json();
  },

  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      headers: authHeaders(),
    });
    if (!res.ok) {
      if (res.status === 403) throw new Error('Access denied');
      if (res.status === 404) throw new Error('Project not found');
      throw new Error('Failed to fetch project');
    }
    return res.json();
  },

  async sendMessage({ name, email, subject, message }) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send message');
    return data;
  },
};
