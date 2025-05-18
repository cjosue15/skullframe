import { getOneProduct } from '../../actions';
import ProductPage from '../../add/page';

export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getOneProduct(slug);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return <ProductPage product={product} />;
}
