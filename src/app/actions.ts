'use server';

import { db } from '@/db/index';
import { categoriesTable, productsTable } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { Product, ProductWithCategory } from './dtos/products.dtos';

export async function getLastThreeProducts() {
  try {
    const products = (await db
      .select()
      .from(productsTable)
      .limit(3)
      .orderBy(desc(productsTable.createdAt))) as Product[];

    return products;
  } catch (error) {
    throw error;
  }
}

export const getProduct = async (slug: string) => {
  try {
    const product = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        shortDescription: productsTable.shortDescription,
        description: productsTable.description,
        price: productsTable.price,
        imageUrl: productsTable.imageUrl,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        fileUrl: productsTable.fileUrl,
        slug: productsTable.slug,
        type: productsTable.type,
        updatedAt: productsTable.updatedAt,
        createdAt: productsTable.createdAt,
      })
      .from(productsTable)
      .where(eq(productsTable.slug, slug))
      .innerJoin(
        categoriesTable,
        eq(categoriesTable.id, productsTable.categoryId)
      )
      .limit(1)
      .then((res) => res[0]);

    return product as ProductWithCategory;
  } catch (error) {
    throw error;
  }
};
