import React, { useState } from 'react'; 
import './App.css'; 
import InstructorsPage from './InstructorsPage.jsx'; 
import FavoritesPage from './FavoritesPage.jsx'; 
import LoginPage from './LoginPage.jsx'; 
import RegisterPage from './RegisterPage.jsx';
import CourseView from './CourseView.jsx'; // ✅ NOWY IMPORT

// --- DEKLARACJA TYPÓW STRON ---
const PAGE_HOME = 'home';
const PAGE_INSTRUCTORS = 'instruktors';
const PAGE_FAVORITES = 'favorites'; 
const PAGE_LOGIN = 'login'; 
const PAGE_REGISTER = 'register';

// --- DANE KURSU (Używane tylko na stronie głównej) ---
const coursesData = [
    { title: "Kurs Nauki SQL", instructor: "Michał Nowak", rating: 5, imageSrc: "/src/course/placeholder_sql.png"},
    { title: "Kurs Pythona", instructor: "Jan Kowalski", rating: 4.5, imageSrc: "/src/course/placeholder_python.png"},
    { title: "Kurs AI", instructor: "Michał Nowak", rating: 4, imageSrc: "/src/course/placeholder_ai.png"},
    { title: "Kurs .Net Core", instructor: "Michał Nowak", rating: 5, imageSrc: "/src/course/placeholder_dotnet.png"},
];

// --- KOMPONENTY POMOCNICZE ---
const FavoriteHeart = () => {
    const [isFavorite, setIsFavorite] = useState(true);
    const toggleFavorite = () => setIsFavorite(prev => !prev);
    const heartSrc = isFavorite 
      ? '/src/course/heart.png' 
      : '/src/course/heart-outline.png'; 

    return (
        <img 
            src={heartSrc} 
            className="filled-heart"
            onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
            alt="Dodaj/Usuń z ulubionych"
        />
    );
};

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        let starImageSrc = "/src/rating-star/star-empty.png"; 
        if (i <= rating) starImageSrc = "/src/rating-star/star-full.png";
        else if (i - 0.5 === rating) starImageSrc = "/src/rating-star/star-half.png";
        
        stars.push(
            <img 
                key={i} 
                src={starImageSrc} 
                alt="Gwiazdka oceny"
                className="star-icon-image"
            />
        );
    }
    return <div className="star-rating">{stars}</div>;
};

// --- KARTA KURSU ---
const CourseCard = ({ course, onClick }) => (
    <div className="course-card" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div 
            className="card-image-container" 
            style={{ backgroundColor: course.iconColor }} 
        >
            <img 
                src={course.imageSrc} 
                alt={course.title} 
                className="card-image" 
            />
        </div>
        <FavoriteHeart />
        <div className="card-info">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-instructor">{course.instructor}</p>
            <StarRating rating={course.rating} /> 
        </div>
    </div>
);

// --- MENU PROFILU ---
const LoggedInMenu = ({ handleLogout }) => ( 
    <div className="profile-menu">
        <button className="menu-item">Zmień Dane</button>
        <div className="menu-divider"></div>
        <button className="menu-item logout" onClick={handleLogout}>Wyloguj się</button>
    </div>
);

// --- HEADER ---
const Header = ({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsMenuOpen(false);
        setCurrentPage(PAGE_HOME);
    };

    const searchPlaceholder = currentPage === PAGE_INSTRUCTORS ? "Wyszukaj Twórcę" : "Wyszukaj Kurs";

    const handleAuthClick = (page) => (e) => {
        e.preventDefault();
        setCurrentPage(page);
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <img 
                        src="/src/logo.png" 
                        alt="e-LEARNING Logo" 
                        className="logo-image"
                        onClick={() => setCurrentPage(PAGE_HOME)}
                        style={{ cursor: 'pointer' }} 
                    />
                </div>
                <div className="search-bar">
                    <img 
                        src="/src/icon/lupa.png" 
                        alt="Wyszukaj" 
                        className="search-icon-image" 
                    />
                    <input type="text" placeholder={searchPlaceholder} className="search-input" />
                </div>
            </div>
            
            <div className="header-right">
                <nav className="nav-links">
                    <a 
                        href="#" 
                        onClick={() => setCurrentPage(PAGE_INSTRUCTORS)}
                        className={currentPage === PAGE_INSTRUCTORS ? 'active' : ''}
                    >
                        Instruktorzy
                    </a>

                    {isLoggedIn && <a href="#szkolenia">Moje Szkolenia</a>}
                    
                    {!isLoggedIn && (
                        <>
                            <a 
                                href="#login" 
                                className="nav-button" 
                                onClick={handleAuthClick(PAGE_LOGIN)}
                            >
                                Zaloguj się
                            </a>
                            <a 
                                href="#register" 
                                className="nav-button register-button"
                                onClick={handleAuthClick(PAGE_REGISTER)}
                            >
                                Zarejestruj się
                            </a>
                        </>
                    )}
                </nav>

                <div className="user-actions">
                    {isLoggedIn && (
                        <>
                            <img 
                                src="/src/icon/hearticon.png" 
                                alt="Ulubione" 
                                className="action-icon-image favorite-icon-image" 
                                onClick={() => setCurrentPage(PAGE_FAVORITES)} 
                                style={{ cursor: 'pointer' }}
                            /> 
                            <img 
                                src="/src/icon/notification.png" 
                                alt="Powiadomienia" 
                                className="action-icon-image notification-icon-image" 
                            />
                            <img 
                                src="/src/icon/usericon.png" 
                                alt="Profil" 
                                className="action-icon-image profile-icon-image" 
                                onClick={toggleMenu} 
                            />
                        </>
                    )}
                    {isMenuOpen && isLoggedIn && <LoggedInMenu handleLogout={handleLogout} />}
                </div>
            </div>
        </header>
    );
};

// --- GŁÓWNY KOMPONENT APLIKACJI ---
const App = () => {
    const [currentPage, setCurrentPage] = useState(PAGE_HOME); 
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null); // ✅ WYBRANY KURS

    const navigateToHome = () => {
        setSelectedCourse(null);
        setCurrentPage(PAGE_HOME);
    };

    const renderPageContent = () => {
        if (selectedCourse) {
            // ✅ Widok pojedynczego kursu
            return (
                <CourseView 
                    course={selectedCourse} 
                    onBack={() => setSelectedCourse(null)} 
                />
            );
        }

        switch(currentPage) {
            case PAGE_LOGIN:
                return <LoginPage setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
            case PAGE_REGISTER:
                return <RegisterPage setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
            case PAGE_INSTRUCTORS:
                return <InstructorsPage />;
            case PAGE_FAVORITES:
                return <FavoritesPage onNavigateToHome={navigateToHome} />;
            case PAGE_HOME:
            default:
                return (
                    <main className="main-content">
                        <h2 className="section-title2">Dostępne Kursy</h2>
                        <div className="courses-list">
                            {coursesData.map((course, index) => (
                                <CourseCard 
                                    key={index} 
                                    course={course} 
                                    onClick={() => setSelectedCourse(course)} // ✅ Kliknięcie otwiera widok
                                />
                            ))}
                        </div>
                    </main>
                );
        }
    };

    return (
        <div className="app">
            <Header 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
            />
            
            {renderPageContent()}

            <footer className="footer">
                <img 
                    src="/src/logo.png" 
                    alt="e-LEARNING Logo" 
                    className="logo-image"
                />
            </footer>
        </div>
    );
};

export default App;
