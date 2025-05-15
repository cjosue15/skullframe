import { Card } from '@/components/Card';
import React from 'react';
import { FormProduct } from './FormProduct';
import { getCategories } from '@/app/lib/querys';

async function ProductPage() {
  const categories = await getCategories();
  return (
    <Card>
      <h1 className='text-2xl font-bold mb-6'>Agregar Producto</h1>

      <FormProduct categories={categories} />
    </Card>
  );
}

export default ProductPage;
