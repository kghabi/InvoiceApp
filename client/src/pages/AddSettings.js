import React from 'react';
import axios from 'axios';
import Organisation from '../Components/Organisation';
import { FcDeleteDatabase } from 'react-icons/fc';
import { toast } from 'react-toastify';

const AddSettings = () => {
  const deleteOrg = (e) => {
    axios
      .delete('http://localhost:8080/api/settings/organisation_settings')
      .then((response) => {
        toast.success('All Organisations was deleted', {
          icon: '🚀',
          autoClose: 1000,
        });
      });
  };
  return (
    <div>
      <Organisation />
      <div>
        <button
          style={{ marginLeft: '1100px', position: 'absolute', top: '800px' }}
          onClick={deleteOrg}
        >
          <FcDeleteDatabase size='40px' />
        </button>
        <h6
          style={{ marginLeft: '1030px', position: 'absolute', top: '860px' }}
        >
          Delete All Organisations Settings
        </h6>
      </div>
    </div>
  );
};

export default AddSettings;
