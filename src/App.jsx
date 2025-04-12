import Favorites from './pages/Favorites.jsx';
import Home from './pages/Home.jsx';
import './css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import { MovieProvider } from './contexts/MovieContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import PhimLe from "./pages/PhimLe.jsx";
import PhimMoi from "./pages/PhimMoi.jsx";
import TheLoai from "./pages/TheLoai.jsx";
import PhimTheoTheLoai from "./pages/PhimTheoTheLoai.jsx";
import { useAuth } from './contexts/AuthContext.jsx';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // Redirect to home if not logged in
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phim-le" element={<PhimLe />} />
      <Route path="/phim-moi" element={<PhimMoi />} />
      <Route path="/the-loai" element={<TheLoai />} />
      <Route path="/the-loai/:genreId" element={<PhimTheoTheLoai />} />
      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;