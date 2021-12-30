import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

function Invoice() {
  const [listOfPosts, setListOfPosts] = useState([]);

  function getList() {
    axios.get('http://localhost:8080/api/posts').then((response) => {
      setListOfPosts(response.data);
    });
  }
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts').then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const deleteInvoice = (id) => {
    axios.delete(`http://localhost:8080/api/posts/${id}`).then((response) => {
      getList();
      toast.success('Invoice was deleted', { icon: '🚀', autoClose: 1000 });
    });
  };

  return (
    <div className='container'>
      <h2 style={{ marginLeft: '10px' }}>List Of Invoices</h2>

      <table className='customers'>
        <thead>
          <tr>
            <th>ِClient Name</th>
            <th>Invoice Number</th>
            <th>Currency</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>.</th>
            <th>.</th>
          </tr>
        </thead>
        {listOfPosts.map((value, key) => {
          return (
            <tbody>
              <tr>
                <td>{value.clientName}</td>
                <td>{value.invoiceNumber}</td>
                <td>{value.currency}</td>
                <td>{value.description}</td>
                <td>{value.quantity}</td>
                <td>{value.price}</td>
                <td>
                  <button
                    onClick={() =>
                      (window.location.href = '/api/edit_invoice/' + value.id)
                    }
                  >
                    <AiOutlineForm />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteInvoice(value.id);
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

export default Invoice;
