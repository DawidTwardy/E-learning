import React from 'react';
import './App.css'; 
import './InstructorsPage.css'; 

const instructorsData = [
  { 
    name: "Michał Nowak", 
    avatarSrc: "/src/icon/usericon.png", 
    topCourses: [
      "Pierwszy Najlepiej Oceniany kurs",
      "Drugi Najlepiej Oceniany kurs",
      "Trzeci Najlepiej Oceniany kurs"
    ]
  },
  { 
    name: "Jan Kowalski", 
    avatarSrc: "/src/icon/usericon.png", 
    topCourses: [
      "Pierwszy Najlepiej Oceniany kurs",
      "Drugi Najlepiej Oceniany kurs",
      "Trzeci Najlepiej Oceniany kurs"
    ]
  }
];

const InstructorCard = ({ instructor }) => (
  <div className="instructor-card">
    <div className="instructor-avatar-container">
      <img 
        src={instructor.avatarSrc} 
        alt={`Awatar ${instructor.name}`} 
        className="instructor-avatar" 
      />
    </div>
    
    <h3 className="instructor-name">{instructor.name}</h3>
    
    <div className="instructor-courses">
      {instructor.topCourses.map((course, index) => (
        <p key={index} className="course-list-item">
          {course}
        </p>
      ))}
      <a href="#wszystkie" className="show-all-courses">
        Pokaż Wszystkie kursy
      </a>
    </div>
  </div>
);

const InstructorsPage = () => {
  return (
    <main className="main-content">
      <h2 className="page-title">Instruktorzy</h2> 
      
      <div className="instructor-list">
        {instructorsData.map((instructor, index) => (
          <InstructorCard key={index} instructor={instructor} />
        ))}
      </div>
    </main>
  );
};

export default InstructorsPage;