import { useState, useEffect } from 'react';
import '../css/SplashScreen.css';

function SplashScreen({ onFinish }) {
    const [isAnimating, setIsAnimating] = useState(true);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        // Hiện logo sau 500ms
        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 500);

        // Kết thúc splash screen sau 3.5s
        const finishTimer = setTimeout(() => {
            setIsAnimating(false);
            setTimeout(onFinish, 1000); // Đợi animation fade out hoàn thành
        }, 3500);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div className={`splash-screen ${!isAnimating ? 'fade-out' : ''}`}>
            <div className="splash-background">
                <div className="particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle" />
                    ))}
                </div>
                <div className="splash-circle"></div>
            </div>
            
            <div className="splash-content">
                <div className={`logo-container ${showText ? 'show' : ''}`}>
                    <div className="logo-text">
                        <span className="logo-char">P</span>
                        <span className="logo-char">H</span>
                        <span className="logo-char">I</span>
                        <span className="logo-char">M</span>
                        <span className="logo-char space"></span>
                        <span className="logo-char">M</span>
                        <span className="logo-char">Ọ</span>
                        <span className="logo-char">I</span>
                    </div>
                    <div className="logo-subtitle">Trải nghiệm điện ảnh tuyệt vời</div>
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;