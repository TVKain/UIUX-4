import staffRoutes from './staffRoutes';
import residentRoutes from './residentRoutes';
import managerRoutes from './managerRoutes';
import policeRoutes from './policeRoutes';

import { Navigate } from 'react-router-dom';

import Login from '../pages/login/Login';

const routes = [
  {
    path: '/',
    element: <Navigate to='/login' />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  ...staffRoutes,
  ...residentRoutes,
  ...managerRoutes,
  ...policeRoutes,
];

export default routes;
