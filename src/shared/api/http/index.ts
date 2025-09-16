import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_BASE_URL as string;
// export const API_URL = `https://server-avgm.onrender.com/api`;
// export const API_URL = `http://localhost:5000/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.defaults.headers.common['Accept'] = 'application/json';
$api.defaults.timeout = 15000;

type RefreshResponse = { accessToken: string };

$api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve($api.request(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const response = await axios.get<RefreshResponse>(
          `${API_URL}/refresh`,
          {
            withCredentials: true,
          }
        );
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('token', newAccessToken);
        onRefreshed(newAccessToken);
        return $api.request(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.dispatchEvent(new CustomEvent('auth:signout'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
