import React from 'react';
import './App.css';
import './SearchResultsPage.css';
import { CourseCard } from './App.jsx';

const SearchResultsPage = ({ allCourses, query, onCourseClick }) => {
  const filteredCourses = allCourses.filter(course => 
    course.title.toLowerCase().includes(query.toLowerCase()) ||
    course.instructor.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="main-content">
      <h2 className="page-title">
        Wyniki wyszukiwania dla: <span className="search-query-highlight">"{query}"</span>
      </h2>
      
      {filteredCourses.length > 0 ? (
        <div className="courses-list">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course}
              onClick={() => onCourseClick(course)}
              showInstructor={true}
              showFavoriteButton={true}
            />
          ))}
        </div>
      ) : (
        <div className="no-results-container">
          <p>Brak wyników pasujących do Twojego wyszukiwania.</p>
        </div>
      )}
    </main>
  );
};

export default SearchResultsPage;