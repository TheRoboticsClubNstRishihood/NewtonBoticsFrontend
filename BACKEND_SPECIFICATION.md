# NewtonBotics Backend Specification

## 🚀 Project Overview

This document outlines the complete backend architecture and API specifications for the **NewtonBotics Robotics Club Management System**. The backend will serve as the foundation for the frontend application, providing secure, scalable, and efficient APIs for all club operations.

## 🏗️ Architecture Overview

### **Technology Stack**
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB 7.0+
- **ODM**: Mongoose.js for MongoDB object modeling
- **Authentication**: JWT / OAuth 2.0 / Session-based

### **Architecture Pattern**
- **RESTful API** with GraphQL support
- **Microservices** architecture for scalability
- **Layered Architecture** (Controller → Service → Repository → Database)
- **Event-Driven** for real-time updates
- **CQRS** (Command Query Responsibility Segregation) for complex operations

## 📊 MongoDB Collections & Document Design

### **1. Users & Authentication**

```javascript
// Users Collection
{
  _id: ObjectId,
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true, maxlength: 100 },
  lastName: { type: String, required: true, maxlength: 100 },
  role: { 
    type: String, 
    required: true, 
    enum: ['student', 'team_member', 'mentor', 'researcher', 'community', 'admin'],
    index: true
  },
  studentId: { type: String, maxlength: 50 },
  department: { type: String, maxlength: 100, index: true },
  yearOfStudy: { type: Number, min: 1, max: 8 },
  phone: { type: String, maxlength: 20 },
  profileImageUrl: { type: String, maxlength: 500 },
  bio: { type: String, maxlength: 1000 },
  skills: [{ type: String, maxlength: 100 }],
  isActive: { type: Boolean, default: true, index: true },
  emailVerified: { type: Boolean, default: false },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}

// User Sessions Collection (for JWT management)
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true, index: true },
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: true },
  createdAt: { type: Date, default: Date.now }
}

// Password Reset Tokens Collection
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true, index: true },
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: true },
  createdAt: { type: Date, default: Date.now }
}
```

### **2. Projects Management**

```javascript
// Projects Collection
{
  _id: ObjectId,
  title: { type: String, required: true, maxlength: 255, index: true },
  description: { type: String, required: true, maxlength: 5000 },
  category: { type: String, maxlength: 100, index: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['upcoming', 'ongoing', 'completed', 'on_hold'],
    index: true
  },
  startDate: { type: Date, index: true },
  endDate: { type: Date, index: true },
  budget: { type: Number, min: 0 },
  mentorId: { type: ObjectId, ref: 'User', index: true },
  teamLeaderId: { type: ObjectId, ref: 'User', index: true },
  imageUrl: { type: String, maxlength: 500 },
  videoUrl: { type: String, maxlength: 500 },
  githubUrl: { type: String, maxlength: 500 },
  documentationUrl: { type: String, maxlength: 500 },
  achievements: [{ type: String, maxlength: 500 }],
  teamMembers: [{
    userId: { type: ObjectId, ref: 'User', required: true },
    role: { type: String, required: true, maxlength: 100 },
    joinedAt: { type: Date, default: Date.now }
  }],
  milestones: [{
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String, maxlength: 1000 },
    dueDate: { type: Date },
    completedAt: { type: Date },
    status: { 
      type: String, 
      enum: ['pending', 'in_progress', 'completed', 'overdue'],
      default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}
```

### **3. Workshops & Events**

```javascript
// Workshops Collection
{
  _id: ObjectId,
  title: { type: String, required: true, maxlength: 255, index: true },
  description: { type: String, required: true, maxlength: 5000 },
  instructorId: { type: ObjectId, ref: 'User', required: true, index: true },
  category: { type: String, maxlength: 100, index: true },
  level: { 
    type: String, 
    required: true, 
    enum: ['beginner', 'intermediate', 'advanced'],
    index: true
  },
  maxParticipants: { type: Number, min: 1, required: true },
  currentParticipants: { type: Number, default: 0, min: 0 },
  startDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true, index: true },
  location: { type: String, maxlength: 255 },
  onlineUrl: { type: String, maxlength: 500 },
  materialsUrl: { type: String, maxlength: 500 },
  videoRecordingUrl: { type: String, maxlength: 500 },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
    index: true
  },
  credits: { type: Number, default: 0, min: 0 },
  registrations: [{
    userId: { type: ObjectId, ref: 'User', required: true },
    registrationDate: { type: Date, default: Date.now },
    attendanceStatus: { 
      type: String, 
      enum: ['registered', 'attended', 'absent', 'cancelled'],
      default: 'registered'
    },
    feedbackRating: { type: Number, min: 1, max: 5 },
    feedbackComment: { type: String, maxlength: 1000 }
  }],
  createdAt: { type: Date, default: Date.now, index: true }
}

// Events Collection
{
  _id: ObjectId,
  title: { type: String, required: true, maxlength: 255, index: true },
  description: { type: String, required: true, maxlength: 5000 },
  category: { type: String, maxlength: 100, index: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['workshop', 'seminar', 'exhibition', 'training', 'networking', 'competition', 'technical', 'educational', 'showcase'],
    index: true
  },
  startDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true, index: true },
  location: { type: String, maxlength: 255 },
  maxCapacity: { type: Number, min: 1 },
  currentRegistrations: { type: Number, default: 0, min: 0 },
  registrationDeadline: { type: Date, index: true },
  isFeatured: { type: Boolean, default: false, index: true },
  imageUrl: { type: String, maxlength: 500 },
  organizerId: { type: ObjectId, ref: 'User', index: true },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
    index: true
  },
  registrations: [{
    userId: { type: ObjectId, ref: 'User', required: true },
    registrationDate: { type: Date, default: Date.now },
    attendanceStatus: { 
      type: String, 
      enum: ['registered', 'attended', 'absent', 'cancelled'],
      default: 'registered'
    }
  }],
  createdAt: { type: Date, default: Date.now, index: true }
}
```

### **4. Inventory Management**

```javascript
// Equipment Categories Collection
{
  _id: ObjectId,
  name: { type: String, required: true, maxlength: 100, index: true },
  description: { type: String, maxlength: 1000 },
  parentCategoryId: { type: ObjectId, ref: 'EquipmentCategory', index: true },
  createdAt: { type: Date, default: Date.now }
}

// Equipment Collection
{
  _id: ObjectId,
  name: { type: String, required: true, maxlength: 255, index: true },
  description: { type: String, maxlength: 2000 },
  categoryId: { type: ObjectId, ref: 'EquipmentCategory', required: true, index: true },
  modelNumber: { type: String, maxlength: 100 },
  serialNumber: { type: String, maxlength: 100, unique: true, sparse: true },
  manufacturer: { type: String, maxlength: 100, index: true },
  purchaseDate: { type: Date },
  purchasePrice: { type: Number, min: 0 },
  currentQuantity: { type: Number, required: true, default: 0, min: 0 },
  minQuantity: { type: Number, default: 0, min: 0 },
  maxQuantity: { type: Number, min: 0 },
  location: { type: String, maxlength: 255, index: true },
  status: { 
    type: String, 
    enum: ['available', 'low_stock', 'out_of_stock', 'maintenance', 'retired'],
    default: 'available',
    index: true
  },
  imageUrl: { type: String, maxlength: 500 },
  specifications: { type: Object }, // MongoDB Object for flexible specs
  maintenanceSchedule: { type: String, maxlength: 1000 },
  lastMaintenanceDate: { type: Date },
  nextMaintenanceDate: { type: Date, index: true },
  checkouts: [{
    userId: { type: ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true, min: 1 },
    checkoutDate: { type: Date, default: Date.now },
    expectedReturnDate: { type: Date, required: true },
    actualReturnDate: { type: Date },
    checkoutNotes: { type: String, maxlength: 1000 },
    returnNotes: { type: String, maxlength: 1000 },
    status: { 
      type: String, 
      enum: ['checked_out', 'returned', 'overdue', 'lost'],
      default: 'checked_out'
    }
  }],
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}
```

### **5. Project Requests & Approvals**

```javascript
// Project Requests Collection
{
  _id: ObjectId,
  title: { type: String, required: true, maxlength: 255, index: true },
  description: { type: String, required: true, maxlength: 5000 },
  objectives: [{ type: String, maxlength: 500 }],
  expectedOutcomes: [{ type: String, maxlength: 500 }],
  teamSize: { type: Number, required: true, min: 1, max: 20 },
  estimatedDurationMonths: { type: Number, required: true, min: 1, max: 24 },
  budgetEstimate: { type: Number, min: 0 },
  requiredResources: [{ type: String, maxlength: 200 }],
  mentorId: { type: ObjectId, ref: 'User', index: true },
  status: { 
    type: String, 
    enum: ['pending', 'under_review', 'approved', 'rejected', 'on_hold'],
    default: 'pending',
    index: true
  },
  submittedBy: { type: ObjectId, ref: 'User', required: true, index: true },
  submittedAt: { type: Date, default: Date.now, index: true },
  reviewedAt: { type: Date },
  reviewedBy: { type: ObjectId, ref: 'User', index: true },
  reviewNotes: { type: String, maxlength: 2000 },
  approvalDate: { type: Date },
  startDate: { type: Date },
  endDate: { type: Date },
  teamMembers: [{
    userId: { type: ObjectId, ref: 'User', required: true },
    proposedRole: { type: String, required: true, maxlength: 100 },
    skills: [{ type: String, maxlength: 100 }],
    availabilityHoursPerWeek: { type: Number, min: 1, max: 40 }
  }],
  resources: [{
    resourceType: { 
      type: String, 
      enum: ['equipment', 'software', 'funding', 'space', 'other'],
      required: true
    },
    description: { type: String, required: true, maxlength: 500 },
    estimatedCost: { type: Number, min: 0 },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    }
  }]
}
```

### **6. News & Updates**

```javascript
// News Categories Collection
{
  _id: ObjectId,
  name: { type: String, required: true, maxlength: 100, index: true },
  description: { type: String, maxlength: 1000 },
  color: { type: String, maxlength: 7, pattern: /^#[0-9A-F]{6}$/i },
  createdAt: { type: Date, default: Date.now }
}

// News Collection
{
  _id: ObjectId,
  title: { type: String, required: true, maxlength: 255, index: true },
  content: { type: String, required: true, maxlength: 10000 },
  excerpt: { type: String, maxlength: 500 },
  categoryId: { type: ObjectId, ref: 'NewsCategory', index: true },
  authorId: { type: ObjectId, ref: 'User', required: true, index: true },
  featuredImageUrl: { type: String, maxlength: 500 },
  tags: [{ type: String, maxlength: 100, index: true }],
  isFeatured: { type: Boolean, default: false, index: true },
  isPublished: { type: Boolean, default: false, index: true },
  publishedAt: { type: Date, index: true },
  viewCount: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}

// Newsletter Subscriptions Collection
{
  _id: ObjectId,
  email: { type: String, required: true, unique: true, index: true },
  firstName: { type: String, maxlength: 100 },
  lastName: { type: String, maxlength: 100 },
  isActive: { type: Boolean, default: true, index: true },
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: { type: Date }
}
```

### **7. Gallery & Media**

```javascript
// Media Categories Collection
{
  _id: ObjectId,
  name: { type: String, required: true, maxlength: 100, index: true },
  description: { type: String, maxlength: 1000 },
  parentCategoryId: { type: ObjectId, ref: 'MediaCategory', index: true },
  createdAt: { type: Date, default: Date.now }
}

// Media Collection
{
  _id: ObjectId,
  title: { type: String, required: true, maxlength: 255, index: true },
  description: { type: String, maxlength: 2000 },
  fileUrl: { type: String, required: true, maxlength: 500 },
  thumbnailUrl: { type: String, maxlength: 500 },
  fileType: { 
    type: String, 
    required: true, 
    enum: ['image', 'video', 'document', 'audio'],
    index: true
  },
  fileSize: { type: Number, min: 0 },
  dimensions: { type: String, maxlength: 50 }, // For images/videos: "1920x1080"
  duration: { type: Number, min: 0 }, // For videos/audio in seconds
  categoryId: { type: ObjectId, ref: 'MediaCategory', index: true },
  uploadedBy: { type: ObjectId, ref: 'User', required: true, index: true },
  tags: [{ type: String, maxlength: 100, index: true }],
  isFeatured: { type: Boolean, default: false, index: true },
  viewCount: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now, index: true }
}

// Media Collections Collection (for galleries)
{
  _id: ObjectId,
  name: { type: String, required: true, maxlength: 255, index: true },
  description: { type: String, maxlength: 2000 },
  coverMediaId: { type: ObjectId, ref: 'Media' },
  isPublic: { type: Boolean, default: true, index: true },
  createdBy: { type: ObjectId, ref: 'User', required: true, index: true },
  mediaItems: [{
    mediaId: { type: ObjectId, ref: 'Media', required: true },
    position: { type: Number, min: 0 },
    addedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now, index: true }
}
```

### **8. Contact & Communication**

```sql
// Contact Submissions Collection
{
  _id: ObjectId,
  name: { type: String, required: true, maxlength: 255 },
  email: { type: String, required: true, maxlength: 255, index: true },
  subject: { type: String, required: true, maxlength: 255, index: true },
  message: { type: String, required: true, maxlength: 5000 },
  phone: { type: String, maxlength: 20 },
  department: { type: String, maxlength: 100, index: true },
  status: { 
    type: String, 
    enum: ['new', 'in_progress', 'resolved', 'closed'],
    default: 'new',
    index: true
  },
  assignedTo: { type: ObjectId, ref: 'User', index: true },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    index: true
  },
  response: { type: String, maxlength: 5000 },
  respondedAt: { type: Date },
  respondedBy: { type: ObjectId, ref: 'User', index: true },
  createdAt: { type: Date, default: Date.now, index: true }
}

// Internal Messages Collection
{
  _id: ObjectId,
  senderId: { type: ObjectId, ref: 'User', required: true, index: true },
  recipientId: { type: ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, required: true, maxlength: 255, index: true },
  message: { type: String, required: true, maxlength: 10000 },
  isRead: { type: Boolean, default: false, index: true },
  readAt: { type: Date },
  isArchived: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: Date.now, index: true }
}
```

## 📊 MongoDB Data Modeling Best Practices

### **Embedded vs Referenced Documents**
```javascript
// Embedded approach for frequently accessed data
// Example: Project with embedded team members and milestones
{
  _id: ObjectId,
  title: "Robotic Arm Project",
  teamMembers: [
    {
      userId: ObjectId("..."),
      role: "Team Leader",
      joinedAt: Date,
      // Embedded user info for quick access
      userInfo: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        profileImageUrl: "..."
      }
    }
  ],
  milestones: [
    {
      title: "Design Phase",
      status: "completed",
      completedAt: Date
    }
  ]
}

// Referenced approach for large datasets
// Example: User references in projects
{
  _id: ObjectId,
  title: "AI Robot Project",
  mentorId: ObjectId("..."), // Reference to User collection
  teamLeaderId: ObjectId("..."), // Reference to User collection
  // Use populate() to get full user details when needed
}
```

### **Aggregation Pipeline Examples**
```javascript
// Get projects with populated user information
db.projects.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "mentorId",
      foreignField: "_id",
      as: "mentor"
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "teamMembers.userId",
      foreignField: "_id",
      as: "teamMemberDetails"
    }
  },
  {
    $project: {
      title: 1,
      status: 1,
      mentor: { $arrayElemAt: ["$mentor", 0] },
      teamMembers: 1,
      teamMemberDetails: 1
    }
  }
]);

// Get workshop statistics by category
db.workshops.aggregate([
  {
    $group: {
      _id: "$category",
      totalWorkshops: { $sum: 1 },
      totalParticipants: { $sum: "$currentParticipants" },
      averageRating: { $avg: "$registrations.feedbackRating" }
    }
  },
  {
    $sort: { totalWorkshops: -1 }
  }
]);

// Get equipment checkout history
db.equipment.aggregate([
  {
    $unwind: "$checkouts"
  },
  {
    $lookup: {
      from: "users",
      localField: "checkouts.userId",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $project: {
      equipmentName: "$name",
      userName: { $arrayElemAt: ["$user.firstName", 0] },
      checkoutDate: "$checkouts.checkoutDate",
      returnDate: "$checkouts.actualReturnDate",
      status: "$checkouts.status"
    }
  }
]);
```

## 🔐 Authentication & Authorization

### **JWT Token Structure**
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "email": "user@example.com",
    "role": "team_member",
    "permissions": ["read:projects", "write:inventory", "approve:requests"],
    "iat": 1640995200,
    "exp": 1641081600
  }
}
```

### **Role-Based Permissions Matrix**

| Permission | Student | Team Member | Mentor | Researcher | Admin |
|------------|---------|-------------|---------|------------|-------|
| `read:projects` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `write:projects` | ❌ | ✅ | ✅ | ✅ | ✅ |
| `delete:projects` | ❌ | ❌ | ✅ | ✅ | ✅ |
| `read:inventory` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `write:inventory` | ❌ | ✅ | ✅ | ✅ | ✅ |
| `approve:requests` | ❌ | ❌ | ✅ | ✅ | ✅ |
| `manage:users` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `system:admin` | ❌ | ❌ | ❌ | ❌ | ✅ |

### **API Endpoint Security**
- **Public Endpoints**: `/api/public/*`, `/api/auth/*`
- **Protected Endpoints**: `/api/protected/*` (requires valid JWT)
- **Role-Specific Endpoints**: `/api/admin/*`, `/api/mentor/*`, `/api/team/*`

## 🌐 API Endpoints Specification

### **1. Authentication Endpoints**

```typescript
// POST /api/auth/register
interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  yearOfStudy?: number;
  phone?: string;
}

// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

// POST /api/auth/refresh
interface RefreshRequest {
  refreshToken: string;
}

// POST /api/auth/logout
interface LogoutRequest {
  refreshToken: string;
}

// POST /api/auth/forgot-password
interface ForgotPasswordRequest {
  email: string;
}

// POST /api/auth/reset-password
interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
```

### **2. User Management Endpoints**

```typescript
// GET /api/users/profile
// GET /api/users/:id
// PUT /api/users/profile
// PUT /api/users/:id (admin only)
// DELETE /api/users/:id (admin only)
// GET /api/users/search?q=query&role=role&department=dept
// POST /api/users/bulk-import (admin only)

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  yearOfStudy?: number;
  phone?: string;
  profileImageUrl?: string;
  bio?: string;
  skills?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### **3. Projects Endpoints**

```typescript
// GET /api/projects
// GET /api/projects/:id
// POST /api/projects
// PUT /api/projects/:id
// DELETE /api/projects/:id
// GET /api/projects/:id/members
// POST /api/projects/:id/members
// DELETE /api/projects/:id/members/:memberId
// GET /api/projects/:id/milestones
// POST /api/projects/:id/milestones
// PUT /api/projects/:id/milestones/:milestoneId

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  budget?: number;
  mentorId?: string;
  teamLeaderId?: string;
  imageUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  achievements?: string[];
  createdAt: string;
  updatedAt: string;
}
```

### **4. Workshops & Events Endpoints**

```typescript
// GET /api/workshops
// GET /api/workshops/:id
// POST /api/workshops
// PUT /api/workshops/:id
// DELETE /api/workshops/:id
// POST /api/workshops/:id/register
// DELETE /api/workshops/:id/register
// GET /api/workshops/:id/participants
// GET /api/events
// GET /api/events/:id
// POST /api/events
// PUT /api/events/:id
// DELETE /api/events/:id
// POST /api/events/:id/register
// DELETE /api/events/:id/register

interface Workshop {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  category: string;
  level: WorkshopLevel;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  endDate: string;
  location?: string;
  onlineUrl?: string;
  materialsUrl?: string;
  videoRecordingUrl?: string;
  status: WorkshopStatus;
  credits: number;
  createdAt: string;
}
```

### **5. Inventory Endpoints**

```typescript
// GET /api/inventory/equipment
// GET /api/inventory/equipment/:id
// POST /api/inventory/equipment
// PUT /api/inventory/equipment/:id
// DELETE /api/inventory/equipment/:id
// GET /api/inventory/categories
// POST /api/inventory/categories
// PUT /api/inventory/categories/:id
// DELETE /api/inventory/categories/:id
// POST /api/inventory/equipment/:id/checkout
// PUT /api/inventory/equipment/:id/return
// GET /api/inventory/checkouts
// GET /api/inventory/checkouts/:id

interface Equipment {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  modelNumber?: string;
  serialNumber?: string;
  manufacturer?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currentQuantity: number;
  minQuantity: number;
  maxQuantity?: number;
  location?: string;
  status: EquipmentStatus;
  imageUrl?: string;
  specifications?: Record<string, any>;
  maintenanceSchedule?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

### **6. Project Requests Endpoints**

```typescript
// GET /api/project-requests
// GET /api/project-requests/:id
// POST /api/project-requests
// PUT /api/project-requests/:id
// DELETE /api/project-requests/:id
// POST /api/project-requests/:id/approve
// POST /api/project-requests/:id/reject
// GET /api/project-requests/:id/members
// POST /api/project-requests/:id/members
// DELETE /api/project-requests/:id/members/:memberId
// GET /api/project-requests/:id/resources
// POST /api/project-requests/:id/resources

interface ProjectRequest {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  expectedOutcomes: string[];
  teamSize: number;
  estimatedDurationMonths: number;
  budgetEstimate?: number;
  requiredResources: string[];
  mentorId?: string;
  status: RequestStatus;
  submittedBy: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  approvalDate?: string;
  startDate?: string;
  endDate?: string;
}
```

### **7. News & Updates Endpoints**

```typescript
// GET /api/news
// GET /api/news/:id
// POST /api/news
// PUT /api/news/:id
// DELETE /api/news/:id
// GET /api/news/categories
// POST /api/news/categories
// PUT /api/news/categories/:id
// DELETE /api/news/categories/:id
// POST /api/newsletter/subscribe
// DELETE /api/newsletter/unsubscribe
// POST /api/newsletter/send

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  categoryId: string;
  authorId: string;
  featuredImageUrl?: string;
  tags?: string[];
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### **8. Gallery & Media Endpoints**

```typescript
// GET /api/media
// GET /api/media/:id
// POST /api/media
// PUT /api/media/:id
// DELETE /api/media/:id
// GET /api/media/categories
// POST /api/media/categories
// PUT /api/media/categories/:id
// DELETE /api/media/categories/:id
// GET /api/media/collections
// GET /api/media/collections/:id
// POST /api/media/collections
// PUT /api/media/collections/:id
// DELETE /api/media/collections/:id
// POST /api/media/upload
// GET /api/media/search?q=query&category=cat&type=type

interface Media {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: MediaType;
  fileSize: number;
  dimensions?: string;
  duration?: number;
  categoryId?: string;
  uploadedBy: string;
  tags?: string[];
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
}
```

### **9. Contact & Communication Endpoints**

```typescript
// POST /api/contact/submit
// GET /api/contact/submissions
// GET /api/contact/submissions/:id
// PUT /api/contact/submissions/:id
// DELETE /api/contact/submissions/:id
// POST /api/messages/send
// GET /api/messages/inbox
// GET /api/messages/sent
// GET /api/messages/:id
// PUT /api/messages/:id/read
// DELETE /api/messages/:id

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  department?: string;
  status: SubmissionStatus;
  assignedTo?: string;
  priority: Priority;
  response?: string;
  respondedAt?: string;
  respondedBy?: string;
  createdAt: string;
}
```

## 🔄 Real-time Features

### **WebSocket Events**
```typescript
// Server emits
interface ServerEvents {
  'user:joined': (userId: string) => void;
  'user:left': (userId: string) => void;
  'project:updated': (project: Project) => void;
  'workshop:registration': (workshopId: string, userId: string) => void;
  'inventory:low_stock': (equipment: Equipment) => void;
  'request:status_changed': (requestId: string, status: RequestStatus) => void;
  'news:published': (article: NewsArticle) => void;
  'notification:new': (notification: Notification) => void;
}

// Client emits
interface ClientEvents {
  'user:join': (userId: string) => void;
  'user:leave': (userId: string) => void;
  'project:subscribe': (projectId: string) => void;
  'project:unsubscribe': (projectId: string) => void;
  'workshop:subscribe': (workshopId: string) => void;
  'inventory:subscribe': () => void;
}
```

### **Server-Sent Events (SSE)**
```typescript
// GET /api/events/stream
// Real-time updates for:
// - Project progress
// - Workshop registrations
// - Inventory changes
// - System notifications
```

## 📊 Data Validation & Business Rules

### **Input Validation Rules**
```typescript
// User registration
const userValidation = {
  email: {
    required: true,
    type: 'email',
    maxLength: 255,
    unique: true
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  },
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  role: {
    required: true,
    enum: ['student', 'team_member', 'mentor', 'researcher', 'community', 'admin']
  }
};

// Project creation
const projectValidation = {
  title: {
    required: true,
    minLength: 5,
    maxLength: 255
  },
  description: {
    required: true,
    minLength: 20,
    maxLength: 5000
  },
  budget: {
    type: 'number',
    min: 0,
    max: 1000000
  },
  startDate: {
    type: 'date',
    min: new Date(),
    required: true
  }
};
```

### **Business Logic Rules**
```typescript
// Workshop registration
const workshopRules = {
  maxParticipants: (workshop: Workshop) => {
    return workshop.currentParticipants < workshop.maxParticipants;
  },
  registrationDeadline: (workshop: Workshop) => {
    return new Date() < new Date(workshop.startDate);
  },
  userEligibility: (user: User, workshop: Workshop) => {
    return user.role !== 'guest' && user.isActive;
  }
};

// Project approval
const projectApprovalRules = {
  mentorRequired: (request: ProjectRequest) => {
    return request.mentorId !== null;
  },
  budgetLimit: (request: ProjectRequest) => {
    return request.budgetEstimate <= 50000; // $50k limit
  },
  teamSize: (request: ProjectRequest) => {
    return request.teamSize >= 2 && request.teamSize <= 10;
  }
};
```

## 🚀 Performance & Scalability

### **Caching Strategy**
```typescript
// Redis cache keys
const cacheKeys = {
  userProfile: (userId: string) => `user:${userId}:profile`,
  projectList: (filters: string) => `projects:list:${filters}`,
  workshopList: (status: string) => `workshops:${status}:list`,
  inventoryCount: () => 'inventory:total:count',
  newsFeatured: () => 'news:featured:list',
  mediaGallery: (category: string) => `media:gallery:${category}`
};

// Cache TTL (Time To Live)
const cacheTTL = {
  userProfile: 3600, // 1 hour
  projectList: 1800, // 30 minutes
  workshopList: 900, // 15 minutes
  inventoryCount: 300, // 5 minutes
  newsFeatured: 7200, // 2 hours
  mediaGallery: 3600 // 1 hour
};
```

### **MongoDB Indexes & Optimization**
```javascript
// Single field indexes for performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "department": 1 });
db.users.createIndex({ "isActive": 1 });
db.users.createIndex({ "createdAt": 1 });

db.projects.createIndex({ "status": 1 });
db.projects.createIndex({ "category": 1 });
db.projects.createIndex({ "startDate": 1 });
db.projects.createIndex({ "mentorId": 1 });
db.projects.createIndex({ "teamLeaderId": 1 });
db.projects.createIndex({ "createdAt": 1 });

db.workshops.createIndex({ "status": 1 });
db.workshops.createIndex({ "startDate": 1 });
db.workshops.createIndex({ "instructorId": 1 });
db.workshops.createIndex({ "category": 1 });
db.workshops.createIndex({ "level": 1 });

db.events.createIndex({ "startDate": 1 });
db.events.createIndex({ "type": 1 });
db.events.createIndex({ "status": 1 });
db.events.createIndex({ "isFeatured": 1 });
db.events.createIndex({ "organizerId": 1 });

db.equipment.createIndex({ "categoryId": 1 });
db.equipment.createIndex({ "status": 1 });
db.equipment.createIndex({ "location": 1 });
db.equipment.createIndex({ "manufacturer": 1 });
db.equipment.createIndex({ "nextMaintenanceDate": 1 });

db.projectRequests.createIndex({ "status": 1 });
db.projectRequests.createIndex({ "submittedBy": 1 });
db.projectRequests.createIndex({ "mentorId": 1 });
db.projectRequests.createIndex({ "submittedAt": 1 });

db.news.createIndex({ "categoryId": 1 });
db.news.createIndex({ "isPublished": 1 });
db.news.createIndex({ "isFeatured": 1 });
db.news.createIndex({ "publishedAt": 1 });
db.news.createIndex({ "tags": 1 });

db.media.createIndex({ "fileType": 1 });
db.media.createIndex({ "categoryId": 1 });
db.media.createIndex({ "uploadedBy": 1 });
db.media.createIndex({ "isFeatured": 1 });
db.media.createIndex({ "tags": 1 });

// Compound indexes for complex queries
db.projects.createIndex({ "status": 1, "category": 1 });
db.workshops.createIndex({ "status": 1, "startDate": 1 });
db.events.createIndex({ "type": 1, "startDate": 1 });
db.equipment.createIndex({ "categoryId": 1, "status": 1 });
db.news.createIndex({ "isPublished": 1, "publishedAt": 1 });

// Text indexes for search functionality
db.users.createIndex({ "firstName": "text", "lastName": "text", "skills": "text" });
db.projects.createIndex({ "title": "text", "description": "text" });
db.workshops.createIndex({ "title": "text", "description": "text" });
db.news.createIndex({ "title": "text", "content": "text", "tags": "text" });
db.media.createIndex({ "title": "text", "description": "text", "tags": "text" });

// TTL indexes for automatic cleanup
db.userSessions.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
db.passwordResetTokens.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
```

### **API Rate Limiting**
```typescript
// Rate limiting configuration
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: {
    public: 100, // 100 requests per window
    authenticated: 1000, // 1000 requests per window
    admin: 5000 // 5000 requests per window
  },
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
};

// Specific endpoint limits
const endpointLimits = {
  '/api/auth/login': { max: 5, windowMs: 15 * 60 * 1000 }, // 5 login attempts per 15 min
  '/api/auth/register': { max: 3, windowMs: 60 * 60 * 1000 }, // 3 registrations per hour
  '/api/contact/submit': { max: 10, windowMs: 60 * 60 * 1000 }, // 10 contact forms per hour
  '/api/media/upload': { max: 50, windowMs: 60 * 60 * 1000 } // 50 uploads per hour
};
```

## 🔒 Security Measures

### **Input Sanitization**
```typescript
// XSS Prevention
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// SQL Injection Prevention
const validateSQLInput = (input: string): boolean => {
  const sqlKeywords = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i;
  return !sqlKeywords.test(input);
};
```

### **File Upload Security**
```typescript
// Allowed file types
const allowedFileTypes = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/webm', 'video/ogg'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg']
};

// File size limits
const fileSizeLimits = {
  image: 5 * 1024 * 1024, // 5MB
  video: 100 * 1024 * 1024, // 100MB
  document: 10 * 1024 * 1024, // 10MB
  audio: 20 * 1024 * 1024 // 20MB
};

// File validation
const validateFile = (file: File): boolean => {
  const fileType = file.type;
  const fileSize = file.size;
  
  // Check file type
  const allowedTypes = Object.values(allowedFileTypes).flat();
  if (!allowedTypes.includes(fileType)) {
    return false;
  }
  
  // Check file size
  const category = Object.keys(allowedFileTypes).find(key => 
    allowedFileTypes[key].includes(fileType)
  );
  if (category && fileSize > fileSizeLimits[category]) {
    return false;
  }
  
  return true;
};
```

## 🧪 Testing Strategy

### **Unit Testing**
```typescript
// Example test structure
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student'
      };
      
      const result = await userService.createUser(userData);
      
      expect(result).toBeDefined();
      expect(result.email).toBe(userData.email);
      expect(result.role).toBe(userData.role);
    });
    
    it('should throw error for duplicate email', async () => {
      // Test duplicate email handling
    });
    
    it('should validate password strength', async () => {
      // Test password validation
    });
  });
});
```

### **Integration Testing**
```typescript
// API endpoint testing
describe('Projects API', () => {
  describe('GET /api/projects', () => {
    it('should return list of projects', async () => {
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${validToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
    
    it('should filter projects by status', async () => {
      const response = await request(app)
        .get('/api/projects?status=ongoing')
        .set('Authorization', `Bearer ${validToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.data.every(p => p.status === 'ongoing')).toBe(true);
    });
  });
});
```

### **Performance Testing**
```typescript
// Load testing scenarios
const loadTestScenarios = {
  userRegistration: {
    users: 100,
    rampUp: '30s',
    duration: '5m',
    target: '100 rps'
  },
  projectListing: {
    users: 50,
    rampUp: '20s',
    duration: '3m',
    target: '200 rps'
  },
  fileUpload: {
    users: 20,
    rampUp: '15s',
    duration: '2m',
    target: '50 rps'
  }
};
```

## 📈 Monitoring & Logging

### **Application Metrics**
```typescript
// Key performance indicators
const kpis = {
  responseTime: {
    p50: '< 200ms',
    p95: '< 500ms',
    p99: '< 1000ms'
  },
  throughput: {
    requestsPerSecond: '> 1000',
    concurrentUsers: '> 500'
  },
  errorRate: {
    http4xx: '< 5%',
    http5xx: '< 1%'
  },
  availability: {
    uptime: '> 99.9%'
  }
};

// Custom metrics
const customMetrics = {
  userRegistrations: 'counter',
  projectCreations: 'counter',
  workshopRegistrations: 'counter',
  fileUploads: 'counter',
  apiCalls: 'histogram',
  databaseQueries: 'histogram'
};
```

### **Logging Strategy**
```typescript
// Log levels and structure
const logLevels = {
  error: 0,   // System errors, crashes
  warn: 1,    // Warnings, deprecated features
  info: 2,    // General information
  debug: 3,   // Debug information
  trace: 4    // Detailed trace information
};

// Log format
interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context: {
    userId?: string;
    requestId?: string;
    endpoint?: string;
    method?: string;
    ip?: string;
    userAgent?: string;
  };
  metadata?: Record<string, any>;
  stack?: string;
}
```

## 🚀 Deployment & DevOps

### **Environment Configuration**
```typescript
// Environment variables
const environmentConfig = {
  development: {
    database: {
      host: 'localhost',
      port: 5432,
      name: 'newtonbotics_dev',
      user: 'dev_user',
      password: 'dev_password'
    },
    redis: {
      host: 'localhost',
      port: 6379
    },
    jwt: {
      secret: 'dev_secret_key',
      expiresIn: '24h'
    }
  },
  production: {
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT)
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  }
};
```

### **Docker Configuration**
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

### **CI/CD Pipeline**
```yaml
# GitHub Actions workflow
name: NewtonBotics Backend CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: docker build -t newtonbotics-backend .
      - run: docker push newtonbotics-backend:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          # Deployment commands
          echo "Deploying to production..."
```

## 🔮 Future Enhancements

### **Phase 2 Features**
- **AI-Powered Recommendations**: Suggest projects, workshops, and team members
- **Advanced Analytics**: Detailed insights into club performance and member engagement
- **Mobile App**: Native mobile applications for iOS and Android
- **Integration APIs**: Connect with external systems (LMS, university databases)
- **Advanced Reporting**: Custom report builder and data export tools

### **Phase 3 Features**
- **Machine Learning**: Predictive analytics for project success and resource optimization
- **Blockchain Integration**: Secure credential verification and achievement tracking
- **IoT Integration**: Real-time lab monitoring and equipment status
- **Advanced Collaboration**: Real-time document editing and project collaboration tools
- **Multi-language Support**: Internationalization for diverse student populations

## 📚 Additional Resources

### **Development Tools**
- **API Documentation**: Swagger/OpenAPI specification
- **Database ODM**: Mongoose.js for MongoDB schema management
- **Database GUI**: MongoDB Compass, Studio 3T, or MongoDB Atlas
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Testing**: Jest, Supertest, Artillery for load testing
- **MongoDB Tools**: mongodump, mongorestore, mongoexport, mongoimport

### **Monitoring Tools**
- **Application Performance**: New Relic, DataDog, or similar
- **Error Tracking**: Sentry, Rollbar
- **Log Management**: ELK Stack, Papertrail
- **Infrastructure**: AWS CloudWatch, Google Cloud Monitoring

### **Security Tools**
- **Vulnerability Scanning**: Snyk, npm audit
- **Security Headers**: Helmet.js
- **Rate Limiting**: Express-rate-limit
- **Input Validation**: Joi, Yup, or similar

---

## 🎯 **Next Steps for Backend Development**

1. **Choose Technology Stack**: Decide on Node.js/Express vs Python/Django vs other frameworks
2. **Set Up Development Environment**: Install required tools and dependencies
3. **Database Setup**: Configure PostgreSQL/MySQL with initial schema
4. **Authentication System**: Implement JWT-based authentication
5. **Core API Development**: Start with user management and basic CRUD operations
6. **Testing Implementation**: Set up testing framework and write initial tests
7. **Security Implementation**: Add input validation, rate limiting, and security headers
8. **Documentation**: Generate API documentation using Swagger/OpenAPI
9. **Deployment Setup**: Configure CI/CD pipeline and deployment infrastructure
10. **Performance Optimization**: Implement caching, database optimization, and monitoring

This specification provides a comprehensive foundation for building a robust, scalable, and secure backend system for the NewtonBotics Robotics Club Management System! 🚀✨
