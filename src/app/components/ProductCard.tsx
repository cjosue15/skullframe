'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../dtos/products.dtos';
import { ContactButton } from './contact-button';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <article className='bg-white border border-gray-200 shadow-lg rounded-lg p-5 flex flex-col items-center'>
        <picture className='mb-4 group'>
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={300}
            height={300}
            className='w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105'
          />
        </picture>

        <div className='flex-1 w-full'>
          <h3 className='text-xl font-semibold text-left line-clamp-1'>
            {product.title}
          </h3>
          <p className='text-gray-600 mt-2 text-pretty line-clamp-3'>
            {product.shortDescription}
          </p>
        </div>

        <div className='flex justify-between items-center w-full mt-4'>
          <p className='text-lg font-bold text-primary mt-4'>
            S/ {product.price.toFixed(2)}
          </p>

          <ContactButton onClick={(e) => e.preventDefault()} />
        </div>
      </article>
    </Link>
  );
}
