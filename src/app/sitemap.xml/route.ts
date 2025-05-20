import { db } from '@/db/index';
import { productsTable } from '@/db/schema';
import { NextResponse } from 'next/server';

type SitemapProduct = {
  slug: string;
  updatedAt: Date;
};

// Simula tu base de datos
async function getAllProducts(): Promise<SitemapProduct[]> {
  const products = await db
    .select({
      slug: productsTable.slug,
      updatedAt: productsTable.updatedAt,
    })
    .from(productsTable);
  return products as SitemapProduct[];
}

export async function GET() {
  const baseUrl = 'https://skullframe.com';

  const staticRoutes = [
    { url: '', priority: 1.0 },
    { url: 'store', priority: 0.8 },
  ];

  const products = await getAllProducts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticRoutes
      .map(
        ({ url, priority }) => `
      <url>
        <loc>${baseUrl}/${url}</loc>
        <priority>${priority}</priority>
      </url>`
      )
      .join('')}
    ${products
      .map(
        (product) => `
      <url>
        <loc>${baseUrl}/product/${product.slug}</loc>
        <lastmod>${product.updatedAt.toISOString()}</lastmod>
        <priority>0.7</priority>
      </url>`
      )
      .join('')}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
