import { getProdcuts } from '@/app/lib/querys';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

import { RiAddLine } from '@remixicon/react';
import Link from 'next/link';
import { ProductsTable } from './products-table';

const data: Array<{
  id: number;
  name: string;
  sales: string;
  region: string;
  status: string;
  deltaType: string;
  hours: number;
}> = [
  {
    id: 1,
    name: 'Peter McCrown',
    sales: '1,000,000',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'moderateIncrease',
    hours: 100,
  },
  {
    id: 2,
    name: 'Jon Mueller',
    sales: '2,202,000',
    region: 'Region B',
    status: 'overperforming',
    deltaType: 'moderateIncrease',
    hours: 110,
  },
  {
    id: 3,
    name: 'Peter Federer',
    sales: '1,505,000',
    region: 'Region C',
    status: 'underperforming',
    deltaType: 'moderateDecrease',
    hours: 90,
  },
  {
    id: 4,
    name: 'Maxime Bujet',
    sales: '500,000',
    region: 'Region D',
    status: 'overperforming',
    deltaType: 'moderateDecrease',
    hours: 92,
  },
  {
    id: 5,
    name: 'Emma Nelly',
    sales: '600,000',
    region: 'Region E',
    status: 'underperforming',
    deltaType: 'moderateDecrease',
    hours: 95,
  },
];

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
