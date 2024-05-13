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
              window.alert("An error occured please try again: ", error)
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

      setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => unsubscribe();
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }
  }, [isLoading]);

  return (
    <div style={{ backgroundColor: isLoading ? 'black' : 'white', color: 'black', minHeight: '100vh', transition: 'background-color 1s ease-in-out' }}>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" style={{ width: '3rem', height: '3rem', color:'white' }} role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : 
      (
        <div className='container-fluid'style={{ height: '100vh', padding: '20px' }}>
          <div className='row'>
          <div className='col-lg-12' style={{ 
    backgroundColor: 'transparent',
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)' // Adding a shadow for better visibility
  }}>
  <h1 className='text-center'style={{ color: 'black' }}>{greeting} {userName} welcome to your dashboard</h1>
</div>
</div>
          
          <p>Placeholder</p>
          
        </div>
      )}
    </div>
  );
}

export default Home;
