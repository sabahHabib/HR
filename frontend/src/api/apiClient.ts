import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

export const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',

});
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
             config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else if (error.response?.status === 403) {

            alert('Permission denied. You do not have access to this resource.');
            window.location.href = '/admin-only';
        }
        return Promise.reject(error);
    }
);





