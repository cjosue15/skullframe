'use server';

import { Product } from '@/app/dtos/products.dtos';
import { r2 } from '@/app/lib/r2';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/app/lib/utils';
import { db } from '@/db/index';
import { productsTable } from '@/db/schema';
import { PutObjectCommand } from '@aws-sdk/client-s3';
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
};

async function generateUniqueSlug(baseSlug: string) {
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
}: GetSignedURLParams): SignedURLResponse => {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return {
  //     error: 'No tienes permisos para realizar esta acción',
  //     success: undefined,
  //   };

  if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
    return { error: 'File type not allowed' };
  }

  if (fileSize > MAX_IMAGE_SIZE) {
    return { error: 'File size too large' };
  }

  const slug = await generateUniqueSlug(baseSlug);

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

export async function createProduct({
  title,
  description,
  categoryId,
  type,
  price,
  imageUrl,
  fileUrl,
  slug,
}: Product) {
  try {
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
      })
      .returning();
    revalidatePath('/admin/products');
  } catch (error) {
    throw error;
  }
}
