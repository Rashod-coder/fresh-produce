import React, { useState, useEffect } from 'react';
import { auth, db, create} from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import {createUserWithEmailAndPassword, signOut} from "firebase/auth"
import Nature from '../Assets/brooke-lark-3A1etBW5cBk-unsplash.jpg'


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
            earnings: 0.0,
            sales: 0,
            money: 0,
            zipCode: 0,
            address: "placeholder",
            state: 'placeholder',
            phoneNumber: 0
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
            window.alert(error);
        }
    }
  }

  return (
    <section className="vh-100" style={{ backgroundImage: `url(${Nature})`, backgroundSize: 'cover', backgroundPosition: 'center', marginTop: '-50px'}}>
      <br/><br/><br/>
      <div className="container-fluid mt-5 py-5" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="row">
          
        <div className="col-lg-12 text-black" style={{ width: 'auto', backdropFilter: 'blur(5px)', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
            
            <div className="d-flex align-items-center">
              <form style={{ width: '23rem' }}>
                <h3 className="fw-normal mb-3 pb-3 text-bold fw-bold text-center mt-4 text-light" style={{ letterSpacing: '1px'  }}>Register</h3>
                <div className="form-outline mb-5">
                  <input style={{borderRadius: '20px'}}type="email" id="form2Example18" className="form-control form-control-lg" placeholder='Email' onChange={(e) => setRegisterEmail(e.target.value)} />
                </div>
                <div className="form-outline mb-5">
                  <input style={{borderRadius: '20px'}} type="name" id="form2Example18" className="form-control form-control-lg"placeholder='Full name (First & Last)'  onChange={(e) => setName(e.target.value)} />
                </div>
                
                <div className="form-outline mb-5">
                  <input style={{borderRadius: '20px'}} type="password" id="form2Example28" className="form-control form-control-lg" placeholder='Password'  onChange={(e) => setRegisterPassword(e.target.value)} />
                </div>
                <div className="pt-1 mb-4">
                  <button style={{width:'100%'}}className="btn btn-light btn-lg btn-block" type="submit" onClick={(keepDatabase)}>Register</button>
                </div>
                <p className='text-light'>Already have an account? <a href="/Login" className="link-info">Sign in</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register; 
