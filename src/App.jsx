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
import CourseDetailsPage from './CourseDetailsPage.jsx';
import CourseAddPage from './CourseAddPage.jsx';
import MyLearningPage from './MyLearningPage.jsx';
import './MyLearningPage.css';
import ProfilePage from './ProfilePage.jsx';
import './ProfilePage.css';
import SearchResultsPage from './SearchResultsPage.jsx';
import './SearchResultsPage.css';
import InstructorProfilePage from './InstructorProfilePage.jsx';
import './InstructorProfilePage.css';
import CourseRatingForm from './CourseRatingForm.jsx';
import './CourseRatingForm.css';
import NotificationsDropdown from './NotificationsDropdown.jsx';
import './NotificationsDropdown.css';
import CertificatePage from './CertificatePage.jsx';
import './CertificatePage.css';


const PAGE_HOME = 'home';
const PAGE_INSTRUCTORS = 'instruktors';
const PAGE_INSTRUCTOR_PROFILE = 'instructor_profile';
const PAGE_FAVORITES = 'favorites'; 
const PAGE_MY_COURSES = 'my_courses';
const PAGE_MY_LEARNING = 'my_learning';
const PAGE_PROFILE = 'profile';
const PAGE_SEARCH_RESULTS = 'search_results';
const PAGE_LOGIN = 'login'; 
const PAGE_REGISTER = 'register';

const coursesData = [
    { id: 1, title: "Kurs Nauki SQL", instructor: "Michał Nowak", rating: 5, imageSrc: "/src/course/placeholder_sql.png", description: "Poznaj podstawy i zaawansowane techniki SQL. Ten kurs nauczy Cię, jak efektywnie zarządzać bazami danych i pisać złożone zapytania."},
    { id: 2, title: "Kurs Pythona", instructor: "Jan Kowalski", rating: 4.5, imageSrc: "/src/course/placeholder_python.png", description: "Zacznij swoją przygodę z programowaniem w Pythonie. Kurs obejmuje wszystko od podstawowej składni po tworzenie aplikacji webowych."},
    { id: 3, title: "Kurs AI", instructor: "Michał Nowak", rating: 4, imageSrc: "/src/course/placeholder_ai.png", description: "Wprowadzenie do świata Sztucznej Inteligencji. Dowiedz się, czym są sieci neuronowe, uczenie maszynowe i jak są wykorzystywane w praktyce."},
    { id: 4, title: "Kurs .Net Core", instructor: "Michał Nowak", rating: 5, imageSrc: "/src/course/placeholder_dotnet.png", description: "Buduj nowoczesne, wieloplatformowe aplikacje z .NET Core. Kurs skupia się na tworzeniu wydajnych API REST oraz aplikacji webowych."},
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

export const CourseCard = ({ course, onClick, isFavorite, onFavoriteToggle, showInstructor = true, onEdit, showFavoriteButton = true, progress, onShowCertificate }) => {
    const isCompleted = progress === 100;
    
    return (
        <div 
            className={`course-card ${isCompleted ? 'completed' : ''}`} 
            onClick={onClick} 
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
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
            
            {progress > 0 && (
                <div className="progress-bar-container">
                    <div 
                        className={`progress-bar-fill ${isCompleted ? 'completed' : ''}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                    <span className="progress-bar-text">{progress}%</span>
                </div>
            )}
            
            {onEdit && (
                <button className="card-edit-button" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                    Edytuj
                </button>
            )}

            {onShowCertificate && (
                <button className="card-certificate-button" onClick={(e) => { e.stopPropagation(); onShowCertificate(); }}>
                    Zobacz Certyfikat
                </button>
            )}
        </div>
    );
};


const LoggedInMenu = ({ handleLogout, navigateToPage }) => ( 
    <div className="profile-menu">
        <button className="menu-item" onClick={() => navigateToPage(PAGE_PROFILE)}>
            Zmień Dane
        </button>
        <div className="menu-divider"></div>
        <button className="menu-item logout" onClick={handleLogout}>Wyloguj się</button>
    </div>
);

const Header = ({ 
    currentPage, 
    setCurrentPage, 
    isLoggedIn, 
    setIsLoggedIn, 
    navigateToPage, 
    searchQuery, 
    setSearchQuery, 
    handleSearchSubmit 
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        setIsNotificationsOpen(false);
    };
    
    const toggleNotifications = () => {
        setIsNotificationsOpen(prev => !prev);
        setIsMenuOpen(false);
    };

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
                    <input 
                        type="text" 
                        placeholder={searchPlaceholder} 
                        className="search-input" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearchSubmit();
                            }
                        }}
                    />
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
                        <>
                            <a 
                                href="#" 
                                onClick={() => navigateToPage(PAGE_MY_LEARNING)}
                                className={currentPage === PAGE_MY_LEARNING ? 'active' : ''}
                            >
                                Moja Nauka
                            </a>
                            <a 
                                href="#" 
                                onClick={() => navigateToPage(PAGE_MY_COURSES)}
                                className={currentPage === PAGE_MY_COURSES ? 'active' : ''}
                            >
                                Moje Kursy
                            </a>
                        </>
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
                            <div className="notification-icon-wrapper">
                                <img 
                                    src="/src/icon/notification.png" 
                                    alt="Powiadomienia" 
                                    className="action-icon-image notification-icon-image"
                                    onClick={toggleNotifications}
                                />
                                <div className="notification-dot"></div>
                            </div>
                            <img 
                                src="/src/icon/usericon.png" 
                                alt="Profil" 
                                className="action-icon-image profile-icon-image" 
                                onClick={toggleMenu} 
                            />
                        </>
                    )}
                    {isMenuOpen && isLoggedIn && <LoggedInMenu handleLogout={handleLogout} navigateToPage={navigateToPage} />}
                    {isNotificationsOpen && isLoggedIn && <NotificationsDropdown onClose={() => setIsNotificationsOpen(false)} />}
                </div>
            </div>
        </header>
    );
};

const App = () => {
    const [currentPage, setCurrentPage] = useState(PAGE_HOME); 
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [viewingCourse, setViewingCourse] = useState(null);
    const [detailsCourse, setDetailsCourse] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [ratingCourse, setRatingCourse] = useState(null);
    const [viewingCertificate, setViewingCertificate] = useState(null);
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isInstructorView, setIsInstructorView] = useState(false);

    const [dummyFavorites, setDummyFavorites] = useState({});
    const toggleDummyFavorite = (title) => {
        setDummyFavorites(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const navigateToPage = (page) => {
        setViewingCourse(null);
        setDetailsCourse(null);
        setEditingCourse(null);
        setIsAddingCourse(false);
        setSearchQuery('');
        setSelectedInstructor(null);
        setRatingCourse(null);
        setIsInstructorView(false);
        setViewingCertificate(null);
        setCurrentPage(page);
    };

    const handleStartEdit = (course) => {
        setEditingCourse(course);
    };
    
    const handleStartAddCourse = () => {
        setIsAddingCourse(true);
    };

    const handleBackFromViews = () => {
        setViewingCourse(null);
        setDetailsCourse(null);
        setEditingCourse(null);
        setIsAddingCourse(false);
        setSelectedInstructor(null);
        setRatingCourse(null);
        setIsInstructorView(false);
        setViewingCertificate(null);
        if (currentPage === PAGE_PROFILE) {
            navigateToPage(PAGE_HOME);
        }
    };

    const handleShowDetails = (course) => {
        setDetailsCourse(course);
    };
    
    const handleShowInstructorProfile = (instructor) => {
        setSelectedInstructor(instructor);
        setCurrentPage(PAGE_INSTRUCTOR_PROFILE);
    };

    const handleEnroll = (course) => {
        console.log(`Zapisano na kurs: ${course.title}`);
        setDetailsCourse(null);
        setIsInstructorView(false);
        setViewingCourse(course);
    };
    
    const handleCourseCreate = (newCourse) => {
        alert(`Pomyślnie stworzono kurs: ${newCourse.title}`);
        handleBackFromViews();
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim() === '') return;
        setViewingCourse(null);
        setDetailsCourse(null);
        setEditingCourse(null);
        setIsAddingCourse(false);
        setSelectedInstructor(null);
        setRatingCourse(null);
        setIsInstructorView(false);
        setViewingCertificate(null);
        setCurrentPage(PAGE_SEARCH_RESULTS);
    };
    
    const handleStartRating = (course) => {
        setRatingCourse(course);
    };
    
    const handleSubmitRating = (courseTitle, rating) => {
        alert(`Dziękujemy za ocenę ${rating} gwiazdek dla kursu: ${courseTitle}!`);
        handleBackFromViews();
        navigateToPage(PAGE_MY_LEARNING);
    };

    const handleViewCourseAsStudent = (course) => {
        setIsInstructorView(false);
        setViewingCourse(course);
    };

    const handleViewCourseAsInstructor = (course) => {
        setIsInstructorView(true);
        setViewingCourse(course);
    };
    
    const handleShowCertificate = (course) => {
        setViewingCertificate(course);
    };

    const renderPageContent = () => {
        if (viewingCertificate) {
            return (
                <CertificatePage
                    course={viewingCertificate}
                    userName="Jan Kowalski"
                    onBack={handleBackFromViews}
                />
            );
        }
        
        if (ratingCourse) {
            return (
                <CourseRatingForm 
                    course={ratingCourse}
                    onBack={handleBackFromViews}
                    onSubmitRating={handleSubmitRating}
                />
            );
        }
        
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

        if (detailsCourse) {
            return (
                <CourseDetailsPage
                    course={detailsCourse}
                    onBack={handleBackFromViews}
                    onEnroll={handleEnroll}
                />
            );
        }

        if (viewingCourse) {
            return (
                <CourseView 
                    course={viewingCourse} 
                    onBack={handleBackFromViews} 
                    onStartRating={handleStartRating}
                    isInstructorView={isInstructorView}
                />
            );
        }
        
        if (selectedInstructor) {
            const instructorCourses = coursesData.filter(
                course => course.instructor === selectedInstructor.name
            );
            return (
                <InstructorProfilePage
                    instructor={selectedInstructor}
                    courses={instructorCourses}
                    onCourseClick={handleShowDetails}
                    onBack={() => navigateToPage(PAGE_INSTRUCTORS)}
                />
            );
        }

        switch(currentPage) {
            case PAGE_LOGIN:
                return <LoginPage setCurrentPage={navigateToPage} setIsLoggedIn={setIsLoggedIn} />;
            case PAGE_REGISTER:
                return <RegisterPage setCurrentPage={navigateToPage} setIsLoggedIn={setIsLoggedIn} />;
            case PAGE_INSTRUCTORS:
                return <InstructorsPage onInstructorClick={handleShowInstructorProfile} />;
            case PAGE_FAVORITES:
                return <FavoritesPage onNavigateToHome={() => navigateToPage(PAGE_HOME)} />;
            case PAGE_MY_LEARNING:
                return (
                    <MyLearningPage
                        onCourseClick={handleViewCourseAsStudent}
                        onNavigateToHome={() => navigateToPage(PAGE_HOME)}
                        onShowCertificate={handleShowCertificate}
                    />
                );
            case PAGE_MY_COURSES:
                return (
                    <MyCoursesPage 
                        setSelectedCourse={handleViewCourseAsInstructor}
                        onNavigateToHome={() => navigateToPage(PAGE_HOME)} 
                        onStartEdit={handleStartEdit}
                        onStartAddCourse={handleStartAddCourse}
                    />
                );
            case PAGE_PROFILE:
                return (
                    <ProfilePage 
                        onBack={() => navigateToPage(PAGE_HOME)} 
                    />
                );
            case PAGE_SEARCH_RESULTS:
                return (
                    <SearchResultsPage
                      allCourses={coursesData}
                      query={searchQuery}
                      onCourseClick={handleShowDetails}
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
                                    onClick={() => handleShowDetails(course)}
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
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchSubmit={handleSearchSubmit}
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