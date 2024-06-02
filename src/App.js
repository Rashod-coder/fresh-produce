import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import { auth } from './Firebase/firebase';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Store from './Pages/Store';
import Settings from './Pages/Settings';
import Sell from './Pages/Sell';
import Footer from './Components/Footer';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Privacy from './Pages/Privacy'





function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="Go Green">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Sell" element={<Sell />} />
          <Route path="/About" element={<About />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Store/:id" element={<Product/>} />
          <Route path="/Privacy" element={<Privacy/>} />

        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
