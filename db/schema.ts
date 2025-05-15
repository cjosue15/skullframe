import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const categoriesTable = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

export const productsTable = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  imageUrl: text('image_url').notNull(),
  categoryId: integer('category_id')
    .references(() => categoriesTable.id)
    .notNull(),
  type: text('type', { enum: ['physical', 'digital'] }).notNull(),
  fileUrl: text('file_url'),
});
