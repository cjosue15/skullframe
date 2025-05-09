const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Store = () => {
  return (
    <section className='container mx-auto py-20'>
      <h2 className='text-4xl text-center font-bungee font-bold mb-10'>
        Productos
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {products.map((product) => (
          <article
            key={product}
            className='bg-white border border-gray-200 shadow-lg rounded-lg p-5 flex flex-col items-center'
          >
            <picture>
              <img
                src='./product.jpeg'
                alt='Dron de la tienda SkullFrame'
                className='w-full h-48 object-cover rounded-lg mb-4'
              />
            </picture>

            <div className='text-center'>
              <h3 className='text-xl font-semibold'>
                Conector Tipo Banana 3.5 MM
              </h3>
              <p className='text-gray-600 mt-2'>
                Ideal para conectar dispositivos de audio como auriculares,
                altavoces y micrófonos.
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className='flex justify-center mt-10'>
        <button className='bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition duration-300'>
          Ver más productos
        </button>
      </div>
    </section>
  );
};
