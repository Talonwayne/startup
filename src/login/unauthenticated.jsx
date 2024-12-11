import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './unauthenticated.css';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const navigate = useNavigate();

  async function loginUser() {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
      navigate('/play'); // Redirect to the play page after successful login
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  async function createUser() {
    const response = await fetch('/api/auth/create', {
      method: 'POST',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
      navigate('/play'); // Redirect to the play page after successful creation
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <div className="login-container">
      <input
        type='text'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder='Username'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <Button variant='primary' onClick={loginUser}>
        Login
      </Button>
      <Button variant='secondary' onClick={createUser}>
        Create Account
      </Button>
      {displayError && <div className="error">{displayError}</div>}
    </div>
  );
}
