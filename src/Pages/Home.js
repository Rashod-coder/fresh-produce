import React from 'react';
import backgroundImage from '../Assets/tirza-van-dijk-dq0x8AvNKv8-unsplash.jpg'; 
import backGroundI from '../Assets/nery-montenegro-3ak9PMcx048-unsplash.jpg';
import backGroundi from '../Assets/masahiro-naruse-4Hmf3K6NRQY-unsplash.jpg'

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh', 
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const headerStyle = {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '10vh',
  };

  const buttonStyle = {
    padding: '15px 30px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#003366', // Dark blue color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const buttonHoverStyle = {
    backgroundColor: '#002244', // Darker blue on hover
  };

  return ( 
    <div>
      <div style={headerStyle}>
        <h1 className='text-light text-center' style={{fontFamily: 'montserrat'}}> Welcome to Fresh Market Hub.</h1>
      </div>
      <div id="carouselExampleAutoplaying" className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="2500">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2500">
            <img src={backgroundImage} style={{height: '90vh'}} className="d-block w-100" alt="Slide 1" />
            <div className="carousel-caption d-md-block">
              <h5>A full on digital farmers market nothing like others!</h5>
              <a href="/register" 
                style={buttonStyle}
                onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>
                Get Started Today
              </a>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2500">
            <img src={backGroundI} style={{height: '90vh'}} className="d-block w-100" alt="Slide 2" />
            <div className="carousel-caption d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2500">
            <img src={backGroundi} style={{height: '90vh'}} className="d-block w-100" alt="Slide 3" />
            <div className="carousel-caption d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div style={{minHeight: '100vh'}}>
        <h1>About: </h1>
        <h3>Same Day Delivery through Door Dash or other food delivery services, you can only order produce from local areas</h3>
      </div>
    </div>
  );
}

export default Home;
