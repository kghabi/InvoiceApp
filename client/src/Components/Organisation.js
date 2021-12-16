import React, { useState } from 'react';
import axios from 'axios';
import '../Add.css';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Organisation = () => {
  const initialValues = {
    organisationName: '',
    organisationAddress: '',
    organisationEmail: '',
    organisationPhone: '',
    organisationFax: '',
    organisationRegistrationNumber: '',
    organisationIban: '',
    organisationCommission: '',
    organisationTva: '',
  };

  const validationSchema = Yup.object().shape({
    organisationName: Yup.string()
      .required('You must input a name')
      .min(5)
      .max(30),
    organisationAddress: Yup.string()
      .required('You must input a valid address')
      .min(5)
      .max(40),
    organisationEmail: Yup.string().email().required('email is required'),
    organisationPhone: Yup.number().required('You must put a phone number'),
    organisationFax: Yup.number().required('You must put a fax number'),
    organisationRegistrationNumber: Yup.string().required(
      'Registration number required'
    ),
    organisationIban: Yup.string(),
    organisationCommission: Yup.string(),
    organisationTva: Yup.string(),
  });

  const [state, setstate] = useState({});
  const onSubmit = () => {
    let data = new FormData();
    data.append('file', state);

    axios
      .post('http://localhost:8080/api/settings/organisation_settings', data)
      .then((response) => {
        toast.success('Organisation settings added successfuly');
      });
  };

  return (
    <div className='organform'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label for='userfile'>Upload file:</label>
          <input
            type='file'
            name='file'
            id='input-files'
            onChange={(e) => {
              let file = e.target.files[0];
              setstate(file);
            }}
          />
          <br />

          <label htmlFor='organisationName'>Name</label>
          <ErrorMessage
            name='organisationName'
            component='div'
            className='errmsg'
          />
          <Field
            type='text'
            id='organisationName'
            name='organisationName'
            placeholder='Add a name ...'
          />
          <label htmlFor='organisationAddress'>Address</label>
          <ErrorMessage
            name='organisationAddress'
            component='div'
            className='errmsg'
          />
          <Field
            type='text'
            id='organisationAddress'
            name='organisationAddress'
            placeholder='Add an address ...'
          />
          <label htmlFor='organisationEmail'>Email</label>
          <ErrorMessage
            name='organisationEmail'
            component='div'
            className='errmsg'
          />
          <Field
            type='email'
            id='organisationEmail'
            name='organisationEmail'
            placeholder='Add a email ...'
          />
          <label htmlFor='organisationPhone'>Phone</label>
          <ErrorMessage
            name='organisationPhone'
            component='div'
            className='errmsg'
          />
          <Field
            type='number'
            id='organisationPhone'
            name='organisationPhone'
            placeholder='Add a phone number ...'
          />
          <label htmlFor='organisationFax'>Fax</label>
          <ErrorMessage
            name='organisationFax'
            component='div'
            className='errmsg'
          />
          <Field
            type='number'
            id='organisationFax'
            name='organisationFax'
            placeholder='Add a fax number ...'
          />
          <label htmlFor='organisationRegistrationNumber'>
            Registration Number
          </label>
          <ErrorMessage
            name='organisationRegistrationNumber'
            component='div'
            className='errmsg'
          />
          <Field
            type='text'
            id='organisationRegistrationNumber'
            name='organisationRegistrationNumber'
            placeholder='Add a registration number ...'
          />

          <label htmlFor='organisationIban'>Iban Number</label>
          <Field
            type='text'
            id='organisationIban'
            name='organisationIban'
            placeholder='Add a valid iban number ...'
          />
          <label htmlFor='organisationCommission'>Commission</label>
          <Field
            type='text'
            id='organisationCommission'
            name='organisationCommission'
            placeholder='Add a commission ...'
          />
          <label htmlFor='organisationTva'>TVA</label>
          <Field
            type='text'
            id='organisationTva'
            name='organisationTva'
            placeholder='Add a tva ...'
          />
          <input type='submit' value='Save' />
        </Form>
      </Formik>
    </div>
  );
};

export default Organisation;
