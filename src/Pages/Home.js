import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase';

function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get the current user
    const user = auth.currentUser;
    
    // If the user is authenticated, set the user's name
    if (user) {
      setUserName(user.displayName);
    }
  }, []);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <h1>Welcome to the Home Page</h1>
      {userName && <p>Hello, {userName}!</p>}
      <p>This is the content of your home page.</p>
      {/* Add more content here */}
    </div>
  );
}

export default Home;
