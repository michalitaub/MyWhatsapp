import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const url = 'http://localhost:8080/users/login';
    const loginData = { username, email };

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (resp.ok) {
      const data = await resp.json();
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('full_name', data.full_name);
      navigate('/homePage')
      // window.location.href = './homePage.html';
    } else {
      const errorData = await resp.json();
      alert(errorData.message);
    }
  };

  return (
    <div className='container'>
      <div>
        User Name:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default Login;