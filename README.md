
# 🎬 Movie Recommendation App

A full-featured movie recommendation platform where users can discover, search, and save their favorite movies. Built with the MERN stack and TMDB API integration.

## 🌟 Live Demo

**Frontend:** [View on Netlify](https://movie-recommendation-app-52vz.vercel.app/)  
**Backend:** [View on Render](https://movie-recommendation-app-rxmq.onrender.com)

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## ✅ Features

### 🔐 User Authentication
- JWT-based registration and login
- Password encryption with bcrypt

### 🔎 Movie Discovery
- Search by title, genre, or year
- Filter by rating, release date, or popularity
- Detailed movie view with poster and info

### 🌟 User Features
- Save favorite movies
- Create custom watchlists
- Rate and review movies (optional)
- Edit profile, change password, or delete account
- Avatar/profile picture upload

### 🔄 Personalized Recommendations
- Recommended movies based on favorite genres or viewing history

### 👥 Social Features (Stretch)
- Follow/unfollow users
- View followers/following list
- Movie trailer

---

## 🛠 Tech Stack

### 🚀 Frontend (React)
- **React.js** with Hooks and functional components
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Axios** for HTTP requests

### 🧠 Backend (Express.js)
- **Express.js** for building REST APIs
- **MongoDB** & **Mongoose** for database
- **JWT** for authentication
- **bcrypt** for password hashing

### 🌐 External API
- **TMDB (The Movie Database)**: Fetching movie data and posters

### 🔧 Dev Tools
- **Vite** for fast frontend build
- **Postman** for API testing
- **Render** for backend deployment
- **Netlify** or **Vercel** for frontend deployment

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/movie-recommendation-app.git
cd movie-recommendation-app
```

### 2. Install dependencies

```bash
# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install
```

### 3. Setup environment variables

Create a `.env` file in the backend root:

```
PORT=7000
MONGODB_URI=your-mongo-uri
JWT_SECRET=your-jwt-secret
SESSION_SECRET=session-secret
TMDB_API_KEY=your-tmdb-api-key
```

### 4. Start the application

```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm run dev
```

---

## 🌍 Deployment

### Frontend (Netlify/Vercel)
- Push the `frontend` folder to a GitHub repo.
- Connect repo to Netlify/Vercel and deploy.

### Backend (Render)
- Push the `backend` folder to a separate GitHub repo or subfolder.
- Add environment variables in Render.
- Deploy with Node environment.

---

## 📁 Project Structure

```
movie-recommendation-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
└── README.md
```

---

## 🚀 Future Improvements

- Implement movie trailer modal using TMDB’s video endpoint
- Improve recommendation algorithm using AI or collaborative filtering
- Add user reviews and ratings system
- Make it a PWA (Progressive Web App)
- Dark mode support

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
