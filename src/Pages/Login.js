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
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import Nature from '../Assets/amy-shamblen-bqjyFm32HDM-unsplash.jpg'




function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 



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
          navigate('/Dashboard');
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
    
    <section className="vh-100" style={{ backgroundImage: `url(${Nature})`, backgroundSize: 'cover', backgroundPosition: 'center', marginTop: '-50px'}}>
      
      <br/> <br/> <br/> <br/> 
      <div className="container-fluid mt-5 py-5" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="row">
        <div className="col-lg-12 text-black" style={{ width: '100%', backdropFilter: 'blur(5px)', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px' }}>
            
              <form style={{ width: '23rem' }} onSubmit={login}>
                <h3 className="fw-normal mb-3 pb-3 fw-bold text-center py-4" style={{ letterSpacing: '1px', color: 'white' }}>Login</h3>
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