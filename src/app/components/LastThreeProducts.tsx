import { Button } from '@/components/Button';
import { Product } from '../dtos/products.dtos';
import { ProductCard } from './ProductCard';
import Link from 'next/link';
import { RiArrowRightLongLine } from '@remixicon/react';

export const LastThreeProducts = ({ products }: { products: Product[] }) => {
  return (
    <section className='container mx-auto px-4 py-16 md:py-20'>
      <h2 className='text-2xl md:text-4xl text-center font-bungee font-bold mb-10'>
        Productos
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
          <div className='col-span-1 md:col-span-2 lg:col-span-3 text-center'>
            <p className='text-lg text-gray-600'>
              No hay productos disponibles
            </p>
          </div>
        )}
      </div>
      <div className='flex justify-center mt-10'>
        <Button asChild>
          <Link href='/store'>
            Ver más productos
            <RiArrowRightLongLine className='ml-4' size={16} />
          </Link>
        </Button>
      </div>
    </section>
  );
};
