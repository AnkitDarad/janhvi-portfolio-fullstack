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

      const result = await response.json();
      
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Failed to send message');
      }
      
      return result;
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  },
};
