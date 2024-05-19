import React, { useState } from 'react';
import { auth, db } from '../Firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

function Settings() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const currentUser = auth.currentUser; // Access currentUser directly from auth
  
    const handleUpdate = async () => {
      if (!currentUser) {
        console.error('User not authenticated.');
        return;
      }
  
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
    //   if (website.trim() !== '') {
    //     updatedUserInfo.website = website;
    //   }
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
        console.log('No fields updated.');
        return;
      }
  
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, updatedUserInfo, { merge: true });
        console.log('User information updated successfully.');
        window.alert('Account information updated');
      } catch (error) {
        console.error('Error updating user information:', error);
      }
    };
  

  return (
    <div className="bg-light-blue" style={{ minHeight: '100vh', backgroundColor: '#8CBCE0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12">
            <div className="card custom-shadow p-5">
              <h2 className="mb-4 text-center">Account Settings</h2>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control form-control-lg" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="eMail" className="form-label">Bio</label>
                  <input type="email" className="form-control form-control-lg" id="eMail" placeholder="Bio about you to display on listings" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control form-control-lg" id="phone" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="website" className="form-label">Bank Info</label>
                  <input type="url" className="form-control form-control-lg" id="website" placeholder="Paypal" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="Street" className="form-label">Street</label>
                  <input type="name" className="form-control form-control-lg" id="Street" placeholder="Enter Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="ciTy" className="form-label">City</label>
                  <input type="name" className="form-control form-control-lg" id="ciTy" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="sTate" className="form-label">State</label>
                  <input type="text" className="form-control form-control-lg" id="sTate" placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="zIp" className="form-label">Zip Code</label>
                  <input type="text" className="form-control form-control-lg" id="zIp" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>
                <div className="col-12">
                  <div className="text-center">
                    <button type="button" id="submit" name="submit" className="btn btn-secondary me-2">Cancel</button>
                    <button type="button" id="submit" name="submit" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                  </div>
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
