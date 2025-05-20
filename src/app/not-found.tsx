export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <p className='text-lg text-gray-600'>Página no encontrada</p>
      <p className='text-sm text-gray-500 mt-2'>
        Lo sentimos, la página que buscas no existe.
      </p>
    </div>
  );
}
