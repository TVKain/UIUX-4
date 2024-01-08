import Navbar from './Navbar';

const items = [
  { name: 'Trang chủ', route: 'dashboard' },
  { name: 'Căn hộ', route: 'apartment' },
  { name: 'Cư dân', route: 'resident' },
  { name: 'Khoản thu', route: 'invoice' },
  { name: 'Yêu cầu', route: 'request' },
  { name: 'Thông báo', route: 'notification' },
];

export default function StaffNavbar() {
  return <Navbar base='staff' items={items} />;
}
