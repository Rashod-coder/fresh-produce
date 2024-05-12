import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase';

function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <h1>Welcome to the Home Page</h1>
      {userName ? <p>Hello, {userName}!</p> : <p>Hello, Guest!</p>}
      <p>This is the content of your home page.</p>
      {/* Add more content here */}
    </div>
  );
}

export default Home;
 