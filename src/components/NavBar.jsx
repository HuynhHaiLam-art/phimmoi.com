import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Logo */}
          <Link to="/">
            <img 
              src="src/assets/react.svg" 
              alt="Logo" 
              className="navbar-logo"
            />
          </Link>
          
          {/* Navigation Links */}
          <div className="navbar-links">
            <Link to="/">Trang chủ</Link>
            <Link to="/phim-le">Phim lẻ</Link>
            <Link to="/phim-moi">Phim mới</Link>
            <Link to="/the-loai">Thể loại</Link>
            <Link to="/favorites" className="favorite">
              <svg 
                className="favorite-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="none"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Yêu thích
            </Link>
          </div>
        </div>

        <div className="navbar-right">
          <div className="user-menu">
            <img 
              src="vite.svg" 
              alt="User" 
              className="user-avatar"
            />
            <svg 
              className="dropdown-arrow" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;