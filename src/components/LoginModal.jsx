// src/components/LoginModal.jsx
import React, { useState } from 'react';
import '../styles/LoginModal.css';
import { registerUser, loginUser } from '../api.js'

export default function LoginModal({ onClose, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !name)) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      let userData;

      if (isRegistering) {
        userData = await registerUser(name, email, password);
      } else {
        userData = await loginUser(email, password);
      }

      onLogin(userData);
      setErrorMessage('');  // Clear previous error messages

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content pixel-font">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="yellow">{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="modal-input"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="modal-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="modal-input"
          />
          <button type="submit" className="modal-submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="toggle-mode faded-yellow" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
        </p>
      </div>
    </div>
  );
}
