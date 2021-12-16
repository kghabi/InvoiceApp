import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';

function Client() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/clients').then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
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
                <a href={value.website} target='_blank' rel="noopener noreferrer">
                  {value.website}
                </a>
              </td>
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

export default Client;