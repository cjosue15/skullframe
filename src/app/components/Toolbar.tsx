import React from 'react';
import { RiMenuLine } from '@remixicon/react';

export function Toolbar({
  handleToggleSidebar,
}: {
  handleToggleSidebar: () => void;
}) {
  return (
    <header className='bg-white h-16 flex items-center justify-between px-4 shadow-sm'>
      <button className='cursor-pointer p-2' onClick={handleToggleSidebar}>
        <RiMenuLine className='text-black' />
      </button>

      {/* <button className='bg-white text-primary px-4 py-2 rounded'>
        Logout
      </button> */}
    </header>
  );
}
