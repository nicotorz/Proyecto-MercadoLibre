import React, { useState } from 'react';
import './Register.css'; 
import api from '../../services/api';
import NavBar from '../navbar/NavBar';
import {useNavigate} from 'react-router-dom'; 

const Register = ({setLogin}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage]  = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  
  const handleRegister = (e) => {
    e.preventDefault();

    setErrorMessage('');

    api.register(name, email, password, image)
    .then(()=>{
      setLogin(true);
      navigate("/");
    })
    .catch(error => {
      setErrorMessage(error.title || 'Ocurrió un error inesperado');
    })
    setLogin(true);
  };
  
  return (
    <div className="register-body">
      <NavBar />
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="url" placeholder='Image' value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <button type="submit" onClick={handleRegister} className="register-button">Create Account</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
