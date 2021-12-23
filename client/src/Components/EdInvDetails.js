import React, { useEffect, useState } from 'react';
import '../Add.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EdInvDetails = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const initialValues = {
    defaultCurrency: '',
    invoiceNotes: '',
  };

  const [state, setstate] = useState(initialValues);
  const [loading, setloading] = useState(false);

  const validationSchema = Yup.object().shape({
    defaultCurrency: Yup.string().required('Currency required'),
    invoiceNotes: Yup.string().min(3).max(40),
  });

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:8080/api/settings/invoice_details/${id}`, data)
      .then((response) => {
        navigate('/');
      });
  };

  useEffect(() => {
    setloading(true);
    axios
      .get(`http://localhost:8080/api/settings/invoice_details/${id}`)
      .then((response) => {
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

export default EdInvDetails;
