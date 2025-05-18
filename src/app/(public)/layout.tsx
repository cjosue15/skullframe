import { PublicHeader } from '../components/public-header';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <PublicHeader />
      <main className='flex-grow'>{children}</main>
    </div>
  );
}
