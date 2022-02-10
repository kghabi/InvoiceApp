import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddClient';
import ExportPdf from './pages/ExportPdf';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import Invoice from './pages/AddInvoice';
import AddSettings from './pages/AddSettings';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditClient from './pages/EditClient';
import EditInvoice from './pages/EditInvoice';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/auth/check', {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            {!authState && (
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Registration />} />
              </>
            )}
            {authState && (
              <>
                <Route path='/' exact element={<Home />} />
                <Route path='/addclient' element={<AddEdit />} />
                <Route path='/addinvoice' element={<Invoice />} />
                <Route path='/update/:id' element={<AddEdit />} />
                <Route path='/api/edit_client/:id' element={<EditClient />} />
                <Route path='/api/edit_invoice/:id' element={<EditInvoice />} />
                <Route path='/exportPdf' element={<ExportPdf />} />
                <Route path='/settings' element={<AddSettings />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
