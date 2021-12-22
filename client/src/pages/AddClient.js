import React from 'react';
import '../Add.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddClient = () => {
  const initialValues = {
    name: '',
    address: '',
    email: '',
    contact: '',
    website: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('You must input a name').min(5).max(20),
    address: Yup.string()
      .required('You must input a valid address')
      .min(5)
      .max(40),
    email: Yup.string().email(),
    contact: Yup.number().required('You must input a phone number'),
    website: Yup.string().url(),
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:8080/api/clients', data);
  };

  return (
    <div className='Formik'>
      <Formik
        initialValues={initialValues}
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
            placeholder='Client Name ...'
          />
          <label htmlFor='address'>Address</label>
          <ErrorMessage name='address' component='div' className='errmsg' />
          <Field
            type='text'
            id='address'
            name='address'
            placeholder='Add an address ...'
          />
          <label htmlFor='email'>Email</label>
          <Field
            type='email'
            id='email'
            name='email'
            placeholder='Add a email ...'
          />
          <label htmlFor='contact'>Contact</label>
          <ErrorMessage name='contact' component='div' className='errmsg' />
          <Field
            type='number'
            id='contact'
            name='contact'
            placeholder='Add a phone number ...'
          />
          <label htmlFor='website'>WebSite</label>
          <ErrorMessage name='website' component='div' className='errmsg' />
          <Field
            type='text'
            id='website'
            name='website'
            placeholder='Add a website ...'
          />
          <input
            type='submit'
            value='Save'
            onClick={() => (window.location.href = '/')}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default AddClient;
