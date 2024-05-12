import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Navbar from './Components/Navbar'




function App() {
  return (
    <div className="Go Green">
      <Navbar/>
      <Router>
     <Routes>
         
     <Route path="/Login" element={<Login />} />
     <Route path="/Register" element={<Register />} />
     <Route path="/" element={<Home />} />
          
     </Routes>
     </Router>
    </div>
  );
}

export default App;

