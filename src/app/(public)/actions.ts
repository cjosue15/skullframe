'use server';

import { db } from '@/db/index';
import { productsTable } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Product } from '../dtos/products.dtos';

export async function getLastThreeProducts() {
  try {
    const products = (await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.createdAt))
      .limit(3)) as Product[];

    return products;
  } catch (error) {
    throw error;
  }
}
