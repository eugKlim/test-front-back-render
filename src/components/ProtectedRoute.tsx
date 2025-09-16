import { useAppSelector } from '../shared/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../store/authSlice';
import { Role } from '../shared/config/roles';

interface Props {
  requiredRole: Role;
  redirectTo?: string;
}

const ProtectedRoute = ({ requiredRole, redirectTo = '/' }: Props) => {
  const { isAuth, user } = useAppSelector(
    (state) => state.auth as { isAuth: boolean; user: User | null }
  );

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  if (!user?.roles || !user.roles.includes(requiredRole)) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
