# Organiso Kanban App

Organiso is a modern, full-stack Kanban board application designed for teams and individuals to manage tasks efficiently. Featuring a clean green and white theme, intuitive UI, and robust backend, Organiso streamlines your workflow with style and reliability.
![Screenshot 2025-07-05 211423](https://github.com/user-attachments/assets/5542c2ae-5da5-46cb-b0a7-03d0289dc1ee)

![Screenshot 2025-07-05 211439](https://github.com/user-attachments/assets/b5bbadb3-4fdb-4534-8426-9954d2eac6b3)

![Screenshot 2025-07-05 211508](https://github.com/user-attachments/assets/ec0c251b-eb65-4c0e-bd75-e7ff5ac33f1c)


## Features!

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


Set environment variables on each platform as described above.




