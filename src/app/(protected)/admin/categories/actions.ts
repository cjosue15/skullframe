'use server';

import { checkUser } from '@/app/lib/server';
import { db } from '@/db/index';
import { categoriesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteCategory = async (id: number) => {
  try {
    await checkUser();
    await db.delete(categoriesTable).where(eq(categoriesTable.id, id));

    revalidatePath('/admin/categories');
    revalidatePath('/admin/products');
    revalidatePath('/admin/products/add');
  } catch (error: any) {
    if (
      error.code === 'SQLITE_CONSTRAINT' &&
      error.message?.includes('FOREIGN KEY constraint failed')
    ) {
      throw new Error(
        'No se puede eliminar la categoría porque tiene productos asociados.'
      );
    }

    throw new Error('Error al eliminar la categoría');
  }
};

export const createCategory = async (name: string) => {
  try {
    await checkUser();
    await db.insert(categoriesTable).values({ name });

    revalidatePath('/admin/categories');
    revalidatePath('/admin/products');
    revalidatePath('/admin/products/add');
  } catch (error) {
    throw new Error('Error al crear la categoría');
  }
};

export const updateCategory = async (id: number, name: string) => {
  try {
    await checkUser();
    await db
      .update(categoriesTable)
      .set({ name })
      .where(eq(categoriesTable.id, id));

    revalidatePath('/admin/categories');
    revalidatePath('/admin/products');
    revalidatePath('/admin/products/add');
  } catch (error) {
    throw new Error('Error al actualizar la categoría');
  }
};
