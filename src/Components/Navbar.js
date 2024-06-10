import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase';
import { useNavigate, Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Import the cart icon

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    console.log("Ready")

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

  // Render null if isLoggedIn is null (waiting for authentication check)
  if (isLoggedIn === null) {
    return null;
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark" style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}>
      <div className="container-fluid">
        <a style={{ color: 'white' }} className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span style={{ color: 'white' }} className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <a style={{ color: 'white' }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Produce
                </a>
                <ul className="dropdown-menu" style={{ backgroundColor: 'rgba(206, 235, 239, 0.23)', backdropFilter: 'blur(5px)' }}>
                  <li><a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item" href="/Store">Store</a></li>
                  <li><a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item" href="/Sell">Sell</a></li>
                </ul>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <li className="nav-item">
                <Link style={{ color: 'white' }} className="nav-link" to="/Cart">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </li>
            )}
            <li className="nav-item dropdown">
              <a style={{ color: 'white' }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </a>
              <ul className="dropdown-menu dropdown-menu-end" style={{ backgroundColor: 'rgba(206, 235, 239, 0.23)', backdropFilter: 'blur(5px)' }}>
                {!isLoggedIn ? (
                  <>
                    <li><a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item" href="/Login">Login</a></li>
                    <li><a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item" href="/Register">Register</a></li>
                  </>
                ) : (
                  <>
                    <li><a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item" href="/Dashboard">Dashboard</a></li>
                    <div className="dropdown-divider" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}></div>
                    <li><button className="dropdown-item" onClick={Logout} style={{ color: 'black', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button></li>
                    <li><a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item" href="/Settings">Settings</a></li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
