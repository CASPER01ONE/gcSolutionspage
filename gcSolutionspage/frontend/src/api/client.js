import axios from 'axios';

// Usa '/api' en desarrollo (proxy de Vite) y variable en producción
const baseURL = import.meta.env.VITE_API_BASE || '/api';

const api = axios.create({ baseURL });

export default api;