import React, { useState, useEffect } from 'react';
import video from '../Assets/video2.mp4'; // Import the video file

function Home() {
  // Define state for controlling video playback
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Function to handle video loaded event
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    // Add event listener for video loaded metadata
    const videoElement = document.getElementById('background-video');
    videoElement.addEventListener('loadeddata', handleVideoLoad);

    // Clean up event listener on unmount
    return () => {
      videoElement.removeEventListener('loadeddata', handleVideoLoad);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Render the SecondaryNavbar component */}

      {/* Render the video background */}
      <video
        id="background-video"
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: videoLoaded ? 1 : 0, // Set opacity to 0 until video is loaded
          transition: 'opacity 1s ease-in-out' // Add a smooth fade-in effect
        }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Add the content of your home page */}
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px' }}>
        <h1 style={{ color: 'white' }}>Welcome to the Go Green</h1>
        {/* Add more content here */}
      </div>
      <div>
        <h1></h1>
      </div>
    </div>
  );
}

export default Home;
