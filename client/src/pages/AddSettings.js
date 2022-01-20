import React from 'react';
import { FcOrganization, FcDocument } from 'react-icons/fc';

const AddSettings = () => {
  return (
    <div className='parentContainer'>
      <div>
        <button
          onClick={() =>
            (window.location.href = '/settings/organisation_settings')
          }
        >
          <FcOrganization size='40px' />
        </button>

        <h3>Organisation</h3>
      </div>
    </div>
  );
};

export default AddSettings;
