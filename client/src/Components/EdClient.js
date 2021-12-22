import React, { useEffect, useState } from 'react';
import '../Add.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EdClient = () => {
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
    name: Yup.string().min(5).max(20),
    address: Yup.string().min(5).max(40),
    email: Yup.string().email(),
    contact: Yup.number(),
    website: Yup.string().url(),
  });

  const onSubmit = (data) => {
    axios.put(`http://localhost:8080/api/clients/${id}`, data);
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
        <Form>
          <label htmlFor='name'>Name</label>
          <Field
            type='text'
            id='name'
            name='name'
            placeholder='Add a name ...'
          />
          <label htmlFor='address'>Address</label>
          <Field
            type='text'
            id='address'
            name='address'
            placeholder='Add a address ...'
          />
          <label htmlFor='email'>Email</label>
          <Field
            type='email'
            id='email'
            name='email'
            placeholder='Add email ...'
          />
          <label htmlFor='contact'>Contact</label>
          <Field
            type='number'
            id='contact'
            name='contact'
            placeholder='Add a contact ...'
          />
          <label htmlFor='website'>WebSite</label>
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

export default EdClient;
