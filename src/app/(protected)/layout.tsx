// import { redirect } from 'next/navigation';
import { MainLayout } from '../components/MainLayout';
// import { getSecureUser } from '../lib/server';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getSecureUser();

  // if (!user) {
  //   redirect('/sign-in');
  // }

  // console.log(user);

  return <MainLayout>{children}</MainLayout>;
}
