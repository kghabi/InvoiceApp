import React from 'react';
import Invoice from '../Components/Invoice';
import Client from '../Components/Client';
import InvoiceDetails from '../Components/InvoiceDetails';

const Home = () => {
  return (
    <div>
      <Client />
      <Invoice />
      <InvoiceDetails />
    </div>
  );
};

export default Home;
