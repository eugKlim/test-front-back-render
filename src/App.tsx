import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import AuthService from './features/auth/api/AuthService';
import { setAuth, setLoading, setUser } from './store/authSlice';
import LoginForm from './components/LoginForm';
import AppHeader from './components/AppHeader';
import AppRouter from './routes/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';

// interface IResponse {
//   email: string;
//   id: string;
//   isActivated: boolean;
//   roles: string[];
// }

const App = () => {
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onSignout = () => {
      localStorage.removeItem('token');
      dispatch(setAuth(false));
      dispatch(setUser(null));
    };
    window.addEventListener('auth:signout', onSignout as EventListener);
    return () =>
      window.removeEventListener('auth:signout', onSignout as EventListener);
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token === null) {
      dispatch(setLoading(false));
      return;
    }
    AuthService.checkAuth()
      .then((response) => {
        console.log(response);
        if (!response) throw new Error('No response');
        localStorage.setItem('token', response.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(response.user));
      })
      .catch(() => {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        localStorage.removeItem('token');
        console.log('ВЫКИД');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  if (isLoading) return <div>Загрузка....</div>;

  if (!isAuth) {
    return (
      <>
        <LoginForm />
      </>
    );
  }

  return (
    <div>
      <AppHeader />
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </div>
  );
};

export default App;
