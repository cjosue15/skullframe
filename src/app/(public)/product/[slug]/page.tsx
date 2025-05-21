import { getProduct } from '@/app/actions';
import { ContactButton } from '@/app/components/contact-button';
import { RiArrowLeftLongLine } from '@remixicon/react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [product.imageUrl],
    },
    alternates: {
      canonical: `https://skullframe.com/product/${slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className='my-5 md:my-10'>
      <div className='max-w-md md:max-w-5xl mx-auto px-4 py-8'>
        <Link
          href='/store'
          className='font-semibold flex items-center gap-2 mb-6'
        >
          <RiArrowLeftLongLine /> Volver a la tienda
        </Link>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
          <div className='flex-shrink-0'>
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={450}
              height={450}
              className='size-[300px] md:size-[400px] lg:size-[450px] object-cover rounded-lg'
              priority
            />
          </div>
          <div className='flex-1'>
            <h1 className='text-3xl font-extrabold'>{product.title}</h1>
            <p className='mt-4 text-3xl font-semibold'>
              S/ {product.price.toFixed(2)}
            </p>
            <p className='mt-4 text-base font-bold'>Descripción :</p>
            <p className='mt-1 text-base'>{product.shortDescription}</p>

            <div
              className='prose leading-4 text-black'
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            <p className='mt-4 text-base font-bold'>Categoría :</p>
            <p className='mt-1 text-base'>{product.categoryName}</p>

            <ContactButton className='mt-4 w-full' />
          </div>
        </div>
      </div>
    </section>
  );
}
