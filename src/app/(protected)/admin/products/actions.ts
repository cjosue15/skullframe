'use server';

import { r2 } from '@/app/lib/r2';
import { db } from '@/db/index';
import { productsTable } from '@/db/schema';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteProduct = async (id: number) => {
  try {
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
  } catch (error) {
    throw error;
  }
};
