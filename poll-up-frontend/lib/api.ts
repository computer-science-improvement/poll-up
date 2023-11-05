import axios from 'axios';

export const BASE_URL = 'https://1864-78-137-13-80.ngrok-free.app/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

export default api;
