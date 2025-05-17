'use server';

import { Product } from '@/app/dtos/products.dtos';
import { r2 } from '@/app/lib/r2';
import { db } from '@/db/index';
import { productsTable } from '@/db/schema';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type SignedURLResponse = Promise<
  | { error: undefined; success: { signedUrl: string; url: string } }
  | { error: string; success?: undefined }
>;

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];

const maxFileSize = 1048576 * 10;

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  // checksum: string;
};

export const getSignedURL = async ({
  fileType,
  fileSize,
}: // checksum,
GetSignedURLParams): SignedURLResponse => {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return {
  //     error: 'No tienes permisos para realizar esta acción',
  //     success: undefined,
  //   };

  if (!allowedFileTypes.includes(fileType)) {
    return { error: 'File type not allowed' };
  }

  if (fileSize > maxFileSize) {
    return { error: 'File size too large' };
  }

  // const fileName = `${checksum}-${Date.now()}`;

  // TODO: change name of file

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: 'test',
    ContentType: fileType,
  });

  const signedUrl = await getSignedUrl(r2, putObjectCommand, {
    expiresIn: 60,
  });

  const url = `${process.env.R2_BUCKET_PATH}/test`;

  return {
    error: undefined,
    success: {
      signedUrl,
      url,
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
}: Product) {
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
    })
    .returning();

  revalidatePath('/admin/products');
  redirect('/admin/products');
}
