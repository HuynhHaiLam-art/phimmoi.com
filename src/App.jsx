import Favorites from './pages/Favorites';
import Home from './pages/Home';
import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar  from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext.jsx';
import PhimLe from "./pages/PhimLe";
import PhimMoi from "./pages/PhimMoi";
import TheLoai from "./pages/TheLoai";
import PhimTheoTheLoai from "./pages/PhimTheoTheLoai";



function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phim-le" element={<PhimLe />} />
        <Route path="/phim-moi" element={<PhimMoi />} />
        <Route path="/the-loai" element={<TheLoai />} />
        <Route path="/the-loai/:genreId" element={<PhimTheoTheLoai />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
    </MovieProvider>
  );
}

export default App
