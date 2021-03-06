import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../Form.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Registration() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return username.length > 5 && password.length > 3;
  }

  const registration = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:8080/auth', data).then((response) => {
      toast.info(response.data, { autoClose: 1000 });
      navigate('/login');
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
        <Button
          className='bt'
          size='lg'
          disabled={!validateForm()}
          onClick={registration}
        >
          Registration
        </Button>
      </Form>
    </div>
  );
}

export default Registration;
