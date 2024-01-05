import Navbar from './Navbar';

const items = [
  { name: 'Trang chủ', route: 'dashboard' },
  { name: 'Thành viên', route: 'member' },
  { name: 'Khoản thu', route: 'invoice' },
  { name: 'Thông báo', route: 'notification' },
  { name: 'Yêu cầu', route: 'request' },
  { name: 'Tạm trú', route: 'temporary-residence' },
  { name: 'Tạm vắng', route: 'temporary-absence' },
  { name: 'Hồ sơ', route: 'profile' },
];

export default function ResidentNavbar() {
  return <Navbar base='resident' items={items} />;
}
