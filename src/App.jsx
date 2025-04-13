import { useState } from 'react';
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
import MovieDetail from "./pages/MovieDetail.jsx";
import { useAuth } from './contexts/AuthContext.jsx';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen.jsx';

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
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function AppContent() {
    return (
        <AuthProvider>
            <MovieProvider>
                <div className="app">
                    <Navbar />
                    <main className="main-content">
                        <AppRoutes />
                    </main>
                    <Footer />
                </div>
            </MovieProvider>
        </AuthProvider>
    );
}

function App() {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashFinish = () => {
        setShowSplash(false);
    };

    return showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
    ) : (
        <AppContent />
    );
}

export default App;