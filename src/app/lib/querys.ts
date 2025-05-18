import { db } from '@/db/index';
import { categoriesTable, productsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Category } from '../dtos/categories.dtos';
import { ProductWithCategory } from '../dtos/products.dtos';

export async function getCategories() {
  try {
    const data = (await db.select().from(categoriesTable)) as Category[];
    return data;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
}

export async function getProdcuts() {
  try {
    const data = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        description: productsTable.description,
        price: productsTable.price,
        imageUrl: productsTable.imageUrl,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        fileUrl: productsTable.fileUrl,
        slug: productsTable.slug,
        type: productsTable.type,
        updatedAt: productsTable.updatedAt,
      })
      .from(productsTable)
      .innerJoin(
        categoriesTable,
        eq(categoriesTable.id, productsTable.categoryId)
      );
    return data as ProductWithCategory[];
  } catch (error) {
    throw new Error('Error fetching products');
  }
}
