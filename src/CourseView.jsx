import React, { useState } from 'react';
import './CourseView.css';

const CourseView = ({ course, onBack }) => {
  // Domyślnie aktywna Sekcja 1 i Lekcja 1
  const [activeSection, setActiveSection] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState('lesson1');

  const toggleSection = (section) => {
    // Jeśli klikniesz w tę samą sekcję, zwinie się
    setActiveSection(activeSection === section ? null : section);
  };

  const renderLessonContent = () => {
    switch (selectedLesson) {
      case 'lesson1':
        return (
          <div className="video-frame">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/sLluVHUCMww"
              title="Lekcja 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );

      case 'lesson2':
        return (
          <div className="notes-container">
            <h3>Notatki o kodowaniu</h3>
            <p>W tej lekcji omawiamy podstawy pisania czystego kodu:</p>
            <ul>
              <li>Używaj znaczących nazw zmiennych.</li>
              <li>Unikaj zduplikowanego kodu.</li>
              <li>Stosuj podział na funkcje i moduły.</li>
              <li>Pisz komentarze tylko tam, gdzie są potrzebne.</li>
            </ul>
          </div>
        );

      case 'lesson3':
        return (
          <div className="pdf-container">
            <iframe
              src="/src/pdf/sample.pdf"
              title="PDF z lekcji"
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          </div>
        );

      default:
        return (
          <div className="video-placeholder">
            Wybierz lekcję z prawej strony.
          </div>
        );
    }
  };

  return (
    <div className="course-view-container">
      <div className="course-view-content">
        
        {/* LEWA STRONA — ZAWARTOŚĆ LEKCJI */}
        <div className="video-section">
          {renderLessonContent()}
        </div>

        {/* PRAWA STRONA — SEKCJE */}
        <div className="course-sections">
          <div
            className={`section-title ${activeSection === 1 ? 'active' : ''}`}
            onClick={() => toggleSection(1)}
          >
            Sekcja 1 kursu
          </div>

          {activeSection === 1 && (
            <div className="section-lessons">
              <p
                onClick={() => setSelectedLesson('lesson1')}
                className={selectedLesson === 'lesson1' ? 'active' : ''}
              >
                Lekcja 1
              </p>
              <p
                onClick={() => setSelectedLesson('lesson2')}
                className={selectedLesson === 'lesson2' ? 'active' : ''}
              >
                Lekcja 2
              </p>
              <p
                onClick={() => setSelectedLesson('lesson3')}
                className={selectedLesson === 'lesson3' ? 'active' : ''}
              >
                Lekcja 3
              </p>
              <p>Test z Sekcji</p>
            </div>
          )}

          <div
            className={`section-title ${activeSection === 2 ? 'active' : ''}`}
            onClick={() => toggleSection(2)}
          >
            Sekcja 2 kursu
          </div>

          {activeSection === 2 && (
            <div className="section-lessons">
              <p>Lekcja 1</p>
              <p>Lekcja 2</p>
            </div>
          )}

          <div
            className={`section-title ${activeSection === 3 ? 'active' : ''}`}
            onClick={() => toggleSection(3)}
          >
            Sekcja 3 kursu
          </div>

          {activeSection === 3 && (
            <div className="section-lessons">
              <p>Lekcja 1</p>
            </div>
          )}

          <button className="back-button" onClick={onBack}>
            Powrót
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
