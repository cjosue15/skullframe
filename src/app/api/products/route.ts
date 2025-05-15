import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, image } = body;
  } catch (error) {
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}
