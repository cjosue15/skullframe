import { currentUser } from '@clerk/nextjs/server';

export async function getSecureUser() {
  const user = await currentUser();

  return user;
}
