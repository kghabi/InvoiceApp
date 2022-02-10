import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../Form.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState } = useContext(AuthContext);

  function validateForm() {
    return username.length > 5 && password.length > 5;
  }

  const login = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:8080/auth/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem('accessToken', response.data);
        setAuthState(true);
        navigate('/');
      }
    });
  };
  return (
    <div className='signform'>
      <Form>
        <Form.Group size='lg' controlId='username'>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            autoFocus
            type='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size='lg' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button size='lg' onClick={login} disabled={!validateForm()}>
          Login
        </Button>
        <div className='text-center'>
          <p>
            Not a member? <a href='/registration'>Register</a>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
