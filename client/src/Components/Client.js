import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';

function Client() {
  const [listOfclients, setlistOfClients] = useState([]);
  function getList() {
    axios.get('http://localhost:8080/api/clients').then((response) => {
      setlistOfClients(response.data);
    });
  }
  useEffect(() => {
    getList();
  }, []);

  const deleteClient = (id) => {
    axios
      .delete(`http://localhost:8080/api/clients/${id}`, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        getList();
      });
  };

  return (
    <div className='container'>
      <h2 style={{ marginLeft: '10px' }}>List Of Clients</h2>
      <table className='customers'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact</th>
            <th>WebSite</th>
            <th>.</th>
            <th>.</th>
          </tr>
        </thead>

        {listOfclients.map((value, key) => {
          return (
            <tbody>
              <tr>
                <td>{value.name}</td>
                <td>{value.address}</td>
                <td>{value.email}</td>
                <td>{value.contact}</td>
                <td>
                  <a
                    href={value.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {value.website}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() =>
                      (window.location.href = '/api/edit_client/' + value.id)
                    }
                  >
                    <AiOutlineForm />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteClient(value.id);
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

export default Client;
