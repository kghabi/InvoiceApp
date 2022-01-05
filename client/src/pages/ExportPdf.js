import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Col, Divider, Row, Table } from 'antd';
import * as Yup from 'yup';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../ExpPdf.css';

const ExportPdf = () => {
  const [listOfClients, setlistOfClients] = useState([]);
  const [listOfInvoices, setlistOfInvoices] = useState([]);
  const [listOfOrganisations, setlistOfOrganisations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/clients').then((response) => {
      setlistOfClients(response.data);
    });
    axios.get('http://localhost:8080/api/invoices').then((response) => {
      setlistOfInvoices(response.data);
    });
    axios
      .get('http://localhost:8080/api/settings/organisation_settings')
      .then((response) => {
        setlistOfOrganisations(response.data);
      });
  }, []);

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
    imageName: '',
  };

  const onSubmit = (data) => {};

  return (
    <div className='container'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Row>
            <Col>
              <Divider>Invoice</Divider>
            </Col>
          </Row>

          <Row gutter={10} style={{ marginTop: 32 }}>
            <Col span={8}>
              <Field
                as='select'
                type='text'
                id='organisationName'
                name='organisationName'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationName}>
                    {value.organisationName}
                  </option>
                ))}
              </Field>
              <Field
                as='select'
                type='text'
                id='organisationAddress'
                name='organisationAddress'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationAddress}>
                    {value.organisationAddress}
                  </option>
                ))}
              </Field>
              <Field
                as='select'
                type='text'
                id='organisationEmail'
                name='organisationEmail'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationEmail}>
                    {value.organisationEmail}
                  </option>
                ))}
              </Field>
              <Field
                as='select'
                type='text'
                id='organisationPhone'
                name='organisationPhone'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationPhone}>
                    {value.organisationPhone}
                  </option>
                ))}
              </Field>
              <Field
                as='select'
                type='text'
                id='organisationFax'
                name='organisationFax'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationFax}>
                    {value.organisationFax}
                  </option>
                ))}
              </Field>
              <Field
                as='select'
                type='text'
                id='organisationRegistraionNumber'
                name='organisationRegistraionNumber'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationRegistraionNumber}>
                    {value.organisationRegistraionNumber}
                  </option>
                ))}
              </Field>
              <Field
                as='select'
                type='text'
                id='organisationIban'
                name='organisationIban'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationIban}>
                    {value.organisationIban}
                  </option>
                ))}
              </Field>
              <Field
                as='select'
                type='text'
                id='organisationCommission'
                name='organisationCommission'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationCommission}>
                    {value.organisationCommission}
                  </option>
                ))}
              </Field>
              <Field
                as='select'
                type='text'
                id='organisationTva'
                name='organisationTva'
              >
                {listOfOrganisations.map((value, key) => (
                  <option value={value.organisationTva}>
                    {value.organisationTva}
                  </option>
                ))}
              </Field>
              
            </Col>
            <Col span={8} offset={8}>
              <table>
                <tr>
                  <th>Invoice # :</th>
                  <td>1</td>
                </tr>
                <tr>
                  <th>Invoice Date :</th>
                  <td>10-01-2018</td>
                </tr>
                <tr>
                  <th>Due Date :</th>
                  <td>10-01-2018</td>
                </tr>
              </table>
            </Col>
          </Row>

          <Row style={{ marginTop: 48 }}>
            <div>
              Bill To: <strong>Strides Shasun Ltd</strong>
            </div>
            <div>Bannerghatt Road,</div>
            <div>Bangalore - 560076</div>
          </Row>

          <Row style={{ marginTop: 48 }}>
            <Table
              dataSource={[
                {
                  id: 1,
                  name: 'Accommodation (Single Occupancy)',
                  description: 'Accommodation',
                  price: 1599,
                  quantity: 1,
                },
              ]}
              pagination={false}
            >
              <Table.Column title='Items' dataIndex='name' />
              <Table.Column title='Description' dataIndex='description' />
              <Table.Column title='Quantity' dataIndex='quantity' />
              <Table.Column title='Price' dataIndex='price' />
              <Table.Column title='Line Total' />
            </Table>
          </Row>

          <Row style={{ marginTop: 48 }}>
            <Col span={8} offset={16}>
              <table>
                <tr>
                  <th>Gross Total :</th>
                  <td>Rs. 1599</td>
                </tr>
                <tr>
                  <th>IGST @6% :</th>
                  <td>Rs. 95.94</td>
                </tr>
                <tr>
                  <th>CGST @6% :</th>
                  <td>Rs. 95.94</td>
                </tr>
                <tr>
                  <th>Nett Total :</th>
                  <td>Rs. 1790.88</td>
                </tr>
              </table>
            </Col>
          </Row>

          <Row style={{ marginTop: 48, textAlign: 'center' }}>notes</Row>

          <Row style={{ marginTop: 48, textAlign: 'center' }}>Footer</Row>
        </Form>
      </Formik>
    </div>
  );
};

export default ExportPdf;
