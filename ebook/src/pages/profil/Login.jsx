import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { auth, setAuth } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      axios
        .post('http://localhost:3004/login', {
          email,
          password,
        })
        .then((data) => {
          console.log(data?.data?.accessToken);
          setAuth(data);
        });

      // handle successful login
    } catch (error) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
