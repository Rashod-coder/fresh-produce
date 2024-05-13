import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
          navigate('/');
          setTimeout(() => {
            window.alert('Must be logged in');
          }, 500);
        }
      });

      const currentTime = new Date().getHours();
      if (currentTime >= 5 && currentTime < 12) {
        setGreeting('Good morning, ');
      } else if (currentTime >= 12 && currentTime < 18) {
        setGreeting('Good afternoon, ');
      } else {
        setGreeting('Good evening, ');
      }

      // Simulate loading for 5 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => unsubscribe();
    };

    fetchData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh', background: 'black'}}>
        <div className="spinner-border" style={{ width: '3rem', height: '3rem', color:'white' }} role="status">
          <span className="sr-only"></span>
        </div>
        <div></div>
      </div>
      
    );
  }

  return (
    <div style={{ backgroundColor: 'white', color: 'white', minHeight: '100vh' }}>
      <h1 style={{color: 'black'}}>{greeting}  {userName} welcome to your dashboard </h1>
     
      <p>Placeholder</p>
      {/* Add more content here */}
    </div>
  );
}

export default Home;
