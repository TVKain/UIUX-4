import Navbar from './Navbar';

const items = [
  { name: 'Trang chủ', route: 'dashboard' },
  { name: 'Cư dân', route: 'resident' },
  { name: 'Tạm trú', route: 'temporary-residence' },
  { name: 'Tạm vắng', route: 'temporary-absence' },
];

export default function PoliceNavbar() {
  return <Navbar base='police' items={items} />;
}
