DROP INDEX "products_slug_unique";--> statement-breakpoint
ALTER TABLE `products` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (unixepoch());--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
ALTER TABLE `products` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (unixepoch());