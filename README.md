🚀 Project Manager

A modern full-stack project management platform built with Next.js, Node.js, Express, and MongoDB, featuring JWT authentication, project & task management, analytics, activity tracking, and a responsive dashboard.












📖 Overview

Project Manager is a full-stack productivity application designed to help users organize projects, manage tasks, monitor progress, and visualize productivity through interactive dashboards and analytics.

The application emphasizes clean architecture, reusable components, RESTful API design, and production-style engineering practices.

✨ Features
Authentication
JWT Authentication
Secure password hashing with bcrypt
Protected API routes
User profile management
Project Management
Create projects
Edit projects
Delete projects
Project progress tracking
Responsive project dashboard
Task Management
Create tasks
Edit tasks
Delete tasks
Status workflow
Todo
↓
In Progress
↓
Done
File attachments
Global task management
Project-specific task boards
Dashboard

Displays:

Total Projects
Total Tasks
Completed Tasks
Pending Tasks
Productivity %
Recent Projects
Recent Tasks
Recent Activity
Analytics

Interactive charts showing:

Task status distribution
Project completion progress
Overall productivity insights
Activity Logging

Tracks user actions including:

Project creation
Project updates
Project deletion
Task creation
Task updates
Task deletion
Status changes
User Experience
Responsive design
Loading states
Empty states
Confirmation dialogs
Toast notifications
File uploads
Modern UI with Tailwind CSS
🛠 Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Axios
Recharts
React Hot Toast
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Multer
Swagger
📂 Project Structure
Project Manager
│
├── frontend
│   ├── app
│   ├── components
│   ├── context
│   ├── services
│   ├── types
│   └── public
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── utils
│   ├── swagger
│   └── server.js
│
└── README.md
🏗 Architecture
Next.js Frontend
        │
        │ REST API
        ▼
Express Backend
        │
        ▼
Authentication Middleware
        │
        ▼
Controllers
        │
        ▼
MongoDB (Mongoose)
🔐 Authentication Flow
Register
      │
      ▼
Password Hashing (bcrypt)
      │
      ▼
Login
      │
      ▼
JWT Generation
      │
      ▼
Client Stores Token
      │
      ▼
Protected Requests
      │
      ▼
JWT Verification Middleware
📊 Dashboard Metrics

The dashboard provides real-time statistics including:

Total Projects
Total Tasks
Completed Tasks
Pending Tasks
Productivity Percentage
Recent Activity Feed
📈 Analytics

Visualizes:

Task completion distribution
Project progress
Productivity trends
📡 REST API
Authentication
POST /api/auth/register
POST /api/auth/login
Users
GET  /api/users/getme
PUT  /api/users/profile
GET  /api/users/dashboard-stats
GET  /api/users/analytics
Projects
GET
POST
PUT
DELETE
Tasks
GET
POST
PUT
DELETE
PATCH Status
Upload Attachment
⚙️ Installation

Clone the repository

git clone <repo-url>

Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev
🔑 Environment Variables

Backend

PORT=
MONGO_URI=
JWT_SECRET=

Frontend

NEXT_PUBLIC_API_URL=
🚀 Deployment

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas
📚 What I Learned

Through this project I strengthened my understanding of:

Designing RESTful APIs
JWT authentication & authorization
MongoDB data modeling
Express middleware architecture
React state management
Next.js App Router
TypeScript
File uploads with Multer
Dashboard & analytics design
Component reusability
Error handling
Building production-style full-stack applications
🔮 Future Improvements
Kanban drag-and-drop
Team collaboration
Role-based access control
Email notifications
Due dates & reminders
Search & advanced filtering
Real-time updates using WebSockets
Docker & Docker Compose
CI/CD pipeline
Unit & integration testing
