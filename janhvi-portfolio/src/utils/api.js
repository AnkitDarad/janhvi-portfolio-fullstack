import { projects } from '../data/projects';

export const IMAGE_BASE = '';

export const api = {
  async getProjects() {
    return projects;
  },

  async getProject(id) {
    const project = projects.find(p => p.id === parseInt(id));
    if (!project) throw new Error('Project not found');
    return project;
  },

  async sendMessage(data) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get('content-type');
      let result;
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `Status: ${response.status}`);
      }
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message');
      }
      
      return { success: true, message: 'Thank you! Your message has been sent.' };
    } catch (error) {
      console.error('Submission error:', error);
      if (error.message.includes('Unexpected end of JSON input')) {
        throw new Error('API server is not responding correctly. Are you running in development mode?');
      }
      throw error;
    }
  },
};
