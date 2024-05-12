import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        console.log("User:", user); 
        if (user.displayName) {
          setUserName(user.displayName);
        } else {
          try {
            const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserName(userData.fullName);
            } else {
              console.log("User document not found in Firestore");
            }
          } catch (error) {
            console.log("Error fetching user data from Firestore:", error);
          }
        }
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <h1>Welcome to your dashboard  {userName ? <p>{userName}!</p> : <p>Guest!</p>} </h1>
     
      <p>This is the content of your home page.</p>
      {/* Add more content here */}
    </div>
  );
}

export default Home;
