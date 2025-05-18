import { Hero } from '../components/Hero';
import { LastThreeProducts } from '../components/LastThreeProducts';
import { getLastThreeProducts } from './actions';

export default async function Home() {
  const products = await getLastThreeProducts();

  console.log('products', products);

  return (
    <>
      <Hero />
      <LastThreeProducts products={products} />
    </>
  );
}
