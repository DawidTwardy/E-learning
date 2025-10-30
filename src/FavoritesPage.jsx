import React, { useState } from 'react';
import './App.css'; 
import './Favorites.css';

// --- DANE ULUBIONYCH KURSÓW ---
const initialFavoritesData = [
  // Dodajemy pole iconColor, ponieważ jest używane w CourseCard
  { id: 1, title: "Kurs Nauki SQL", instructor: "Michał Nowak", rating: 4, imageSrc: "/src/course/placeholder_sql.png", iconColor: "#007BFF" },
  { id: 2, title: "Kurs Pythona", instructor: "Jan Kowalski", rating: 4.5, imageSrc: "/src/course/placeholder_python.png", iconColor: "#FFC107" },
  { id: 3, title: "Kurs AI", instructor: "Michał Nowak", rating: 4, imageSrc: "/src/course/placeholder_ai.png", iconColor: "#8A2BE2" },
];

// --- KOMPONENTY KART KURSÓW ---

const FavoriteHeart = ({ courseId, onRemove }) => {
  const [isFavorite, setIsFavorite] = useState(true);

  const toggleFavorite = () => {
    if (isFavorite) {
      onRemove(courseId); 
    }
    setIsFavorite(false); 
  };
  
  const heartSrc = isFavorite 
    ? '/src/course/heart.png' 
    : '/src/course/heart-outline.png'; 

  return (
    <img 
      src={heartSrc} 
      className="filled-heart"
      onClick={toggleFavorite}
      alt="Usuń z ulubionych"
      // Używam fallbacków dla obrazków, aby zapobiec błędom ładowania
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/333/fff?text=H' }}
      style={{ opacity: isFavorite ? 1 : 0.6 }} 
    />
  );
};

const StarRating = ({ rating }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    let starImageSrc = "/src/rating-star/star-empty.png"; 

    if (i <= rating) {
      starImageSrc = "/src/rating-star/star-full.png";
    } else if (i - 0.5 === rating) {
      starImageSrc = "/src/rating-star/star-half.png";
    }
    
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

const CourseCard = ({ course, onRemove }) => (
  <div className="course-card">
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
    
    <FavoriteHeart courseId={course.id} onRemove={onRemove} />
    
    <div className="card-info">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-instructor">{course.instructor}</p>
      <StarRating rating={course.rating} /> 
    </div>
  </div>
);

// --- ZMODYFIKOWANY KOMPONENT: PUSTA LISTA ULUBIONYCH ---
// Przyjmuje prop 'onNavigateToHome', usuwa alert().
const EmptyFavoritesMessage = ({ onNavigateToHome }) => {
  
  const handleBrowseClick = () => {
    // Wywołanie funkcji nawigacji przekazanej z komponentu nadrzędnego
    if (onNavigateToHome) {
      onNavigateToHome();
    }
  };

  return (
    <div className="empty-favorites-container">
      <h3 className="empty-favorites-title">Aktualnie nie Masz żadnych Polubionych Kursów</h3>
      <div className="empty-favorites-icon-wrapper">
        <img 
            src="/src/NoCourse.png" 
            alt="Brak ulubionych kursów"
            className="nocourse-icon-image"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/250x250/242424/FFFFFF?text=Brak+Kursów' }}
        />
      </div>
      <button 
        className="browse-courses-button"
        onClick={handleBrowseClick}
      >
        Przeglądaj kursy
      </button>
    </div>
  );
};


// --- KOMPONENT GŁÓWNY PODSTRONY ULUBIONE ---
// Przyjmuje prop 'onNavigateToHome'.
const FavoritesPage = ({ onNavigateToHome }) => {
  // UWAGA: Zmień na useState([]) aby przetestować widok pustej listy!
  const [favorites, setFavorites] = useState(initialFavoritesData); 

  const removeFavorite = (idToRemove) => {
    setTimeout(() => {
      setFavorites(prevFavorites => 
        prevFavorites.filter(course => course.id !== idToRemove)
      );
    }, 300); 
  };

  return (
    <main className="main-content">
      <h2 className="section-title">Twoje Polubione kursy</h2>
      
      {/* LOGIKA WYŚWIETLANIA */}
      {favorites.length > 0 ? (
        <div className="courses-list">
          {favorites.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onRemove={removeFavorite} 
            />
          ))}
        </div>
      ) : (
        // Przekazanie funkcji nawigacji do komponentu wiadomości
        <EmptyFavoritesMessage onNavigateToHome={onNavigateToHome} />
      )}
    </main>
  );
};

export default FavoritesPage;
