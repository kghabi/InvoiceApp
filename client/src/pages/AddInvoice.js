import React from 'react';
import '../Add.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddInvoice = () => {
  const navigate = useNavigate();

  const initialValues = {
    clientName: '',
    invoiceNumber: '',
    currency: '',
    description: '',
    quantity: '',
    price: '',
  };

  const validationSchema = Yup.object().shape({
    clientName: Yup.string().required('Name is required').min(5).max(20),
    invoiceNumber: Yup.number().required('Invoice number is required'),
    currency: Yup.string(),
    description: Yup.string(),
    quantity: Yup.number().required('Quantity is required').positive(),
    price: Yup.number().required('Price is required').positive(),
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:8080/api/posts', data).then((response) => {
      navigate('/');
    });
  };
  return (
    <div className='Formik'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label htmlFor='clientName'>Name</label>
          <ErrorMessage name='clientName' component='div' className='errmsg' />
          <Field
            type='text'
            id='clientName'
            name='clientName'
            placeholder='Client Name ...'
          />
          <label htmlFor='invoiceNumber'>Invoice Number</label>
          <ErrorMessage
            name='invoiceNumber'
            component='div'
            className='errmsg'
          />
          <Field
            type='number'
            id='invoiceNumber'
            name='invoiceNumber'
            placeholder='Invoice Number ...'
          />
          <label htmlFor='currency'>Currency</label>
          <Field
            type='text'
            id='currency'
            name='currency'
            placeholder='Currency ...'
          />
          <label htmlFor='description'>Description</label>
          <Field
            type='text'
            id='description'
            name='description'
            placeholder='Add a description ...'
          />
          <label htmlFor='quantity'>Quantity</label>
          <ErrorMessage name='quantity' component='div' className='errmsg' />
          <Field
            type='Number'
            id='quantity'
            name='quantity'
            placeholder='Add The Quantity ...'
          />
          <label htmlFor='price'>Price</label>
          <ErrorMessage name='price' component='div' className='errmsg' />
          <Field
            type='Number'
            id='price'
            name='price'
            placeholder='Add The Price ...'
          />
          <input type='submit' value='Save' />
        </Form>
      </Formik>
    </div>
  );
};

export default AddInvoice;
