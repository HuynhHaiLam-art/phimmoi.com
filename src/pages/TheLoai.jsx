import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/api';
import '../css/TheLoai.css';

function TheLoai() {
    const [genres, setGenres] = useState([]);

    // Đối chiếu tên thể loại sang tiếng Việt
    const genreTranslations = {
        'Action': 'Hành Động',
        'Adventure': 'Phiêu Lưu',
        'Animation': 'Hoạt Hình',
        'Comedy': 'Hài Hước',
        'Crime': 'Tội Phạm',
        'Documentary': 'Tài Liệu',
        'Drama': 'Chính Kịch',
        'Family': 'Gia Đình',
        'Fantasy': 'Viễn Tưởng',
        'History': 'Lịch Sử',
        'Horror': 'Kinh Dị',
        'Music': 'Âm Nhạc',
        'Mystery': 'Bí Ẩn',
        'Romance': 'Lãng Mạn',
        'Science Fiction': 'Khoa Học Viễn Tưởng',
        'TV Movie': 'Phim Truyền Hình',
        'Thriller': 'Giật Gân',
        'War': 'Chiến Tranh',
        'Western': 'Cao Bồi',
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="genre-container">
            <h2 className="section-title">Thể Loại Phim</h2>
            <div className="genre-grid">
                {genres.map((genre) => (
                    <Link 
                        to={`/the-loai/${genre.id}`} 
                        key={genre.id}
                        className="genre-card"
                    >
                        <span>{genreTranslations[genre.name] || genre.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TheLoai;