import React, { useState } from 'react'; 
import './App.css'; 
import './Actions.css';
import InstructorsPage from './InstructorsPage.jsx'; 
import FavoritesPage from './FavoritesPage.jsx'; 
import LoginPage from './LoginPage.jsx'; 
import RegisterPage from './RegisterPage.jsx';
import CourseView from './CourseView.jsx';
import MyCoursesPage from './MyCoursesPage.jsx'; 
import CourseEditPage from './CourseEditPage.jsx';
import CourseAddPage from './CourseAddPage.jsx';

const PAGE_HOME = 'home';
const PAGE_INSTRUCTORS = 'instruktors';
const PAGE_FAVORITES = 'favorites'; 
const PAGE_MY_COURSES = 'my_courses'; 
const PAGE_LOGIN = 'login'; 
const PAGE_REGISTER = 'register';

const coursesData = [
    { title: "Kurs Nauki SQL", instructor: "Michał Nowak", rating: 5, imageSrc: "/src/course/placeholder_sql.png"},
    { title: "Kurs Pythona", instructor: "Jan Kowalski", rating: 4.5, imageSrc: "/src/course/placeholder_python.png"},
    { title: "Kurs AI", instructor: "Michał Nowak", rating: 4, imageSrc: "/src/course/placeholder_ai.png"},
    { title: "Kurs .Net Core", instructor: "Michał Nowak", rating: 5, imageSrc: "/src/course/placeholder_dotnet.png"},
];

export const StarRating = ({ rating }) => {
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
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/12x12/333/fff?text=S' }}
            />
        );
    }
    return <div className="star-rating">{stars}</div>;
};

export const FavoriteHeart = ({ isFavorite, onToggle }) => {
    const heartSrc = isFavorite 
      ? '/src/course/heart.png' 
      : '/src/course/heart-outline.png'; 

    const handleClick = (e) => {
        e.stopPropagation();
        onToggle();
    };

    return (
        <img 
            src={heartSrc} 
            className="filled-heart"
            onClick={handleClick}
            alt="Dodaj/Usuń z ulubionych"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/333/fff?text=H' }}
        />
    );
};

export const CourseCard = ({ course, onClick, isFavorite, onFavoriteToggle, showInstructor = true, onEdit, showFavoriteButton = true }) => (
    <div className="course-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <div 
            className="card-image-container" 
            style={{ backgroundColor: course.iconColor }} 
        >
            <img 
                src={course.imageSrc} 
                alt={course.title} 
                className="card-image" 
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/250x140/1B1B1B/FFFFFF?text=Kurs' }}
            />
        </div>
        
        {showFavoriteButton && (
            <FavoriteHeart 
                isFavorite={isFavorite}
                onToggle={onFavoriteToggle}
            />
        )}

        <div className="card-info">
            <h3 className="course-title">{course.title}</h3>
            {showInstructor && <p className="course-instructor">{course.instructor}</p>}
            <StarRating rating={course.rating} /> 
        </div>
        {onEdit && (
            <button className="card-edit-button" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                Edytuj
            </button>
        )}
    </div>
);

const LoggedInMenu = ({ handleLogout }) => ( 
    <div className="profile-menu">
        <button className="menu-item">Zmień Dane</button>
        <div className="menu-divider"></div>
        <button className="menu-item logout" onClick={handleLogout}>Wyloguj się</button>
    </div>
);

const Header = ({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn, navigateToPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsMenuOpen(false);
        navigateToPage(PAGE_HOME);
    };

    const searchPlaceholder = currentPage === PAGE_INSTRUCTORS ? "Wyszukaj Twórcę" : "Wyszukaj Kurs";

    const handleAuthClick = (page) => (e) => {
        e.preventDefault();
        navigateToPage(page);
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <img 
                        src="/src/logo.png" 
                        alt="e-LEARNING Logo" 
                        className="logo-image"
                        onClick={() => navigateToPage(PAGE_HOME)}
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
                        onClick={() => navigateToPage(PAGE_INSTRUCTORS)}
                        className={currentPage === PAGE_INSTRUCTORS ? 'active' : ''}
                    >
                        Instruktorzy
                    </a>

                    {isLoggedIn && (
                        <a 
                            href="#" 
                            onClick={() => navigateToPage(PAGE_MY_COURSES)}
                            className={currentPage === PAGE_MY_COURSES ? 'active' : ''}
                        >
                            Moje Szkolenia
                        </a>
                    )}
                    
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
                                onClick={() => navigateToPage(PAGE_FAVORITES)} 
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

const App = () => {
    const [currentPage, setCurrentPage] = useState(PAGE_HOME); 
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [isAddingCourse, setIsAddingCourse] = useState(false);

    const [dummyFavorites, setDummyFavorites] = useState({});
    const toggleDummyFavorite = (title) => {
        setDummyFavorites(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const navigateToPage = (page) => {
        setSelectedCourse(null);
        setEditingCourse(null);
        setIsAddingCourse(false);
        setCurrentPage(page);
    };

    const handleStartEdit = (course) => {
        setEditingCourse(course);
    };
    
    const handleStartAddCourse = () => {
        setIsAddingCourse(true);
    };

    const handleBackFromViews = () => {
        setSelectedCourse(null);
        setEditingCourse(null);
        setIsAddingCourse(false);
    };
    
    const handleCourseCreate = (newCourse) => {
        alert(`Pomyślnie stworzono kurs: ${newCourse.title}`);
        handleBackFromViews();
    };

    const renderPageContent = () => {
        if (isAddingCourse) {
            return (
                <CourseAddPage 
                    onBack={handleBackFromViews}
                    onCourseCreate={handleCourseCreate}
                />
            );
        }

        if (editingCourse) {
            return (
                <CourseEditPage 
                    course={editingCourse} 
                    onBack={handleBackFromViews} 
                />
            );
        }

        if (selectedCourse) {
            return (
                <CourseView 
                    course={selectedCourse} 
                    onBack={handleBackFromViews} 
                />
            );
        }

        switch(currentPage) {
            case PAGE_LOGIN:
                return <LoginPage setCurrentPage={navigateToPage} setIsLoggedIn={setIsLoggedIn} />;
            case PAGE_REGISTER:
                return <RegisterPage setCurrentPage={navigateToPage} setIsLoggedIn={setIsLoggedIn} />;
            case PAGE_INSTRUCTORS:
                return <InstructorsPage />;
            case PAGE_FAVORITES:
                return <FavoritesPage onNavigateToHome={() => navigateToPage(PAGE_HOME)} />;
            case PAGE_MY_COURSES: 
                return (
                    <MyCoursesPage 
                        setSelectedCourse={setSelectedCourse}
                        onNavigateToHome={() => navigateToPage(PAGE_HOME)} 
                        onStartEdit={handleStartEdit}
                        onStartAddCourse={handleStartAddCourse}
                    />
                );
            case PAGE_HOME:
            default:
                return (
                    <main className="main-content">
                        <h2 className="page-title">Dostępne Kursy</h2>
                        <div className="courses-list">
                            {coursesData.map((course, index) => (
                                <CourseCard 
                                    key={index} 
                                    course={course} 
                                    onClick={() => setSelectedCourse(course)}
                                    isFavorite={!!dummyFavorites[course.title]}
                                    onFavoriteToggle={() => toggleDummyFavorite(course.title)}
                                    showInstructor={true}
                                    showFavoriteButton={true}
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
                navigateToPage={navigateToPage}
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