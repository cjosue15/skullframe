'use server';

import { revalidatePath } from 'next/cache';

export const revalidate = async (pathname: string) => {
  revalidatePath(pathname);
};
