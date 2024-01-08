import { Navigate } from 'react-router-dom';

import LayoutProvider from '../layouts/LayoutProvider';
import ManagerNavbar from '../layouts/navbar/ManagerNavbar';

import StatisticResidentYear from '../pages/manager/statistic-resident/StatisticResidentYear';
import StatisticResidentMonth from '../pages/manager/statistic-resident/StatisticResidentMonth';
import PoliceNavbar from '../layouts/navbar/PoliceNavbar';
import PoliceResident from '../pages/police/PoliceResident';
import PoliceTemporaryResidence from '../pages/police/PoliceTemporaryResidence';
import PoliceTemporaryAbsence from '../pages/police/PoliceTemporaryAbsence';
import StaffDashboard from '../pages/staff/StaffDashboard';

const policeRoutes = [
  {
    path: '/police',
    element: <Navigate to='/police/dashboard' />,
  },
  {
    path: '/police/dashboard',
    element: (
      <LayoutProvider navbar={<PoliceNavbar />}>
        <StaffDashboard />
      </LayoutProvider>
    ),
  },
  {
    path: '/police/resident',
    element: (
      <LayoutProvider navbar={<PoliceNavbar />}>
        <PoliceResident />
      </LayoutProvider>
    ),
  },
  {
    path: '/police/temporary-residence',
    element: (
      <LayoutProvider navbar={<PoliceNavbar />}>
        <PoliceTemporaryResidence />
      </LayoutProvider>
    ),
  },
  {
    path: '/police/temporary-absence',
    element: (
      <LayoutProvider navbar={<PoliceNavbar />}>
        <PoliceTemporaryAbsence />
      </LayoutProvider>
    ),
  },
];
export default policeRoutes;
