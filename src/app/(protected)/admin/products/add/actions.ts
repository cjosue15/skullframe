'use server';

import { Product } from '@/app/dtos/products.dtos';
import { r2 } from '@/app/lib/r2';
import { checkUser } from '@/app/lib/server';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/app/lib/utils';
import { db } from '@/db/index';
import { productsTable } from '@/db/schema';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type SignedURLResponse = Promise<
  | {
      error: undefined;
      success: { signedUrl: string; url: string; slug: string };
    }
  | { error: string; success?: undefined }
>;

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  baseSlug: string;
  forceSlug?: string;
};

async function generateUniqueSlug(baseSlug: string) {
  await checkUser();

  let slug = baseSlug;
  let count = 1;

  while (
    await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.slug, slug))
      .get()
  ) {
    slug = `${baseSlug}-${count++}`;
  }
  return slug;
}

export const getSignedURL = async ({
  fileType,
  fileSize,
  baseSlug,
  forceSlug,
}: GetSignedURLParams): SignedURLResponse => {
  await checkUser();

  if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
    return { error: 'File type not allowed' };
  }

  if (fileSize > MAX_IMAGE_SIZE) {
    return { error: 'File size too large' };
  }

  const slug = forceSlug ?? (await generateUniqueSlug(baseSlug));

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: slug,
    ContentType: fileType,
  });

  const signedUrl = await getSignedUrl(r2, putObjectCommand, {
    expiresIn: 60,
  });

  const url = `${process.env.R2_BUCKET_PATH}/${slug}`;

  return {
    error: undefined,
    success: {
      signedUrl,
      url,
      slug,
    },
  };
};

// Copia la imagen a la nueva ruta (nuevo slug)
export async function copyImageToNewSlug(oldSlug: string, newSlug: string) {
  await checkUser();
  await r2.send(
    new CopyObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      CopySource: `${process.env.R2_BUCKET_NAME}/${oldSlug}`,
      Key: newSlug,
    })
  );

  return `${process.env.R2_BUCKET_PATH}/${newSlug}`;
}

// Borra la imagen antigua
export async function deleteImageBySlug(slug: string) {
  await checkUser();
  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: slug,
    })
  );
}

export async function createProduct({
  title,
  description,
  categoryId,
  type,
  price,
  imageUrl,
  fileUrl,
  slug,
  shortDescription,
}: Product) {
  try {
    await checkUser();
    await db
      .insert(productsTable)
      .values({
        title,
        description,
        categoryId,
        type,
        price,
        imageUrl,
        fileUrl,
        slug,
        shortDescription,
      })
      .returning();
    revalidatePath('/admin/products');
    revalidatePath('/');
    revalidatePath('/store');
    revalidatePath(`/product/${slug}`);
  } catch (error) {
    throw error;
  }
}

export async function updateProduct({
  id,
  title,
  description,
  categoryId,
  type,
  price,
  imageUrl,
  fileUrl,
  slug,
  shortDescription,
}: Product) {
  try {
    await checkUser();
    await db
      .update(productsTable)
      .set({
        title,
        description,
        categoryId,
        type,
        price,
        imageUrl,
        fileUrl,
        slug,
        shortDescription,
        updatedAt: new Date(),
      })
      .where(eq(productsTable.id, id!))
      .returning();
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${slug}`);
    revalidatePath(`/admin/products/edit/${slug}`);

    revalidatePath('/');
    revalidatePath('/store');
    revalidatePath(`/product/${slug}`);
  } catch (error) {
    throw error;
  }
}
