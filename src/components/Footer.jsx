import { Link } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">PHIMMỌI.COM</h3>
                    <p className="footer-description">
                        Trang xem phim trực tuyến với đầy đủ các bộ phim mới nhất, phim chiếu rạp hay nhất.
                        Hỗ trợ xem phim trên nhiều thiết bị.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Liên Kết</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Trang Chủ</Link></li>
                        <li><Link to="/phim-moi">Phim Mới</Link></li>
                        <li><Link to="/phim-chieu-rap">Phim Chiếu Rạp</Link></li>
                        <li><Link to="/phim-bo">Phim Bộ</Link></li>
                        <li><Link to="/phim-le">Phim Lẻ</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Thể Loại</h4>
                    <ul className="footer-links">
                        <li><Link to="/the-loai/hanh-dong">Phim Hành Động</Link></li>
                        <li><Link to="/the-loai/tinh-cam">Phim Tình Cảm</Link></li>
                        <li><Link to="/the-loai/hoat-hinh">Phim Hoạt Hình</Link></li>
                        <li><Link to="/the-loai/hai-huoc">Phim Hài Hước</Link></li>
                        <li><Link to="/the-loai/kinh-di">Phim Kinh Dị</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Liên Hệ</h4>
                    <ul className="footer-contact">
                        <li>
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:contact@phimmoi.com">contact@phimmoi.com</a>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <span>0123 456 789</span>
                        </li>
                        <li className="footer-social">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} PHIMMỌI.COM. Tất cả quyền được bảo lưu.</p>
                <p className="footer-disclaimer">
                    Website chỉ dành cho mục đích học tập và giải trí.
                </p>
            </div>
        </footer>
    );
}

export default Footer;