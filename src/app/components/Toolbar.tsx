'use client';

import { UserButton } from '@clerk/nextjs';
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

      <UserButton />
    </header>
  );
}
