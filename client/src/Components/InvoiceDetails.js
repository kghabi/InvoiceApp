import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

function InvoiceDetails() {
  const [listOfDetails, setlistOfDetails] = useState([]);

  function getList() {
    axios
      .get('http://localhost:8080/api/settings/invoice_details')
      .then((response) => {
        setlistOfDetails(response.data);
      });
  }

  useEffect(() => {
    getList();
  }, []);

  const deleteInvDet = (id) => {
    axios
      .delete(`http://localhost:8080/api/settings/invoice_details/${id}`)
      .then((response) => {
        getList();
        toast.success('Settings was deleted', { icon: '🚀', autoClose: 1000 });
      });
  };

  return (
    <div className='container'>
      <h2 style={{ marginLeft: '10px' }}>Invoices Details</h2>
      <table className='customers'>
        <thead>
          <tr>
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
                <td>{value.defaultCurrency}</td>
                <td>{value.invoiceNotes}</td>
                <td>
                  <button
                    onClick={() =>
                      (window.location.href =
                        '/api/edit_invDetails/' + value.id)
                    }
                  >
                    <AiOutlineForm />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteInvDet(value.id);
                    }}
                  >
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
