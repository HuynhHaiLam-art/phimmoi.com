import { Link } from "react-router-dom";
import "../css/NavBar.css"

function Navbar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Ứng dụng xem phim lậu</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Trang chủ </Link>
            <Link to="/favorites" className="nav-link">Yêu thích</Link>
        </div>
    </nav>
}
export default Navbar