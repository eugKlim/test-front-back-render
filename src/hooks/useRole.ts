import { useAppSelector } from './redux';

export const useRole = (requiredRole: string): boolean => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user?.roles) return false;
  return user.roles.includes(requiredRole);
};
