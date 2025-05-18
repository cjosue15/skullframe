import { Product } from '@/app/dtos/products.dtos';
import { getCategories } from '@/app/lib/querys';
import { Card } from '@/components/Card';
import { FormProduct } from './FormProduct';

async function ProductPage({ product }: { product?: Product }) {
  const categories = await getCategories();
  return (
    <Card>
      <h1 className='text-2xl font-bold mb-6'>
        {`${product?.slug ? 'Editar' : 'Agregar'} `} Producto
      </h1>

      <FormProduct categories={categories} product={product} />
    </Card>
  );
}

export default ProductPage;
