'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Toolbar } from '../components/Toolbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='flex h-screen'>
      <Sidebar isOpen={isOpen} />

      <main
        className={`flex-1 overflow-y-auto bg-gray-100 ${
          isOpen ? 'ml-0' : '-ml-64'
        } transition-all duration-300 ease-in-out`}
      >
        <Toolbar handleToggleSidebar={toggleSidebar} />

        <div className='p-6'>{children}</div>
      </main>
    </div>
  );
}
