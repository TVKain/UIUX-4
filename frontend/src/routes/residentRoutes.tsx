import { Navigate } from 'react-router-dom';

import LayoutProvider from '../layouts/LayoutProvider';

import ResidentDashboard from '../pages/resident/ResidentDashboard';
import ResidentNavbar from '../layouts/navbar/ResidentNavbar';
import ResidentMember from '../pages/resident/member/ResidentMember';
import ResidentDeclaration from '../pages/resident/ResidentDeclaration';
import ResidentComplaints from '../pages/resident/request/ResidentComplaints';
import ResidentInvoice from '../pages/resident/invoice/ResidentInvoice';
import ResidentRequest from '../pages/resident/request/ResidentRequest';
import ResidentAddRequest from '../pages/resident/request/ResidentAddRequest';
import TemporaryResidence from '../pages/resident/temporary-residence/TemporaryResidence';
import TemporaryAbsence from '../pages/resident/temporary-absence/TemporaryAbsence';
import StaffDashboard from '../pages/staff/StaffDashboard';

import Notification from '../pages/resident/notification/Notification';

const residentRoutes = [
  {
    path: '/resident',
    element: <Navigate to='/resident/dashboard' />,
  },
  {
    path: '/resident/dashboard',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <StaffDashboard />
      </LayoutProvider>
    ),
  },
  {
    path: '/resident/member',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <ResidentMember />
      </LayoutProvider>
    ),
  },
  {
    path: '/resident/declaration',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <ResidentDeclaration />
      </LayoutProvider>
    ),
  },
  {
    path: '/resident/request',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <ResidentRequest />
      </LayoutProvider>
    ),
  },
  {
    path: '/resident/invoice',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <ResidentInvoice />
      </LayoutProvider>
    ),
  },
  {
    path: '/resident/request/add',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <ResidentAddRequest />
      </LayoutProvider>
    ),
  },
  {
    path: '/resident/temporary-residence',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <TemporaryResidence />
      </LayoutProvider>
    ),
  },
  {
    path: '/resident/temporary-absence',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <TemporaryAbsence />
      </LayoutProvider>
    ),
  },
  {
    path: '/resident/notification',
    element: (
      <LayoutProvider navbar={<ResidentNavbar />}>
        <Notification />
      </LayoutProvider>
    ),
  },
];
export default residentRoutes;
