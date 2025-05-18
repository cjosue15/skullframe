import React from 'react';
import { Product } from '../dtos/products.dtos';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { RiWhatsappLine } from '@remixicon/react';

export function ProductCard({ product }: { product: Product }) {
  return (
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

      <div className='flex-1'>
        <h3 className='text-xl font-semibold text-left'>{product.title}</h3>
        <p className='text-gray-600 mt-2 text-pretty'>
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </p>
      </div>

      <div className='flex justify-between items-center w-full mt-4'>
        <p className='text-lg font-bold text-primary mt-4'>
          S/ {product.price.toFixed(2)}
        </p>
        <Button className='flex items-center gap-2 cursor-pointer'>
          Contactar <RiWhatsappLine size={18} />
        </Button>
      </div>
    </article>
  );
}
