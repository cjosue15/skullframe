DROP INDEX "products_slug_unique";--> statement-breakpoint
ALTER TABLE `products` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT '"2025-05-18T19:42:01.915Z"';--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
ALTER TABLE `products` ADD `created_at` integer DEFAULT '"2025-05-18T19:42:01.915Z"' NOT NULL;