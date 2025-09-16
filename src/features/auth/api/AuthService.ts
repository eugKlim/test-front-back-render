import $api from '../../../shared/api/http';
import { User } from '../../../store/authSlice';

export type AuthResponse = { user: User; accessToken: string };

export default class AuthService {
  static async refreshSession(): Promise<AuthResponse | undefined> {
    try {
      if (localStorage.getItem('token')) return;
      const response = await $api.get<AuthResponse>('/refresh', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const response = await $api.post<AuthResponse>('/login', {
      email,
      password,
    });
    return response.data;
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    const response = await $api.post<AuthResponse>('/registration', {
      email,
      password,
    });
    return response.data;
  }

  static async logout() {
    return $api.post('/logout');
  }

  static async checkAuth(): Promise<AuthResponse | undefined> {
    try {
      const response = await $api.get<AuthResponse>('/refresh', {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log('Ошибка обновы токена', error);
    }
  }
}
