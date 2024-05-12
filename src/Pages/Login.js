import React, { useState, useEffect } from 'react';
import blub from './blub.jpg'
import { Link, useNavigate } from 'react-router-dom';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from '../Firebase/firebase';
import GoogleButton from 'react-google-button'
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";



function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [eUser, setEuser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user)
        navigate('/');
      } else {
        setUser(null);
      }
    });

    
    return () => unsubscribe();
  }, []); 
  const login = async (e) => { // Marking login function as async
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
      
      
      navigate('/');
    } catch (error) {
      console.log("Firebase authentication error:", error);
      window.alert("Incorrect Email or Password")
    }
  }
    
  
  const handleGoogle = async (e) => {
    e.preventDefault();
    const googleLogin = new GoogleAuthProvider();
    return signInWithPopup(auth, googleLogin)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User: ", user)

        setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          fullName: result.user.displayName,
          earnings: 0
          
        }, { merge: true }).then(() => {
          console.log("Here");
          console.log(result.user.uid);
          navigate('/');
        });


      })
      .catch((error) => {  
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black" style={{ background: 'white' }}>
            <span className="h1 fw-bold">Go Green!</span>
            <div className="px-5 ms-xl-4 mt-3 py-3"></div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }} onSubmit={login}>
                <h3 className="fw-normal mb-3 pb-3 fw-bold" style={{ letterSpacing: '1px' }}>Login</h3>
                <div className="form-outline mb-4">
                  <input type="email" id="form2Example18" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" required placeholder='Email' />
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="form2Example28" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" required placeholder='Password' />
                </div>
                <div className="pt-1 mb-4">
                  <button onClick={login} className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                  <h4 className='py-1'>OR</h4>
                  <GoogleButton onClick={handleGoogle}/>
                </div>
                <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
                <p>Don't have an account? <a href="/Register" className="link-info">Register here</a></p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src={blub} alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login; 