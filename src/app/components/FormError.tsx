import React from 'react';

export function FormError({ name }: { name: string }) {
  return <small className='text-red-600 text-sm'>{name}</small>;
}
