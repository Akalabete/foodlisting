import { NextResponse } from 'next/server';
import { getAllIngredients } from '../getAllIngredients';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ingredients = await getAllIngredients();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 });
  }
}