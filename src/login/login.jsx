import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/play');
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
              <form onSubmit={(e) => {
                e.preventDefault();
                // Handle login logic here
                onAuthChange(userName, AuthState.Authenticated);
              }}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input type="text" className="form-control" id="username" name="username" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" name="password" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
