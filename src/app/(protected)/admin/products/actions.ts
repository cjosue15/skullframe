'use server';

import { Product } from '@/app/dtos/products.dtos';
import { r2 } from '@/app/lib/r2';
import { checkUser } from '@/app/lib/server';
import { db } from '@/db/index';
import { productsTable } from '@/db/schema';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const getOneProduct = async (slug: string) => {
  try {
    await checkUser();

    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.slug, slug))
      .limit(1)
      .then((res) => res[0]);
    return product as Product;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await checkUser();

    const productDeleted = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning()
      .then((res) => res[0]);

    if (productDeleted) {
      const slugImage = productDeleted.slug;

      const deleteParams = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: slugImage,
      });

      await r2.send(deleteParams);
    }

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${productDeleted.slug}`);
    revalidatePath('/');
    revalidatePath('/store');
    revalidatePath(`/product/${productDeleted.slug}`);
  } catch (error) {
    throw error;
  }
};
