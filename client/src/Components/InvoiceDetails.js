import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';

function InvoiceDetails() {
  const [listOfDetails, setlistOfDetails] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/settings/invoice_details')
      .then((response) => {
        setlistOfDetails(response.data);
      });
  }, []);
  return (
    <div className='container'>
      <h2 style={{ marginLeft: '10px' }}>Invoices Details</h2>
      <table className='customers'>
        <thead>
          <tr>
            <th>#</th>
            <th>Default Currency</th>
            <th>Invoice Notes</th>
            <th>.</th>
            <th>.</th>
          </tr>
        </thead>

        {listOfDetails.map((value, key) => {
          return (
            <tbody>
              <tr>
                <td>{value.id}</td>
                <td>{value.defaultCurrency}</td>
                <td>{value.invoiceNotes}</td>
                <td>
                  <button>
                    <AiOutlineForm />
                  </button>
                </td>
                <td>
                  <button>
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default InvoiceDetails;
