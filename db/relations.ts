import { relations } from 'drizzle-orm';
import { categories, products } from './schema';

export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));
