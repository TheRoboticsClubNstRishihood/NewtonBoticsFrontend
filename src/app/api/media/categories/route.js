import { NextResponse } from 'next/server';

// Mock categories data
const mockCategories = [
  { _id: "lab", name: "Laboratory" },
  { _id: "projects", name: "Projects" },
  { _id: "systems", name: "Systems" },
  { _id: "events", name: "Events" }
];

// GET /api/media/categories - List media categories
export async function GET(request) {
  try {
    return NextResponse.json({
      success: true,
      data: {
        items: mockCategories
      }
    });
  } catch (error) {
    console.error('Error fetching media categories:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch categories' } },
      { status: 500 }
    );
  }
}


