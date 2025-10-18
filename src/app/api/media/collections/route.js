import { NextResponse } from 'next/server';

// Mock collections data
const mockCollections = [
  { _id: "featured", name: "Featured Media" },
  { _id: "recent", name: "Recent Uploads" },
  { _id: "videos", name: "Video Collection" }
];

// GET /api/media/collections - List media collections
export async function GET(request) {
  try {
    return NextResponse.json({
      success: true,
      data: {
        items: mockCollections
      }
    });
  } catch (error) {
    console.error('Error fetching media collections:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch collections' } },
      { status: 500 }
    );
  }
}


