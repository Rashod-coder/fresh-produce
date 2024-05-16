import React from 'react';
import backgroundImage from '../Assets/sumner-mahaffey-7vCt_lFxKx4-unsplash.jpg'; 

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    position: 'relative',
  };       

  return ( 
    <div>
    <div style={backgroundStyle}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 col-sm-12'>
            <h1 className='text-center mt-4 py-5'>Welcome to Fresh for all - a digital farmers market</h1>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>About: </h1>
    </div>
    </div>
  );
}

export default Home;
