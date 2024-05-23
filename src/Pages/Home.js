import React from 'react';
import backgroundImage from '../Assets/tirza-van-dijk-dq0x8AvNKv8-unsplash.jpg'; 
import backGroundI from '../Assets/pineapple-supply-co-L7Rhe4mi0ds-unsplash.jpg';
import backGroundi from '../Assets/masahiro-naruse-4Hmf3K6NRQY-unsplash.jpg';
import About from './About';

function Home() {
  
  return ( 
    <div className="App">
      <style jsx>{`
        @keyframes drop {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-drop {
          animation: drop 3s ease-out forwards;
        }
      `}</style>

       
<header className="masthead d-flex align-items-center" style={{ position: 'relative', height: '100vh', color: '#fff' }} id='home'>
        <img src={backGroundI} alt="Background" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(1.5px)', zIndex: '-2' }} />
        <div className="container px-4 px-lg-5 text-center animate-drop">
          <h1 className="mb-1 text-dark display-1 fw-bold" style={{ fontFamily: 'Outfit' }}>Fresh Market Hub<span style={{ color: '#9AC3FF' }}>.</span></h1>
          <h3 className="mb-5 text-dark"><em>Farmers Market <span className='fw-bold'>Reimagined</span>.</em></h3>
          <a className="btn btn-dark btn-lg" href="/Register">Get Started Today</a>
        </div>
      </header>
      
      <section className="content-section bg-light" id="about">
        <div className="container px-4 px-lg-5 text-center">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-10">
              <h2 className='mt-3'>What is Fresh Market Hub?</h2>
              <p className="lead mb-5 mt-3">
                A digital farmers market that strives to make an impact on reducing food wastage, & we aim to help farmers too. We noticed that a lot of people grow fruits/veggies in their backyard, however most of the times they end up falling on the ground which ultimatley go to waste. Which is why Fresh Market Hub gives a oppurtunity to the public to sell their produce online
                
              </p>
              <a className="btn btn-dark btn-xl mb-5" href="#services">What We Offer</a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="content-section bg-primary text-dark text-center" id="services">
        <div className="container px-4 px-lg-5">
          <div className="content-section-heading">
            <h2 className="mb-5">How we operate</h2>
          </div>
          <div className="row gx-4 gx-lg-5">
            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-screen-smartphone"></i></span>
              <h4><strong>Buyers</strong></h4>
              <p className="text-faded mb-2">Buy Fresh Produce locally, you can only order produce from your city or neighboring cities</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-pencil"></i></span>
              <h4><strong>Delivery</strong></h4>
              <p className="text-faded mb-5">Get produce delivered right to your doorstep through Doordash</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-like"></i></span>
              <h4><strong>Sellers</strong></h4>
              <p className="text-faded mb-0">
                Fully integrated platform to upload your produce & link your paypal account directly.
              </p>
            </div>
            <div className="col-lg-3 col-md-6">
              <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-mustache"></i></span>
              <h4><strong>Question</strong></h4>
              <p className="text-dark mb-4 px-5">Have more questions? Contact us at: <a href="mailto:sales@freshmarket.com" class="text-dark contact-link">sales@freshmarket.com</a></p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="callout">
        <div className="container px-4 px-lg-5 text-center">
          <h2 className="mx-auto mb-5">
            About
          </h2>
          {/* <a className="btn btn-primary btn-xl" href="https://startbootstrap.com/theme/stylish-portfolio/">Download Now!</a> */}
        </div>
      </section>
      
      {/* <section className="content-section" id="portfolio">
        <div className="container px-4 px-lg-5">
          <div className="content-section-heading text-center">
            <h3 className="text-secondary mb-0">How to sell</h3>
            <h2 className="mb-5">Paypal</h2>
          </div>
          <div className="row gx-0">
            <div className="col-lg-6">
              <a className="portfolio-item" href="#!">
                <div className="caption">
                  <div className="caption-content">
                    <div className="h2">Stationary</div>
                    <p className="mb-0">A yellow pencil with envelopes on a clean, blue backdrop!</p>
                  </div>
                </div>
                <img className="img-fluid" src="assets/img/portfolio-1.jpg" alt="..." />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="#!">
                <div className="caption">
                  <div className="caption-content">
                    <div className="h2">Ice Cream</div>
                    <p className="mb-0">A dark blue background with a colored pencil, a clip, and a tiny ice cream cone!</p>
                  </div>
                </div>
                <img className="img-fluid" src="assets/img/portfolio-2.jpg" alt="..." />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="#!">
                <div className="caption">
                  <div className="caption-content">
                    <div className="h2">Strawberries</div>
                    <p className="mb-0">Strawberries are such a tasty snack, especially with a little sugar on top!</p>
                  </div>
                </div>
                <img className="img-fluid" src="assets/img/portfolio-3.jpg" alt="..." />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="#!">
                <div className="caption">
                  <div className="caption-content">
                    <div className="h2">Workspace</div>
                    <p className="mb-0">A yellow workspace with some scissors, pencils, and other objects.</p>
                  </div>
                </div>
                <img className="img-fluid" src="assets/img/portfolio-4.jpg" alt="..." />
              </a>
            </div>
          </div>
        </div>
      </section> */}
      
      <section className="content-section bg-primary text-white">
        <div className="container px-4 px-lg-5 text-center">
          <h2 className="mb-4">Sell your first produce today!</h2>
          <a className="btn btn-xl btn-light me-4" href="#!">Register</a>
          <a className="btn btn-xl btn-dark" href="#!">Already have an account? sign in</a>
        </div>
      </section>
      
      {/* <div className="map" id="contact">
        <iframe
          src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&amp;aq=0&amp;oq=twitter&amp;sll=28.659344,-81.187888&amp;sspn=0.128789,0.264187&amp;ie=UTF8&amp;hq=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&amp;t=m&amp;z=15&amp;iwloc=A&amp;output=embed"
          title="Google Map"
        ></iframe>
        <br />
        <small><a href="https://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&amp;aq=0&amp;oq=twitter&amp;sll=28.659344,-81.187888&amp;sspn=0.128789,0.264187&amp;ie=UTF8&amp;hq=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&amp;t=m&amp;z=15&amp;iwloc=A"></a></small>
      </div> */}
      
      {/* <footer className="footer text-center">
        <div className="container px-4 px-lg-5">
          <ul className="list-inline mb-5">
            <li className="list-inline-item">
              <a className="social-link rounded-circle text-white mr-3" href="#!"><i className="icon-social-facebook"></i></a>
            </li>
            <li className="list-inline-item">
              <a className="social-link rounded-circle text-white mr-3" href="#!"><i className="icon-social-twitter"></i></a>
            </li>
            <li className="list-inline-item">
              <a className="social-link rounded-circle text-white" href="#!"><i className="icon-social-github"></i></a>
            </li>
          </ul>
          <p className="text-muted small mb-0">Copyright &copy; Your Website 2023</p>
        </div>
      </footer> */}
      
      <a className="scroll-to-top rounded" href="#home"><i className="fas fa-angle-up"></i></a>
      
      {/* Bootstrap core JS*/}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      {/* Core theme JS*/}
      <script src="js/scripts.js"></script>
    </div>
  );
}

export default Home;
