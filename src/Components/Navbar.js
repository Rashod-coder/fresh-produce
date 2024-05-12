import { auth } from '../Firebase/firebase';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';






function Navbar() {
  const navigate = useNavigate();
  function Logout() {
  
      Cookies.set('loggedIn', false);
      auth.signOut().then(() => {
        window.alert("You have been signed out")
        navigate('/Login');
      }).catch((e) => {
          console.error('ERROR:', e);
      });
  }
    
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/Login">Login</a></li>
                <li><a className="dropdown-item" href="/Register">Register</a></li>
                <li><button className="dropdown-item" onClick={Logout}>Logout</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
