import React from 'react';
import blub from './blub.jpg'
// Define a function named login that returns JSX for the login form
function register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black" style={{background: 'white'}}>
          <span className="h1 fw-bold">Go Green</span>
            <div className="px-5 ms-xl-4 mt-3">
            
                <br/>
                
              
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
                <h3 className="fw-normal mb-3 pb-3 text-bold fw-bold" style={{ letterSpacing: '1px'  }}>Register</h3>
                <div className="form-outline mb-5">
                  <input type="email" id="form2Example18" className="form-control form-control-lg" placeholder='Email' />
                </div>
                <div className="form-outline mb-5">
                  <input type="name" id="form2Example18" className="form-control form-control-lg"placeholder='Full name (First & Last)' />
                </div>
                
                <div className="form-outline mb-5">
                  <input type="password" id="form2Example28" className="form-control form-control-lg" placeholder='Password' />
                </div>
                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">Register</button>
                </div>
                <p>Already have an account? <a href="/Login" className="link-info">Sign in</a></p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src={blub} alt="Login image" className="w-100 vh-100" style={{ height: '100%', objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default register; // Export the login function
