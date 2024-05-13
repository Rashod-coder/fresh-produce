import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
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
        // If user is not logged in, redirect to Home page
        navigate('/');
        setTimeout(() => {
          window.alert('Must be logged in');
        }, 500);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <h1>Welcome to your dashboard {userName}</h1>
     
      <p>This is the content of your home page.</p>
      {/* Add more content here */}
    </div>
  );
}

export default Home;
