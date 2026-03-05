import axios from './axios';

export const tutorialAPI = {
  // Get all tutorials
  getAllTutorials: async () => {
    const response = await axios.get('/tutorials');
    return response.data;
  },

  // Get tutorials by category
  getTutorialsByCategory: async (category) => {
    const response = await axios.get(`/tutorials/category/${category}`);
    return response.data;
  },

  // Get single tutorial by slug
  getTutorialBySlug: async (slug) => {
    const response = await axios.get(`/tutorials/${slug}`);
    return response.data;
  },

  // Get category statistics
  getCategoryStats: async () => {
    const response = await axios.get('/tutorials/stats');
    return response.data;
  },

  // Admin: Create tutorial
  createTutorial: async (tutorialData, token) => {
    const response = await axios.post('/tutorials', tutorialData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Admin: Update tutorial
  updateTutorial: async (id, tutorialData, token) => {
    const response = await axios.put(`/tutorials/${id}`, tutorialData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Admin: Delete tutorial
  deleteTutorial: async (id, token) => {
    const response = await axios.delete(`/tutorials/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
