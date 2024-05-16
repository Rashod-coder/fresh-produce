import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  function Logout() {
    auth.signOut().then(() => {
      window.alert("You have been signed out")
      navigate('/Login');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });



  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark" style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}>
      <div className="container-fluid">
        <a style={{ color: 'white' }} className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span style={{color: 'white'}}className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            
            <li className="nav-item dropdown">
              <a style={{ color: 'white' }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </a>
              <ul className="dropdown-menu">
                {!isLoggedIn && (
                  <>
                    <li><a style={{ color: 'white' }} className="dropdown-item" href="/Login">Login</a></li>
                    <li><a style={{ color: 'white' }} className="dropdown-item" href="/Register">Register</a></li>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <li><a style={{ color: 'black' }} className="dropdown-item" href="/Dashboard">Dashboard</a></li>
                    <div className="dropdown-divider"></div>
                    <li><button className="dropdown-item" onClick={Logout}>Logout</button></li>
                    <li><a style={{ color: 'black' }} className="dropdown-item" href="/Settings">Settings</a></li>
                  </>
                )}
              </ul>
            </li>

            {isLoggedIn && (
              <li className="nav-item dropdown">
                <a style={{ color: 'white' }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul className="dropdown-menu">
                  <li><a style={{ color: 'black' }} className="dropdown-item" href="/Store">Store</a></li>
                  <li><a style={{ color: 'black' }} className="dropdown-item" href="/Sell">Sell</a></li>
                 
                  
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
