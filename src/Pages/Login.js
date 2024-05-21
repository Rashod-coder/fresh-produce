import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from '../Firebase/firebase';
import GoogleButton from 'react-google-button'
import { collection, doc, getDocs, query, setDoc, where, getDoc } from "firebase/firestore";
import Nature from '../Assets/brooke-lark-3A1etBW5cBk-unsplash.jpg'




function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const [msg, setMsg] = useState("");



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user)
        navigate('/Dashboard');
      } else {
        setUser(null);
      }
    });

    
    return () => unsubscribe();
  }, []); 
  const login = async (e) => { 
    e.preventDefault(); 
  
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
        });
      } else {
        console.log("User data retrieval failed: User not found in database");
      }
      
      
      navigate('/Dashboard');
    } catch (error) {
      console.log("Firebase authentication error:", error);
      setMsg("Incorrect login details try again")
      setTimeout(() => {
        setMsg("");
      }, 5000);
    }
  }
    
  
  const handleGoogle = async (e) => {
    e.preventDefault();
    const googleLogin = new GoogleAuthProvider();
    try {
      console.log("Before signInWithPopup");
      const result = await signInWithPopup(auth, googleLogin);
      console.log("After signInWithPopup");
  
      const user = result.user;
  
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef); // Corrected method name
  
      if (!userSnap.exists()) {
        console.log("Before document creation");
        await setDoc(userRef, {
          email: user.email,
          fullName: user.displayName,
          money: 0,
          sales: 0,
          zipCode: 0,
          street: 0,
          state: 0,
          phoneNumber: 0,
          city: 0,
          payPal: 0
        });
        window.alert('Please update your zipcode through account settings')
        console.log("After document creation");
      } else {
        console.log("User already exists in Firestore");
      }
      
      
      navigate('/Dashboard');
    } catch (error) {
      console.error("Error during Google login:", error);
      setMsg("Login with Google failed, please try again.");
      setTimeout(() => {
        setMsg("");
      }, 5000);
    }
  };

  return (
    
    <section className="vh-100" style={{ backgroundImage: `url(${Nature})`, backgroundSize: 'cover', backgroundPosition: 'center', marginTop: '-50px'}}>
      
      <br/> <br/> <br/> <br/> 
      <div className="container-fluid mt-5 py-5" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="row">
        <div className="col-lg-12 text-black" style={{ width: '100%', backdropFilter: 'blur(10px)', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px' }}>
            
              <form style={{ width: '23rem' }} onSubmit={login}>
                <h3 className="fw-normal mb-3 pb-3 fw-bold text-center py-4" style={{ letterSpacing: '1px', color: 'white' }}>Login</h3>
                <h6 className='text-center text-light fw-bold'>{msg}</h6>
                <div className="form-outline mb-4">
                  <input type="email" id="form2Example18" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" required placeholder='Email' />
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="form2Example28" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" required placeholder='Password' />
                </div>
                <div className="pt-1 mb-4">
                  <button style={{width: '100%', borderRadius: '50px', color: 'black'}}onClick={login} className="btn btn-light btn-lg" type="submit">Login</button>
                  <h4 className='py-4 text-center' style={{color:'white'}}>OR</h4>
                  <GoogleButton style={{width: '100%', borderRadius: ''}}onClick={handleGoogle}/>
                </div>
                <p className='text-center text-light'>Don't have an account? <a href="/Register" className="link-info" style={{textDecorationColor:'white'}}>Register here</a></p>
              </form>
            </div>
          </div>
         
        </div>
    </section>
  );
}

export default Login; 