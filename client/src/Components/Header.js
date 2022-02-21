import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Header.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('Home');
    } else if (location.pathname === '/addclient') {
      setActiveTab('AddClient');
    } else if (location.pathname === '/addinvoice') {
      setActiveTab('AddInvoice');
    } else if (location.pathname === '/settings') {
      setActiveTab('AddSettings');
    } else if (location.pathname === '/exportPdf') {
      setActiveTab('ExportPdf');
    } else if (location.pathname === '/settings/organisation_settings') {
      setActiveTab('AddSettings');
    } else if (location.pathname === '/settings/invoice_details') {
      setActiveTab('AddSettings');
    } else if (location.pathname === '/login') {
      setActiveTab('Login');
    } else if (location.pathname === '/registration') {
      setActiveTab('Registration');
    }
  }, [location]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login/'
  };

  return (
    <div className='header'>
      <p className='logo'> Up Count</p>
      <div className='header-right'>
        {!localStorage.getItem('accessToken') && (
          <>
            <Link className='linkund' to='/login'>
              <p
                className={`${activeTab === 'Login' ? 'active' : ''}`}
                onClick={() => setActiveTab('Login')}
              >
                Login
              </p>
            </Link>
            <Link className='linkund' to='/registration'>
              <p
                className={`${activeTab === 'Registration' ? 'active' : ''}`}
                onClick={() => setActiveTab('Registration')}
              >
                Registration
              </p>
            </Link>
          </>
        )}
        {localStorage.getItem('accessToken') && (
          <>
            <Link className='linkund' to='/'>
              <p
                className={`${activeTab === 'Home' ? 'active' : ''}`}
                onClick={() => setActiveTab('Home')}
              >
                Home
              </p>
            </Link>
            <Link className='linkund' to='/addclient'>
              <p
                className={`${activeTab === 'AddClient' ? 'active' : ''}`}
                onClick={() => setActiveTab('AddClient')}
              >
                Add Client
              </p>
            </Link>
            <Link className='linkund' to='/addinvoice'>
              <p
                className={`${activeTab === 'AddInvoice' ? 'active' : ''}`}
                onClick={() => setActiveTab('AddInvoice')}
              >
                Add Invoice
              </p>
            </Link>
            <Link className='linkund' to='/settings'>
              <p
                className={`${activeTab === 'AddSettings' ? 'active' : ''}`}
                onClick={() => setActiveTab('AddSettings')}
              >
                Settings
              </p>
            </Link>
            <Link className='linkund' to='/exportPdf'>
              <p
                className={`${activeTab === 'ExportPdf' ? 'active' : ''}`}
                onClick={() => setActiveTab('ExportPdf')}
              >
                ExportPdf
              </p>
            </Link>
            <Link to='/'>
              <button
                onClick={logout}
                style={{ margin: '20px', cursor: 'pointer' }}
              >
                Logout
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
