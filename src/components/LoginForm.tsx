import React, { useMemo, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import AuthService from '../features/auth/api/AuthService';
import { setAuth, setUser } from '../store/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const isEmailValid = useMemo(() => /.+@.+\..+/.test(email), [email]);
  const isPasswordValid = useMemo(() => password.length >= 8, [password]);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async () => {
    setError(null);
    if (!isFormValid) {
      setError('Проверьте email и длину пароля (мин 8)');
      return;
    }
    setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.user));
    } catch (error) {
      setError('Неверный email или пароль');
    }
    setLoading(false);
  };

  const handleRegistration = async () => {
    setError(null);
    if (!isFormValid) {
      setError('Проверьте email и длину пароля (мин 8)');
      return;
    }
    setLoading(true);
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.user));
    } catch (error) {
      setError('Ошибка регистрации');
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button onClick={handleLogin} disabled={loading || !isFormValid}>
        {loading ? 'Входим...' : 'Логин'}
      </button>
      <button onClick={handleRegistration} disabled={loading || !isFormValid}>
        {loading ? 'Регистрируем...' : 'Регистр'}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginForm;
