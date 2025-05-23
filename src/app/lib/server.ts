import { currentUser } from '@clerk/nextjs/server';

export async function getSecureUser() {
  const user = await currentUser();

  return user;
}

export async function checkUser() {
  const user = await currentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }
}
