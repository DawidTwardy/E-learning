import React, { useState } from 'react';
// Zmieniamy import na ujednolicony plik CSS
import './LoginReg.css'; 

// Używamy tego samego komponentu EyeIcon z podanej struktury
const EyeIcon = ({ show, toggle }) => (
    <img 
        src={show ? '/src/icon/eye.png' : '/src/icon/eye-slash.png'} 
        alt={show ? 'Ukryj hasło' : 'Pokaż hasło'}
        className="password-toggle-icon"
        onClick={toggle}
    />
);

const LoginPage = ({ setCurrentPage, setIsLoggedIn }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); 
        
        // --- SYMULACJA LOGOWANIA ---
        if (login === 'test' && password === 'haslo') {
            setIsLoggedIn(true);
            setCurrentPage('home'); 
        } else {
            setError('Błędny Login lub Hasło'); 
        }
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        // Przekierowanie do strony rejestracji
        setCurrentPage('register');
    };
    

    return (
        <main className="login-container">
            <div className="login-content">
                
                {/* Lewa strona - Ilustracja */}
                <div className="login-illustration">
                    <div className="login-illustration-wrapper">
                        {/* Pamiętaj o ustawieniu właściwej ścieżki do pliku obrazka */}
                        <img 
                            src="/src/login/illustration.png" 
                            alt="Bezpieczeństwo konta"
                            className="login-illustration-image"
                        />
                    </div>
                </div>

                {/* Prawa strona - Formularz logowania */}
                <div className="login-form-card">
                    <h2 className="login-title">Zaloguj się</h2>
                    
                    <form onSubmit={handleLogin}>
                        
                        {/* Pole Login */}
                        <div className="form-group">
                            {/* Etykieta widoczna */}
                            <label htmlFor="login">Login</label> 
                            <input 
                                id="login"
                                type="text" 
                                placeholder="Login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                        </div>

                        {/* Pole Hasło */}
                        <div className="form-group">
                            {/* Etykieta widoczna */}
                            <label htmlFor="password">Hasło</label> 
                            <div className="input-container">
                                <input 
                                    id="password"
                                    type={passwordVisible ? 'text' : 'password'} 
                                    placeholder="Hasło"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <EyeIcon 
                                    show={passwordVisible} 
                                    toggle={() => setPasswordVisible(!passwordVisible)} 
                                />
                            </div>
                            
                            {/* Komunikat o błędzie i Przypomnij hasło */}
                            <div className="form-feedback">
                                {error && <span className="error-message">{error}</span>}
                                <a href="#forgot-password" className="forgot-password">Przypomnij hasło</a>
                            </div>
                        </div>

                        {/* Przycisk Zaloguj się */}
                        <button type="submit" className="login-button">Zaloguj się</button>
                    </form>
                    
                    {/* Opcja rejestracji */}
                    <div className="register-option">
                        Nie masz Konta? <a href="#register" className="register-link" onClick={handleRegisterClick}>Zarejestruj się</a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;