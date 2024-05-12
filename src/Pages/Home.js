import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase';

function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in, set the user's name
        setUserName(user.displayName);
      } else {
        // User is signed out, set the user's name to empty string
        setUserName('');
      }
    });

    // Clean up the subscription
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
 