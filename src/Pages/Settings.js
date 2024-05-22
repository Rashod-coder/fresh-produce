import React, { useState } from 'react';
import { auth, db } from '../Firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const encryptionKey = 'FXsaNKzW0gSVv3yTP9mtYZJEpe28RlkL';

function Settings() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [payPal, setPay] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const currentUser = auth.currentUser; 
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const updatedUserInfo = {};

    if (fullName.trim() !== '') {
      updatedUserInfo.fullName = fullName;
    }
    if (email.trim() !== '') {
      updatedUserInfo.email = email;
    }
    if (phone.trim() !== '') {
      updatedUserInfo.phoneNumber = phone;
    }
    if (payPal.trim() !== '') {
      updatedUserInfo.payPal = payPal;
    }
    if (street.trim() !== '') {
      updatedUserInfo.street = street;
    }
    if (city.trim() !== '') {
      updatedUserInfo.city = city;
    }
    if (state.trim() !== '') {
      updatedUserInfo.state = state;
    }
    if (zipCode.trim() !== '') {
      updatedUserInfo.zipCode = zipCode;
    }

    if (Object.keys(updatedUserInfo).length === 0) {
      window.alert('All fields left blank. Please enter at least one field to update account information.');
      return;
    }

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, updatedUserInfo, { merge: true });
      console.log('User information updated successfully.');
      window.alert('Account information updated');
    } catch (error) {
      console.error('Error updating user information:', error);
      window.alert('Failed to update account information. Please try again later.');
    }
  };
  

  return (
    <div className="bg-light-blue" style={{ minHeight: '100vh', backgroundColor: '#F0F4F8', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container py-5">
        <h2 className="mb-4 text-center">Account Settings</h2>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12">
            <p className="text-center mb-4">Update your account settings here your data is encrypted</p>
            <div className="card p-4" style={{ backgroundColor: '#FFFFFF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="eMail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="eMail" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="website" className="form-label">Paypal</label>
                  <input type="url" className="form-control" id="website" placeholder="Enter paypal email" value={payPal} onChange={(e) => setPay(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="street" className="form-label">Street</label>
                  <input type="text" className="form-control" id="street" placeholder="Enter street" value={street} onChange={(e) => setStreet(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">City</label>
                  <input type="text" className="form-control" id="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">State</label>
                  <input type="text" className="form-control" id="state" placeholder="Enter state" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="col-md-2">
                  <label htmlFor="zipCode" className="form-label">Zip Code</label>
                  <input type="text" className="form-control" id="zipCode" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>
                <div className="col-12">
                  <button type="button" className="btn btn-primary mt-3" onClick={handleUpdate}>Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
