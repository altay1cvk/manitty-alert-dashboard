import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Interceptor pour ajouter le token à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    // Récupérer le token du cookie
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(c => c.trim().startsWith('auth-token='));
    
    if (authCookie) {
      const token = authCookie.split('=')[1];
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export const api = {
  getAlerts: async (subject?: string) => {
    const params = subject ? { subject } : {};
    const response = await apiClient.get('/api/alerts', { params });
    return response.data;
  },
  getStats: async (subject?: string) => {
    const params = subject ? { subject } : {};
    const response = await apiClient.get('/api/alerts/stats', { params });
    return response.data;
  },
  getAlertsByMonth: async (year: string, month: string, subject?: string) => {
    const params = subject ? { subject } : {};
    const response = await apiClient.get(`/api/alerts/month/${year}/${month}`, { params });
    return response.data;
  },
  getAlert: async (id: string) => {
    const response = await apiClient.get(`/api/alerts/${id}`);
    return response.data;
  },
};

export default apiClient;
