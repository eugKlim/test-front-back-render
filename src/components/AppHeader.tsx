import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRole } from '../shared/hooks';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import AuthService from '../features/auth/api/AuthService';
import { setAuth, setUser } from '../store/authSlice';

const AppHeader = () => {
  const isUser = useRole('user');
  const isAdmin = useRole('admin');
  const isManager = useRole('manager');
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await AuthService.logout();
    localStorage.removeItem('token');
    dispatch(setAuth(false));
    dispatch(setUser(null));
  };

  return (
    <nav>
      <span>{user?.email}</span>
      {isUser && <NavLink to="/user">user page</NavLink>}
      {isAdmin && <NavLink to="/admin">admin page</NavLink>}
      {isManager && <NavLink to="/manager">manager page</NavLink>}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default AppHeader;
