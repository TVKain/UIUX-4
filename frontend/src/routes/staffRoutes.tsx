import { Navigate } from 'react-router-dom';

import LayoutProvider from '../layouts/LayoutProvider';
import StaffDashboard from '../pages/staff/StaffDashboard';

import StaffNavbar from '../layouts/navbar/StaffNavbar';
import StaffApartment from '../pages/staff/apartment/StaffApartment';
import StaffApartmentAdd from '../pages/staff/apartment/StaffApartmentAdd';
import StaffApartmentUpdate from '../pages/staff/apartment/StaffApartmentUpdate';
import StaffResident from '../pages/staff/resident/StaffResident';
import StaffResidentAdd from '../pages/staff/resident/StaffResidentAdd';
import StaffResidentUpdate from '../pages/staff/resident/StaffResidentUpdate';

import StaffInvoice from '../pages/staff/invoice/StaffInvoice';
import StaffRequest from '../pages/staff/request/StaffRequest';
import StaffInvoiceAdd from '../pages/staff/invoice/StaffInvoiceAdd';

import Notification from '../pages/notification/Notification';
import NotificationAdd from '../pages/notification/NotificationAdd';

const staffRoutes = [
  {
    path: '/staff',
    element: <Navigate to='/staff/dashboard' />,
  },
  {
    path: '/staff/dashboard',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffDashboard />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/apartment',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffApartment />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/apartment/add',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffApartmentAdd />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/apartment/update',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffApartmentUpdate />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/apartment/update',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffApartmentUpdate />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/resident',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffResident />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/resident/add',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffResidentAdd />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/resident/update',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffResidentUpdate />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/invoice',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffInvoice />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/invoice/add',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffInvoiceAdd />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/request',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <StaffRequest />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/notification',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <Notification />
      </LayoutProvider>
    ),
  },
  {
    path: '/staff/notification/add',
    element: (
      <LayoutProvider navbar={<StaffNavbar />}>
        <NotificationAdd />
      </LayoutProvider>
    ),
  },
];

export default staffRoutes;
