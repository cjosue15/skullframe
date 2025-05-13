import { relations } from 'drizzle-orm';
import { categoriesTable, productsTable } from './schema';

export const categoryRelations = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable),
}));

export const productRelations = relations(productsTable, ({ one }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),
}));
