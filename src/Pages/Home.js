import React from 'react';
import backgroundImage from '../Assets/evi-radauscher-U_D5NWMmTTM-unsplash.jpg'; 

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
    <div style={backgroundStyle}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-6 col-sm-12'>
            <h1>treeees</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
