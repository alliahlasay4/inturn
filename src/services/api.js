import axios from 'axios';

// This will work for all 3 frontend developers
// Backend team will run their server on localhost:5000
const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Admin APIs - Person B will add these
export const adminAPI = {
  getInterns: () => api.get('/admin/interns'),
  createIntern: (internData) => api.post('/admin/interns', internData),
  updateIntern: (id, internData) => api.put(`/admin/interns/${id}`, internData),
  deleteIntern: (id) => api.delete(`/admin/interns/${id}`),
};

// Intern APIs - Person C will add these
export const internAPI = {
  getMyTasks: () => api.get('/intern/tasks'),
  submitTask: (taskId, submission) => api.post(`/intern/tasks/${taskId}/submit`, submission),
  getMyProfile: () => api.get('/intern/profile'),
};