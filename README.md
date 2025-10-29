# KoreLynk Tech

A modern full-stack web application for a technology company showcasing services, portfolio, team, and client feedback with a comprehensive admin dashboard.

## 🚀 Features

### Frontend
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI/UX** - Clean, professional interface
- **Dynamic Content** - Real-time data from backend API
- **Testimonials System** - Client feedback and ratings
- **Newsletter Subscription** - Email collection system
- **Scroll to Top** - Smooth navigation experience

### Backend
- **RESTful API** - Express.js with MongoDB
- **Authentication** - JWT with refresh tokens
- **File Uploads** - Cloudinary integration
- **Email Service** - Automated notifications
- **Admin Dashboard** - Complete content management

### Admin Features
- **Dashboard Overview** - Statistics and recent activity
- **Content Management** - Projects, services, team members
- **Feedback Management** - Review and feature testimonials
- **Settings Control** - Site configuration and branding
- **Newsletter Management** - Subscriber administration
- **Responsive Admin Panel** - Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Toastify** - Notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Cloudinary** - Image/file storage
- **Nodemailer** - Email service
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
cyberspace/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom hooks
│   │   └── api/             # API configuration
│   └── public/              # Static assets
├── backend/                 # Express API server
│   ├── controllers/         # Route handlers
│   ├── models/              # Database schemas
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── middleware/          # Custom middleware
│   └── utils/               # Utility functions
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Email service credentials

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cyberspace
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Environment Variables**
Create `.env` file in backend directory:
```env
# Database
DATABASE_URI=mongodb://localhost:27017/cyberspace

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# URLs
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:3700
```

4. **Start Backend Server**
```bash
npm start
```

5. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

## 📚 API Endpoints

### Public Routes
- `GET /api/services` - Get all services
- `GET /api/projects` - Get projects
- `GET /api/team` - Get team members
- `GET /api/feedback/testimonials` - Get testimonials
- `POST /api/contact` - Submit contact form
- `POST /api/feedback` - Submit feedback
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Admin Routes (Protected)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/contacts` - Manage contacts
- `GET /api/admin/projects` - Manage projects
- `GET /api/admin/feedback` - Manage feedback
- `GET /api/admin/settings` - Site settings
- `POST /api/admin/upload` - File uploads

## 🔐 Authentication

The application uses JWT-based authentication with:
- **Access Tokens** - 15-minute expiry
- **Refresh Tokens** - 7-day expiry, stored as httpOnly cookies
- **Protected Routes** - Admin dashboard and management features

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Responsive layouts for tablets
- **Desktop Enhanced** - Full features on desktop
- **Admin Mobile** - Mobile-friendly admin interface

## 🎨 Features Highlights

### Dynamic Content Management
- Real-time content updates
- Image upload and management
- SEO settings control
- Social media integration

### Feedback System
- Star rating system
- Admin approval workflow
- Testimonial featuring
- Responsive feedback forms

### Professional UI/UX
- Smooth animations
- Loading states
- Error handling
- Toast notifications
- Scroll to top functionality

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
cd backend
# Set environment variables
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email korelynk@gmail.com or create an issue in the repository.

---

**Built with ❤️ by KoreLynk Tech**