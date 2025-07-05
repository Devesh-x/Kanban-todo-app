# Organiso Kanban App

Organiso is a modern, full-stack Kanban board application designed for teams and individuals to manage tasks efficiently. Featuring a clean green and white theme, intuitive UI, and robust backend, Organiso streamlines your workflow with style and reliability.

## Features

- 🟩 **Modern Green/White Theme**: Consistent, clean, and accessible design throughout the app.
- 📝 **Task Management**: Create, update, delete, and organize tasks by priority and status.
- 👥 **Team Collaboration**: Manage organization members and assign tasks.
- 📅 **Due Dates**: Set deadlines with a calendar picker.
- 🔒 **Authentication**: Secure login/register with JWT-based auth.
- 🚀 **Responsive UI**: Works great on desktop and mobile.
- 🌐 **Deployment Ready**: Optimized for Vercel (frontend) and Render (backend).

## Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, modern CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Other**: Cloudinary (file uploads), JWT, CORS, Multer

## Branding

- App name: **Organiso**
- Logo: Green square with white clipboard and "Organiso" text
- Favicon and browser tab title match branding

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB database

### Setup

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd kanban
```

#### 2. Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

#### 3. Environment Variables

- **Backend** (`backend/.env`):
  - `MONGO_URI=<your-mongodb-uri>`
  - `JWT_SECRET=<your-jwt-secret>`
  - `CLOUDINARY_URL=<your-cloudinary-url>`
  - `CLIENT_URL=<your-frontend-url>`

- **Frontend** (`frontend/.env`):
  - `VITE_API_BASE_URL=<your-backend-url>/api`

#### 4. Run Locally

- **Backend**
```bash
cd backend
npm run dev
```
- **Frontend**
```bash
cd frontend
npm run dev
```

## Deployment

- **Frontend**: Deploy to [Vercel](https://vercel.com/)
- **Backend**: Deploy to [Render](https://render.com/)

Set environment variables on each platform as described above.

## Screenshots

> ![Organiso Kanban Board Screenshot](#)
> _Add your own screenshots here_

## Credits

- UI/UX: Green/white theme, modern layouts, and branding by [Your Name/Team]
- Logo: Custom clipboard icon

---

© 2024 Organiso. All rights reserved. 