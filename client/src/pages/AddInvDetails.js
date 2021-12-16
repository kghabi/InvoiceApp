import React from 'react';
import '../Add.css';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddInvDetails = () => {
  const initialValues = {
    defaultCurrency: '',
    invoiceNotes: '',
  };

  const validationSchema = Yup.object().shape({
    defaultCurrency: Yup.string().required('Currency required'),
    invoiceNotes: Yup.string().min(3).max(40),
  });

  const onSubmit = (data) => {
    axios
      .post('http://localhost:8080/api/settings/invoice_details', data)
      .then((response) => {
        toast.success('Information added successfuly');
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
          <label htmlFor='defaultCurrency'>Default Currency</label>
          <ErrorMessage
            name='defaultCurrency'
            component='div'
            className='errmsg'
          />

          <Field
            type='text'
            id='defaultCurrency'
            name='defaultCurrency'
            placeholder='Add a default currency ...'
          />
          <label htmlFor='invoiceNotes'>Note</label>
          <ErrorMessage
            name='invoiceNotes'
            component='div'
            className='errmsg'
          />

          <Field
            type='text'
            id='invoiceNotes'
            name='invoiceNotes'
            placeholder='Add an note ...'
          />
          <input type='submit' value='Save' />
        </Form>
      </Formik>
    </div>
  );
};

export default AddInvDetails;
