import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
// import Register from './pages/Register';
import Favorites from './pages/Favorites';
import { AuthProvider } from './context/AuthContext';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import WatchlistManager from './pages/WatchlistManager';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile/Profile';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';
// import UserProfile from './pages/UserProfile';
import SocialPage from './pages/SocialPage';
import PublicProfile from './components/PublicProfile';

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <>
      <AuthProvider>
        {!shouldHideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlists" element={<WatchlistManager />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/users/:userId" element={<UserProfile />} /> */}
          <Route path="/social" element={<SocialPage />} />
          <Route path="/user/:username" element={<PublicProfile />} />
        </Routes>
        <Footer/>
      </AuthProvider>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
