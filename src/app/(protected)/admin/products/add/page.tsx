import { Card } from '@/components/Card';
import React from 'react';
import { FormProduct } from './FormProduct';

function page() {
  return (
    <Card>
      <h1 className='text-2xl font-bold mb-6'>Agregar Producto</h1>

      <FormProduct />
    </Card>
  );
}

export default page;
