import { getProduct } from '@/app/actions';
import { ContactButton } from '@/app/components/contact-button';
import Image from 'next/image';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <section className='bg-white mt-20'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center gap-8'>
          <div className='flex-shrink-0'>
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={500}
              height={500}
              className='size-[500px] object-cover rounded-lg'
              priority
            />
          </div>
          <div>
            <h1 className='text-3xl font-bold'>{product.title}</h1>
            <p className='mt-4 text-base'>{product.description}</p>

            <p className='mt-4 text-2xl font-semibold'>S/ {product.price}</p>
            <ContactButton className='mt-4 w-full' />
          </div>
        </div>
      </div>
    </section>
  );
}
