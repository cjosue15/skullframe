import { ProductCard } from '@/app/components/ProductCard';
import { getProdcuts } from '@/app/lib/querys';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => ({
  title: 'Tienda | Skullframe',
  description:
    'Explora y compra productos exclusivos en la tienda de Skullframe. Encuentra arte, accesorios y más.',
  openGraph: {
    title: 'Tienda | Skullframe',
    description:
      'Explora y compra productos exclusivos en la tienda de Skullframe. Encuentra arte, accesorios y más.',
    url: 'https://skullframe.com/store',
    siteName: 'Skullframe',
    images: [
      {
        url: 'https://skullframe.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tienda | Skullframe',
      },
    ],
    locale: 'es-ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://skullframe.com/store',
  },
});

export default async function StorePage() {
  const products = await getProdcuts();
  // const categories = await getCategories();

  return (
    <section className='my-12'>
      <h1 className='text-4xl font-bold mb-2 text-center'>Tienda</h1>
      <p className='text-lg text-gray-600 text-center'>
        ¡Bienvenido a nuestra tienda!
      </p>

      <div className='container px-4 mx-auto mt-8'>
        <div className='flex gap-4'>
          {/* <aside>
            <h2 className='text-xl font-bold mb-4'>Categorías</h2>
            <ul className='flex flex-col gap-4 w-[200px]'>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className='bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold'
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </aside> */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  imageUrl: product.imageUrl,
                  categoryId: product.categoryId,
                  fileUrl: product.fileUrl,
                  slug: product.slug,
                  type: product.type,
                  shortDescription: product.shortDescription,
                  updatedAt: product.updatedAt,
                  createdAt: product.createdAt,
                }}
              />
            ))}
            {products.length === 0 && (
              <div className='col-span-1 sm:col-span-2 lg:col-span-3 text-center'>
                <p className='text-lg text-gray-600'>
                  No hay productos disponibles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
