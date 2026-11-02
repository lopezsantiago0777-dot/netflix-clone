import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si el token venció o es inválido, se limpia la sesión y se vuelve al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.assign('/sign-in');
    }
    return Promise.reject(error);
  }
);

export const signUpRequest = (data) => api.post('/users', data).then((r) => r.data);
export const signInRequest = (data) => api.post('/sessions', data).then((r) => r.data);

export const fetchCategories = () => api.get('/categories').then((r) => r.data);
export const fetchMovies = (params = {}) => api.get('/movies', { params }).then((r) => r.data);
export const fetchMovieById = (id) => api.get(`/movies/${id}`).then((r) => r.data);

export const fetchMyList = () => api.get('/users/mylist').then((r) => r.data);
export const addToMyList = (id) => api.put(`/users/mylist/${id}`).then((r) => r.data);
export const removeFromMyList = (id) => api.delete(`/users/mylist/${id}`).then((r) => r.data);