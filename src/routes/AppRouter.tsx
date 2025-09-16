import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes, systemRoutes } from './config';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {privateRoutes.map(({ path, element, requiredRole }) => (
          <Route
            key={path}
            element={
              <ProtectedRoute
                requiredRole={requiredRole!}
                redirectTo="/forbidden"
              />
            }
          >
            <Route path={path} element={element} />
          </Route>
        ))}
        {systemRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
