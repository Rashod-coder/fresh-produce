import React, { useState, useEffect } from 'react';
import blub from '../Assets/amy-shamblen-bqjyFm32HDM-unsplash.jpg'
import { auth, db, create} from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import {createUserWithEmailAndPassword, signOut} from "firebase/auth"


// Define a function named login that returns JSX for the login form
function Register() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const keepDatabase = async (e) => {
      e.preventDefault(); 

      try {
      const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword,
          name

      );
      console.log(user.user.uid);
      try {
        await signOut(auth);
        
        console.log("Signed out");
    } catch (error) {
        console.log("error")
    }

      try {
         setDoc(doc(db, "users", user.user.uid), {
            email: registerEmail,
            fullName: name,
            earnings: 0.0
          });

    } catch (e) {
        console.error("Error adding document: ", e);
    } 
      window.alert("Account Created")
      navigate("/Login");
      }
      catch (error) {
        if (error.code === "auth/weak-password") {
            window.alert("Password must be greater than 6 characters.");
        } else if (error.code === "auth/email-already-in-use") {
            window.alert("Email is already in use.");
        } else {
            console.log(error);
        }
    }
  }

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black" style={{background: 'white'}}>
          <span className="h1 fw-bold">Go Green</span>
            <div className="px-5 ms-xl-4 mt-3">
            
                <br/>
                  
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }}>
                <h3 className="fw-normal mb-3 pb-3 text-bold fw-bold" style={{ letterSpacing: '1px'  }}>Register</h3>
                <div className="form-outline mb-5">
                  <input type="email" id="form2Example18" className="form-control form-control-lg" placeholder='Email' onChange={(e) => setRegisterEmail(e.target.value)} />
                </div>
                <div className="form-outline mb-5">
                  <input type="name" id="form2Example18" className="form-control form-control-lg"placeholder='Full name (First & Last)'  onChange={(e) => setName(e.target.value)} />
                </div>
                
                <div className="form-outline mb-5">
                  <input type="password" id="form2Example28" className="form-control form-control-lg" placeholder='Password'  onChange={(e) => setRegisterPassword(e.target.value)} />
                </div>
                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit" onClick={(keepDatabase)}>Register</button>
                </div>
                <p>Already have an account? <a href="/Login" className="link-info">Sign in</a></p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src={blub} alt="Login image" className="w-100 vh-100" style={{ height: '100%', objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register; 
