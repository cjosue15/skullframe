import { RiBox3Line, RiDashboardLine, RiFolderLine } from '@remixicon/react';
import Link from 'next/link';

const MENU = [
  {
    name: 'Dashboard',
    route: '/admin',
    icon: <RiDashboardLine className='w-5 h-5' />,
  },
  {
    name: 'Productos',
    route: '/admin/products',
    icon: <RiBox3Line className='w-5 h-5' />,
  },
  {
    name: 'Categorías',
    route: '/admin/categories',
    icon: <RiFolderLine className='w-5 h-5' />,
  },
];

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`${
        !isOpen ? '-translate-x-64' : 'translate-x-0'
      } bg-primary w-64 text-white transition-transform duration-300`}
    >
      <nav className='flex flex-col p-4'>
        <h1 className='text-xl font-bold mb-4'>Admin Panel</h1>
        <ul>
          {MENU.map((item) => (
            <li key={item.name} className='mb-2'>
              <Link
                href={item.route}
                className='flex items-center p-3 rounded-md hover:bg-white hover:text-primary transition-colors'
              >
                {item.icon}
                <span className='ml-2 font-medium'>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
