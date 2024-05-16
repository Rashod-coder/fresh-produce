import React from 'react';
import backgroundImage from '../Assets/brooke-lark-3A1etBW5cBk-unsplash.jpg'; 

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    position: 'relative',
  };       

  return ( 
    <div>
      <div style={{backgroundColor: 'black'}}>
        <h1 className='text-light text-center' style={{fontFamily: 'montserrat'}}> Welcome to Fresh Market Hub.</h1>
      </div>
    <div style={backgroundStyle}>
      
      
    </div>
    <div style={{minHeight: '100vh'}}>
      <h1>About: </h1>
    </div>
    </div>
  );
}

export default Home;
