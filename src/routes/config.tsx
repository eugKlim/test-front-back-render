import { ROLES, Role } from '../shared/config/roles';
import React, { lazy } from 'react';
const UserPage = lazy(() => import('../pages/UserPage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const ManagerPage = lazy(() => import('../pages/ManagerPage'));
const Forbidden = lazy(() => import('../pages/Forbidden'));
const NotFound = lazy(() => import('../pages/NotFound'));

export interface AppRoute {
  path: string;
  element: React.ReactElement;
  requiredRole?: Role;
}

export const publicRoutes: AppRoute[] = [{ path: '/', element: <UserPage /> }];

export const privateRoutes: AppRoute[] = [
  { path: '/user', element: <UserPage />, requiredRole: ROLES.USER },
  { path: '/admin', element: <AdminPage />, requiredRole: ROLES.ADMIN },
  { path: '/manager', element: <ManagerPage />, requiredRole: ROLES.MANAGER },
];

export const systemRoutes: AppRoute[] = [
  { path: '/forbidden', element: <Forbidden /> },
  { path: '*', element: <NotFound /> },
];
