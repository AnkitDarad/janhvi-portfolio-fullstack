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
    console.log('Static form submission:', data);
    return { success: true, message: 'Message sent locally (static version)' };
  },
};
