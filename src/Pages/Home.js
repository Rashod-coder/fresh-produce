import React from 'react';
import backgroundImage from '../Assets/evi-radauscher-U_D5NWMmTTM-unsplash.jpg'; // Import the image file

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Set the background image using inline style
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Adjust the height as needed
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background color
    position: 'relative',
  };

  return (
    <div style={backgroundStyle}>
      {/* Add the content of your home page */}
    </div>
  );
}

export default Home;
