import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

function Client() {
  const [listOfPosts, setListOfPosts] = useState([]);
  function getList() {
    axios.get('http://localhost:8080/api/clients').then((response) => {
      setListOfPosts(response.data);
    });
  }
  useEffect(() => {
    getList();
  }, []);

  const deleteClient = (id) => {
    axios.delete(`http://localhost:8080/api/clients/${id}`).then((response) => {
      getList();
      toast.success('Client was deleted', { icon: '🚀', autoClose: 1000 });
    });
  };

  return (
    <div className='container'>
      <h2 style={{ marginLeft: '10px' }}>List Of Clients</h2>
      <table className='customers'>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Contact</th>
          <th>WebSite</th>
          <th>.</th>
          <th>.</th>
        </tr>

        {listOfPosts.map((value, key) => {
          return (
            <tr>
              <td>{value.id}</td>
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
          );
        })}
      </table>
    </div>
  );
}

export default Client;
