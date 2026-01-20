import axios from 'axios';
import { authStore } from '../store/authStore.ts';

const registrarClient = axios.create({
    baseURL: '/api/ntu-registrar',
    headers: {
        'Content-Type': 'application/json',
        'Content-Encoding': 'UTF-8'
    }
});

registrarClient.interceptors.request.use((config) => {
    const authState = authStore();
    const token: string | null = authState.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default registrarClient;
