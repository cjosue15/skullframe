import Image from 'next/image';
import Link from 'next/link';

export function PublicHeader() {
  return (
    <header
      id='header'
      className='bg-transparent backdrop-blur-sm text-black py-4 sticky top-0 z-10 h-[60px]'
    >
      <div className='container px-4 mx-auto'>
        <div className='flex items-center justify-between'>
          <picture>
            <Image
              src='/logo.png'
              alt='Logo'
              width={100}
              height={50}
              className='h-6 w-auto'
              priority
            />
          </picture>
          <nav>
            <ul className='flex space-x-4'>
              <li>
                <Link href='/' className='font-semibold hover:text-primary'>
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href='/store'
                  className='font-semibold hover:text-primary'
                >
                  Tienda
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
