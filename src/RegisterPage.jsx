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

const RegisterPage = ({ setCurrentPage, setIsLoggedIn }) => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        setError(''); 
        
        // --- SYMULACJA REJESTRACJI ---
        if (login && email && password.length >= 6) {
            console.log(`Zarejestrowano użytkownika: ${login}, Email: ${email}`);
            alert("Rejestracja przebiegła pomyślnie! Przekierowanie do logowania.");
            setCurrentPage('login');

        } else if (password.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków.');
        } else {
            setError('Proszę wypełnić wszystkie pola.');
        }
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        setCurrentPage('login');
    };
    
    return (
        <main className="login-container">
            <div className="login-content">
                
                {/* Lewa strona - Ilustracja Rejestracji */}
                <div className="login-illustration">
                    <div className="login-illustration-wrapper">
                        {/* Ustaw ścieżkę do obrazka rejestracji */}
                        <img 
                            src="/src/register/illustration.png" 
                            alt="Rejestracja konta"
                            className="login-illustration-image"
                        />
                    </div>
                </div>

                {/* Prawa strona - Formularz rejestracji */}
                <div className="login-form-card">
                    <h2 className="login-title">Zarejestruj się</h2>
                    
                    <form onSubmit={handleRegister}>
                        
                        {/* Pole Login */}
                        <div className="form-group">
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

                        {/* Pole Email */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Pole Hasło */}
                        <div className="form-group">
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
                            
                            {/* Komunikat o błędzie (bez linku 'Przypomnij hasło') */}
                            <div className="form-feedback">
                                {error && <span className="error-message">{error}</span>}
                            </div>
                        </div>

                        {/* Przycisk Zarejestruj się */}
                        <button type="submit" className="login-button">Zarejestruj się</button>
                    </form>
                    
                    {/* Opcja logowania */}
                    <div className="register-option">
                        Masz już Konto? <a href="#login" className="register-link" onClick={handleLoginClick}>Zaloguj się</a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;