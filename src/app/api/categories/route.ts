import { categorySchema } from '@/app/dtos/categories.dtos';
import { db } from '@/db/index';
import { categoriesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await db.select().from(categoriesTable);
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body as { id: number };
    const data = await db
      .delete(categoriesTable)
      .where(eq(categoriesTable.id, id));

    return NextResponse.json({
      message: 'Category deleted successfully',
      data,
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { data, success } = categorySchema.safeParse(body);

    if (!success) {
      return new NextResponse('Invalid data', {
        status: 400,
      });
    }
    await db
      .update(categoriesTable)
      .set({ name: data.name })
      .where(eq(categoriesTable.id, data.id!));
    return NextResponse.json({
      message: 'Category updated successfully',
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = categorySchema.safeParse(body);

    if (!result.success) {
      return new NextResponse('Invalid data', {
        status: 400,
      });
    }
    const { name } = result.data;

    await db.insert(categoriesTable).values({ name });

    return NextResponse.json({
      message: 'Category created successfully',
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}
