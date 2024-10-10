import { NextResponse } from 'next/server';
import { getAllRecipes } from '../getAllRecipes';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const recipes = await getAllRecipes();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}