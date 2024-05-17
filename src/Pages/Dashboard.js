import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts';



function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sold, setSolds] = useState();


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
            setIsLoading(false);
          }
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
      }, 1000);

      return () => unsubscribe();
    };

    fetchData();
  }, [navigate]);

  

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
            <div className='col-sm-6'>
              <h3 style={{ color: 'black' }}>{greeting} {userName} welcome to your dashboard</h3>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
            
            
          </div>
          
          <p>You can access your produce you ordered here & access incoming orders from other users</p>
          <h1>PAGE IS W.I.P</h1>
          
        </div>
      )}
    </div>
  );
}

export default Home;
