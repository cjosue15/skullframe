import { MainLayout } from '../components/MainLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
