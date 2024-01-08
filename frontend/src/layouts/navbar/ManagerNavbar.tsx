import Navbar from './Navbar';

const items = [
  { name: 'Trang chủ', route: 'dashboard' },
  { name: 'Thống kê cư dân', route: 'statistic/resident' },
  { name: 'Thống kê khoản thu', route: 'statistic/invoice' },
];

export default function ManagerNavbar() {
  return <Navbar base='manager' items={items} />;
}
