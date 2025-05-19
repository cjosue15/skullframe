import { getProdcuts } from '@/app/lib/querys';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

import { RiAddLine } from '@remixicon/react';
import Link from 'next/link';
import { ProductsTable } from './products-table';

export default async function ProductsPage() {
  const products = await getProdcuts();

  return (
    <section>
      <div className='mb-6 mt-4 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Productos</h1>
          <p className='text-black'>Controla tus productos y sus detalles.</p>
        </div>

        <Button asChild className='font-semibold cursor-pointer'>
          <Link href='/admin/products/add'>
            Crear producto <RiAddLine className='ml-2' size={16} />
          </Link>
        </Button>
      </div>

      <Card>
        <ProductsTable products={products} />
      </Card>
    </section>
  );
}
