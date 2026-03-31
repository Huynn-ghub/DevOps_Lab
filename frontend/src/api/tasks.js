import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const getTasks = () => API.get('/tasks');
export const createTask = (title) => API.post('/tasks', { title });
export const toggleTask = (id) => API.put(`/tasks/${id}/toggle`);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
