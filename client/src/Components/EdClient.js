import React, { useEffect, useState } from 'react';
import '../Add.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EdClient = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const initialValues = {
    name: '',
    address: '',
    email: '',
    contact: '',
    website: '',
  };

  const [state, setstate] = useState(initialValues);
  const [loading, setloading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(5).max(20),
    address: Yup.string().required('Address is required').min(5).max(40),
    email: Yup.string()
      .email('You must put a valid email')
      .required('Email is required'),
    contact: Yup.string().min(8).max(20).required('Phone is required'),
    website: Yup.string().url(),
  });

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:8080/api/clients/${id}`, data, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        navigate('/');
      });
  };

  useEffect(() => {
    setloading(true);
    axios.get(`http://localhost:8080/api/clients/${id}`).then((response) => {
      setstate(response.data);
      setloading(false);
    });
  }, [id]);

  return loading ? (
    <div>loading ...</div>
  ) : (
    <div className='Formik'>
      <Formik
        initialValues={state}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form style={{ margin: '10px' }}>
          <label htmlFor='name'>Name</label>
          <ErrorMessage name='name' component='div' className='errmsg' />
          <Field
            type='text'
            id='name'
            name='name'
            placeholder='Add a name ...'
          />
          <label htmlFor='address'>Address</label>
          <ErrorMessage name='address' component='div' className='errmsg' />
          <Field
            type='text'
            id='address'
            name='address'
            placeholder='Add a address ...'
          />
          <label htmlFor='email'>Email</label>
          <ErrorMessage name='email' component='div' className='errmsg' />
          <Field
            type='email'
            id='email'
            name='email'
            placeholder='Add email ...'
          />
          <label htmlFor='contact'>Contact</label>
          <ErrorMessage name='contact' component='div' className='errmsg' />
          <Field
            type='number'
            id='contact'
            name='contact'
            placeholder='Add a contact ...'
          />
          <label htmlFor='website'>WebSite</label>
          <ErrorMessage name='website' component='div' className='errmsg' />
          <Field
            type='text'
            id='website'
            name='website'
            placeholder='Add a website ...'
          />
          <input type='submit' value='Save' />
        </Form>
      </Formik>
    </div>
  );
};

export default EdClient;
