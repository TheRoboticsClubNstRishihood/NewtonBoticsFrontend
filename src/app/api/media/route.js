import { NextResponse } from 'next/server';

// Mock database for demonstration
let mockMediaDatabase = [
  {
    _id: "1",
    title: "Robotics Lab Setup",
    description: "Our state-of-the-art robotics laboratory with advanced equipment",
    fileType: "image",
    fileUrl: "/servilancerobot.jpeg",
    thumbnailUrl: "/servilancerobot.jpeg",
    categoryId: "lab",
    isFeatured: true,
    viewCount: 1250,
    createdAt: "2024-12-15T10:00:00Z",
    tags: ["lab", "equipment", "robotics"]
  },
  {
    _id: "2",
    title: "Humanoid Robot Healthcare Demo",
    description: "Demonstration of our humanoid robot for healthcare applications",
    fileType: "image",
    fileUrl: "/humanoidRobotHealthcare.webp",
    thumbnailUrl: "/humanoidRobotHealthcare.webp",
    categoryId: "projects",
    isFeatured: true,
    viewCount: 890,
    createdAt: "2024-12-10T14:30:00Z",
    tags: ["humanoid", "healthcare", "AI"]
  },
  {
    _id: "3",
    title: "Lab Background View",
    description: "Overview of our robotics lab workspace",
    fileType: "image",
    fileUrl: "/bgImageforroboticslab.jpg",
    thumbnailUrl: "/bgImageforroboticslab.jpg",
    categoryId: "lab",
    isFeatured: false,
    viewCount: 456,
    createdAt: "2024-12-08T09:15:00Z",
    tags: ["lab", "workspace"]
  },
  {
    _id: "4",
    title: "Robot Eye Blinking Demo",
    description: "Video demonstration of robot eye blinking mechanism",
    fileType: "video",
    fileUrl: "/Robot_Eye_Blinking_Survival_Video.mp4",
    thumbnailUrl: "/servilancerobot.jpeg",
    categoryId: "projects",
    isFeatured: true,
    viewCount: 2100,
    duration: 45,
    createdAt: "2024-12-05T16:45:00Z",
    tags: ["robot", "eyes", "animation"]
  },
  {
    _id: "5",
    title: "Authentication System Demo",
    description: "Video showing our authentication system in action",
    fileType: "video",
    fileUrl: "/authentication.mp4",
    thumbnailUrl: "/humanoidRobotHealthcare.webp",
    categoryId: "systems",
    isFeatured: false,
    viewCount: 320,
    duration: 120,
    createdAt: "2024-12-03T11:20:00Z",
    tags: ["authentication", "security"]
  },
  {
    _id: "6",
    title: "Password Reset Flow",
    description: "Demonstration of password reset functionality",
    fileType: "video",
    fileUrl: "/forgetPassword.mp4",
    thumbnailUrl: "/bgImageforroboticslab.jpg",
    categoryId: "systems",
    isFeatured: false,
    viewCount: 180,
    duration: 90,
    createdAt: "2024-12-01T13:10:00Z",
    tags: ["password", "reset", "security"]
  }
];

// Helper function to increment view count (non-blocking)
function incrementViewCount(mediaId) {
  try {
    const mediaIndex = mockMediaDatabase.findIndex(item => item._id === mediaId);
    if (mediaIndex !== -1) {
      mockMediaDatabase[mediaIndex].viewCount += 1;
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}

// GET /api/media - List all media files
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileType = searchParams.get('fileType');
    const categoryId = searchParams.get('categoryId');
    const q = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const skip = parseInt(searchParams.get('skip')) || 0;
    const isFeatured = searchParams.get('isFeatured') === 'true';

    let filteredMedia = [...mockMediaDatabase];

    // Apply filters
    if (fileType && fileType !== 'all') {
      filteredMedia = filteredMedia.filter(item => item.fileType === fileType);
    }

    if (categoryId && categoryId !== 'all') {
      filteredMedia = filteredMedia.filter(item => item.categoryId === categoryId);
    }

    if (isFeatured) {
      filteredMedia = filteredMedia.filter(item => item.isFeatured === true);
    }

    if (q) {
      const searchTerm = q.toLowerCase();
      filteredMedia = filteredMedia.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply pagination
    const total = filteredMedia.length;
    const paginatedData = filteredMedia.slice(skip, skip + limit);
    const hasMore = skip + limit < total;

    return NextResponse.json({
      success: true,
      data: {
        items: paginatedData,
        pagination: {
          total,
          limit,
          skip,
          hasMore
        }
      }
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch media' } },
      { status: 500 }
    );
  }
}
