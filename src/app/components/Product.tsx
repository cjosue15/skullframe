import Image from 'next/image';

export const Product = () => {
  return (
    <article>
      <picture>
        <Image
          src='./product.jpeg'
          width={500}
          height={500}
          alt='Dron de la tienda SkullFrame'
        />
      </picture>

      <div>
        <h3>Conector Tipo Banana 3.5 MM</h3>
        <p>
          Ideal para conectar dispositivos de audio como auriculares, altavoces
          y micrófonos.
        </p>
      </div>
    </article>
  );
};
