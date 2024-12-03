import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className='container-fluid'>
          <nav className='navbar navbar-expand-lg navbar-dark'>
            <div className='container-fluid'>
              <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to=''>Login</NavLink>
                  </li>
                  {authState === AuthState.Authenticated && (
                    <li className='nav-item'>
                      <NavLink className='nav-link' to='play'>Play</NavLink>
                    </li>
                  )}
                  {authState === AuthState.Authenticated && (
                    <li className='nav-item'>
                      <NavLink className='nav-link' to='scores'>Scores</NavLink>
                    </li>
                  )}
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='about'>About</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main className='container mt-4'>
          <Routes>
            <Route
              path='/'
              element={
                <Login
                  userName={userName}
                  authState={authState}
                  onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                  }}
                />
              }
              exact
            />
            <Route path='/play' element={<Play userName={userName} />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>

        <footer className='bg-dark text-dark text-muted' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
          <span className='text-reset'>Talon Anderson</span>
          <a className='text-reset' href='https://github.com/Talonwayne/startup'>Github</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
