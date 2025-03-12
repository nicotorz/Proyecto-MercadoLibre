import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './Login.css';
import api from '../../services/api';
import NavBar from "../navbar/NavBar"

const Login = ({setLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // Evita la recarga de la página
        e.preventDefault(); 
        // Limpia mensajes anteriores.
        setErrorMessage('');
        await api.login(email,password)
            .then(() => {
                setLogin(true);
                navigate("/");
            })
            .catch(error => {
                setErrorMessage(error.title || 'Ocurrió un error inesperado')
            })   
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <NavBar />
                <h2 className="login-title">Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            placeholder="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="message">
                    <a href="/register">Create new Account</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
