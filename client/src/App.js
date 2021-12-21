import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddClient';
import OrgaSettings from './pages/OrgaSettings';
import ExportPdf from './pages/ExportPdf';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import Invoice from './pages/AddInvoice';
import AddSettings from './pages/AddSettings';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddInvDetails from './pages/AddInvDetails';
import EditClient from './pages/EditClient';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <ToastContainer position='top-center' />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/addclient' element={<AddEdit />} />
          <Route path='/addinvoice' element={<Invoice />} />
          <Route path='/update/:id' element={<AddEdit />} />
          <Route
            path='/settings/organisation_settings'
            element={<OrgaSettings />}
          />
          <Route path='/settings/invoice_details' element={<AddInvDetails />} />
          <Route path='/api/edit_client/:id' element={<EditClient />} />
          <Route path='/exportPdf' element={<ExportPdf />} />
          <Route path='/settings' element={<AddSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
