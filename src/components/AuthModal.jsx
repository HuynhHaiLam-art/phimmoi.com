import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../css/AuthModal.css';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { signup, login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (mode === 'signup') {
                await signup(email, password, username);
            } else {
                await login(email, password);
            }
            onClose();
            // Clear form
            setEmail('');
            setPassword('');
            setUsername('');
        } catch (error) {
            setError('Đăng ' + (mode === 'signup' ? 'ký' : 'nhập') + ' thất bại: ' + error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <div className="auth-modal-header">
                    <h2>{mode === 'signup' ? 'Đăng Ký' : 'Đăng Nhập'}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <div className="form-group">
                            <label>Tên người dùng</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {mode === 'signup' ? 'Đăng Ký' : 'Đăng Nhập'}
                    </button>
                </form>

                <div className="auth-switch">
                    {mode === 'signup' ? (
                        <p>Đã có tài khoản? <button onClick={() => setMode('login')}>Đăng nhập</button></p>
                    ) : (
                        <p>Chưa có tài khoản? <button onClick={() => setMode('signup')}>Đăng ký</button></p>
                    )}
                </div>
            </div>
        </div>
    );
}