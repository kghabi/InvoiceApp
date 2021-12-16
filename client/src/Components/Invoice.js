import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';

function Invoice() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts').then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className='container'>
      <h2 style={{ marginLeft: '10px' }}>List Of Invoices</h2>

      <table className='customers'>
        <tr>
          <th>#</th>
          <th>ِClient Name</th>
          <th>Invoice Number</th>
          <th>Currency</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>.</th>
          <th>.</th>
        </tr>
        {listOfPosts.map((value, key) => {
          return (
            <tr>
              <td>{value.id}</td>
              <td>{value.clientName}</td>
              <td>{value.invoiceNumber}</td>
              <td>{value.currency}</td>
              <td>{value.description}</td>
              <td>{value.quantity}</td>
              <td>{value.price}</td>
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
          );
        })}
      </table>
    </div>
  );
}

export default Invoice;
