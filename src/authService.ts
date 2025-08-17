import axios from 'axios';

const API = 'http://127.0.0.1:5000/api';

export const register = (username: string, email: string, password: string) =>
  axios.post(`${API}/register`, { username, email, password });

export const login = (email: string, password: string) =>
  axios.post(`${API}/login`, { email, password });
