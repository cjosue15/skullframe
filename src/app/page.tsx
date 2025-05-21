import { Hero } from './components/Hero';
import { LastThreeProducts } from './components/LastThreeProducts';
import { getLastThreeProducts } from './actions';
import { PublicHeader } from './components/public-header';
import { Footer } from './components/footer';

export default async function Home() {
  const products = await getLastThreeProducts();

  return (
    <>
      <PublicHeader />
      <Hero />
      <LastThreeProducts products={products} />
      <Footer />
    </>
  );
}
