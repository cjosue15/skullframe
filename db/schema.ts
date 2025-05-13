import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  imageUrl: text('image_url').notNull(),
  categoryId: integer('category_id')
    .references(() => categories.id)
    .notNull(),
  type: text('type', { enum: ['physical', 'digital'] }).notNull(),
  fileUrl: text('file_url'),
});
