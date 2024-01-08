import { Navigate } from 'react-router-dom';

import LayoutProvider from '../layouts/LayoutProvider';
import ManagerNavbar from '../layouts/navbar/ManagerNavbar';

import StatisticResidentYear from '../pages/manager/statistic-resident/StatisticResidentYear';
import StatisticResidentMonth from '../pages/manager/statistic-resident/StatisticResidentMonth';
import StaffDashboard from '../pages/staff/StaffDashboard';
import StatisticInvoiceYear from '../pages/manager/statistic-invoice/StatisticInvoiceYear';
import StatisticInvoiceMonth from '../pages/manager/statistic-invoice/StatisticInvoiceMonth';

const managerRoutes = [
  {
    path: '/manager',
    element: <Navigate to='/manager/dashboard' />,
  },
  {
    path: '/manager/dashboard',
    element: (
      <LayoutProvider navbar={<ManagerNavbar />}>
        <StaffDashboard />
      </LayoutProvider>
    ),
  },
  {
    path: '/manager/statistic/resident',
    element: <Navigate to='/manager/statistic/resident/year' />,
  },
  {
    path: '/manager/statistic/resident/year',
    element: (
      <LayoutProvider navbar={<ManagerNavbar />}>
        <StatisticResidentYear />
      </LayoutProvider>
    ),
  },
  {
    path: '/manager/statistic/resident/month',
    element: (
      <LayoutProvider navbar={<ManagerNavbar />}>
        <StatisticResidentMonth />
      </LayoutProvider>
    ),
  },
  {
    path: '/manager/statistic/invoice',
    element: <Navigate to='/manager/statistic/invoice/year' />,
  },
  {
    path: '/manager/statistic/invoice/year',
    element: (
      <LayoutProvider navbar={<ManagerNavbar />}>
        <StatisticInvoiceYear />
      </LayoutProvider>
    ),
  },
  {
    path: '/manager/statistic/invoice/month',
    element: (
      <LayoutProvider navbar={<ManagerNavbar />}>
        <StatisticInvoiceMonth />
      </LayoutProvider>
    ),
  },
];
export default managerRoutes;
