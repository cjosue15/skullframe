import { db } from '@/db/index';
import { categoriesTable } from '@/db/schema';
import { Category } from '../dtos/categories.dtos';

export async function getCategories() {
  try {
    const data = (await db.select().from(categoriesTable)) as Category[];
    return data;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
}
