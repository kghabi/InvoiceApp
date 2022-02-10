import React, { useEffect, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../ExpPdf.css';

const ExportPdf = () => {
  const [listOfClients, setlistOfClients] = useState([]);
  const [listOfInvoices, setlistOfInvoices] = useState([]);
  const [listOfOrganisations, setlistOfOrganisations] = useState([]);
  const [selected_invoice, setselected_invoice] = useState(null);

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
    invoiceNumber: '',
    createdAt: '',
  };

  const onSubmit = (data) => {};

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className='container'>
      <form initialValues={initialValues} onSubmit={onSubmit}>
        <Row>
          <Col>
            <Divider>Invoice</Divider>
          </Col>
        </Row>

        <Row gutter={10} style={{ marginTop: 32 }}>
          <Col span={8}>
            {listOfOrganisations.map((value, key) => (
              <div>
                <img
                  className='image'
                  src={`http://localhost:8080/resources/uploads/${value.imageName}`}
                  alt='img not found'
                />
                <h3>
                  <b>{value.organisationName}</b>
                </h3>
                <div>
                  <b>Address:</b> {value.organisationAddress}
                </div>
                <div>
                  <b>Email:</b> {value.organisationEmail}
                </div>
                <div>
                  <b>Phone:</b> {value.organisationPhone}
                </div>
                <div>
                  <b>Fax:</b> {value.organisationFax}
                </div>
                <div>
                  <b>R.Number:</b> {value.organisationRegistrationNumber}
                </div>
                <div>
                  <b>Iban:</b> {value.organisationIban}
                </div>
              </div>
            ))}
          </Col>
          <Col span={8} offset={8}>
            <table>
              <tr>
                <th>Choose Client :</th>
                <td>
                  <select
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setselected_invoice(
                        listOfInvoices.find((el) => el.id === selectedValue)
                      );
                    }}
                  >
                    {listOfInvoices.map((value, key) => (
                      <option value={value.id}>{value.clientName}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <th>Address :</th>
                <td>
                  <div></div>
                </td>
              </tr>
              <tr>
                <th>Email :</th>
                <td>
                  <div>{}</div>
                </td>
              </tr>
              <tr>
                <th>Contact :</th>
                <td>
                  <div>{}</div>
                </td>
              </tr>
              <tr>
                <th>Invoice # :</th>
                <td>
                  <div>
                    {selected_invoice && selected_invoice.invoiceNumber}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Invoice Date :</th>
                <td>
                  <div>
                    {selected_invoice &&
                      selected_invoice.createdAt.substring(0, 10)}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Due Date :</th>
                <td>
                  <div>{date}</div>
                </td>
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
          <div className='container'>
            <table className='customers'>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selected_invoice && selected_invoice.items}</td>
                  <td>{selected_invoice && selected_invoice.description}</td>
                  <td>{selected_invoice && selected_invoice.quantity}</td>
                  <td>{selected_invoice && selected_invoice.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
      </form>
    </div>
  );
};

export default ExportPdf;
