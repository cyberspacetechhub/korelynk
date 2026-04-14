# Tutorial System Setup Guide

## Overview
The tutorial system has been fully implemented with backend API, frontend integration, and admin management panel.

## What Was Implemented

### 1. Backend (✅ Complete)
- **Model**: `backend/models/Tutorial.js` - MongoDB schema for tutorials
- **Service**: `backend/services/tutorialService.js` - Business logic layer
- **Controller**: `backend/controllers/tutorialController.js` - Request handlers
- **Routes**: `backend/routes/tutorials.js` - API endpoints
- **Seed Script**: `backend/scripts/seedTutorials.js` - Sample data

### 2. Frontend (✅ Complete)
- **API Service**: `frontend/src/api/tutorialAPI.js` - API client functions
- **Academy Page**: `frontend/src/pages/Academy.jsx` - Updated to fetch from API
- **Admin Panel**: `frontend/src/components/admin/AdminTutorials.jsx` - CRUD interface

### 3. Routes Added
- **App.jsx**: Added `/admin/tutorials` route
- **AdminAside.jsx**: Added "Tutorials" link in Learning Management section

## API Endpoints

### Public Endpoints
```
GET  /api/tutorials                    - Get all tutorials
GET  /api/tutorials/category/:category - Get tutorials by category
GET  /api/tutorials/stats              - Get category statistics
GET  /api/tutorials/:slug              - Get single tutorial (increments views)
```

### Admin Endpoints (Protected)
```
POST   /api/tutorials     - Create tutorial
PUT    /api/tutorials/:id - Update tutorial
DELETE /api/tutorials/:id - Delete tutorial
```

## Setup Instructions

### 1. Seed Tutorial Database
Run this command from the backend directory:
```bash
cd backend
npm run seed:tutorials
```

This will:
- Clear existing tutorials
- Insert 16 sample tutorials (2 per category)
- Display statistics by category

### 2. Start Backend Server
```bash
cd backend
npm run dev
```

### 3. Start Frontend
```bash
cd frontend
npm run dev
```

### 4. Access Tutorial Features

#### Public Academy Page
- Navigate to: `http://localhost:5173/academy`
- Browse tutorials by category
- View tutorial content and code examples
- See real-time tutorial counts

#### Admin Panel
- Login to admin: `http://localhost:5173/admin/login`
- Navigate to: Learning Management → Tutorials
- Create, edit, or delete tutorials
- Manage tutorial properties:
  - Title & Slug
  - Category (8 options)
  - Difficulty (beginner/intermediate/advanced)
  - Duration (minutes)
  - Order (for sorting)
  - Content (description)
  - Code Example
  - Published status

## Tutorial Categories
1. **HTML** - Web structure basics
2. **CSS** - Styling and layouts
3. **JavaScript** - Programming fundamentals
4. **React** - Component-based UI
5. **Node.js** - Server-side JavaScript
6. **Python** - General programming
7. **MongoDB** - NoSQL database
8. **Git** - Version control

## Sample Tutorial Structure
```javascript
{
  title: "React Components",
  slug: "react-components",
  category: "react",
  content: "Learn how to create functional components...",
  codeExample: "import React from 'react';\n\nfunction Welcome() {...}",
  duration: 25,
  order: 1,
  difficulty: "beginner",
  prerequisites: ["javascript-fundamentals"],
  isPublished: true
}
```

## Features

### Academy Page
- ✅ Dynamic category navigation
- ✅ Real-time tutorial loading
- ✅ Category statistics
- ✅ Loading states
- ✅ Error handling
- ✅ Code examples display
- ✅ Tutorial metadata (duration, difficulty)

### Admin Panel
- ✅ Full CRUD operations
- ✅ Form validation
- ✅ Auto-slug generation
- ✅ Rich text content
- ✅ Code syntax input
- ✅ Publish/draft toggle
- ✅ Responsive table view
- ✅ Edit/delete actions

## Next Steps (Optional Enhancements)

1. **Tutorial Detail Page** - Create individual tutorial view pages
2. **Progress Tracking** - Track user completion status
3. **Search & Filter** - Add search functionality
4. **Rich Text Editor** - Integrate WYSIWYG editor for content
5. **Syntax Highlighting** - Add code syntax highlighting
6. **Prerequisites Chain** - Link related tutorials
7. **User Bookmarks** - Allow users to save favorites
8. **Comments System** - Enable tutorial discussions

## Troubleshooting

### Tutorials Not Loading
- Check backend is running on port 3700
- Verify MongoDB connection
- Check browser console for errors
- Ensure tutorials are seeded

### Admin Panel Issues
- Verify admin authentication token
- Check localStorage for 'accessToken'
- Ensure admin role permissions

### Seed Script Errors
- Verify DATABASE_URI in .env
- Check MongoDB is running
- Ensure no duplicate slugs

## File Locations

```
backend/
├── models/Tutorial.js
├── services/tutorialService.js
├── controllers/tutorialController.js
├── routes/tutorials.js
└── scripts/seedTutorials.js

frontend/
├── src/
│   ├── api/tutorialAPI.js
│   ├── pages/Academy.jsx
│   └── components/admin/AdminTutorials.jsx
```

## Success Indicators

✅ Backend server starts without errors
✅ Seed script completes successfully
✅ Academy page loads tutorials dynamically
✅ Category counts display correctly
✅ Admin panel shows tutorial management
✅ CRUD operations work properly
✅ Code examples render correctly

---

**Status**: All features implemented and ready to use!
**Last Updated**: 2024
