import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';

import './login.css';

export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  const handlePlayClick = () => {
    navigate('/play');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userName', userName);
        onAuthChange(userName, AuthState.Authenticated);
      } else {
        const errorData = await response.json();
        setDisplayError(`⚠ Error: ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setDisplayError('An error occurred during login.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Registration successful!');
      } else {
        const errorData = await response.json();
        setDisplayError(`⚠ Error: ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setDisplayError('An error occurred during registration.');
    }
  };

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="container">
        <h1 className="text-center mt-4">Ultimate Tic Tac Toe</h1>

        {authState === AuthState.Authenticated ? (
          <div className="mt-4">
            <h1>Welcome to Ultimate Tic Tac Toe</h1>
            <button className="btn btn-success" onClick={handlePlayClick}>Play</button>
            <button className="btn btn-danger" onClick={() => onAuthChange(userName, AuthState.Unauthenticated)}>Logout</button>
          </div>
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input type="text" className="form-control" id="username" name="username" value={userName} readOnly required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleRegister}>Register</button>
              </form>
              {displayError && <div className="alert alert-danger mt-3">{displayError}</div>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
