import React, { useEffect, useState } from 'react';
import '../Add.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddInvoice = () => {
  const navigate = useNavigate();
  const [listOfClients, setlistOfClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/clients').then((response) => {
      setlistOfClients(response.data);
    });
  }, []);

  const initialValues = {
    clientName: '',
    invoiceNumber: '',
    currency: '',
    description: '',
    items: '',
    quantity: '',
    price: '',
  };

  const validationSchema = Yup.object().shape({
    clientName: Yup.string().required('Name is required'),
    invoiceNumber: Yup.number().required('Invoice number is required'),
    currency: Yup.string(),
    description: Yup.string(),
    items: Yup.string(),
    quantity: Yup.number().required('Quantity is required').positive(),
    price: Yup.number().required('Price is required').positive(),
  });

  const onSubmit = (data) => {
    axios
      .post('http://localhost:8080/api/invoices', data, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
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
          <label htmlFor='clientName'>Client Name</label>
          <ErrorMessage name='clientName' component='div' className='errmsg' />
          <Field as='select' type='text' id='clientName' name='clientName'>
            {listOfClients.map((value, key) => (
              <option value={value.name}>{value.name}</option>
            ))}
          </Field>
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
            placeholder='Description ...'
          />
          <label htmlFor='items'>Item</label>
          <Field
            type='text'
            id='items'
            name='items'
            placeholder='Add  item ...'
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
