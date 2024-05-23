import React from 'react';
import backGroundI from '../Assets/pineapple-supply-co-L7Rhe4mi0ds-unsplash.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faLeaf, faDollarSign, faQuestionCircle, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

        .service-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          color: #9AC3FF;
        }

        .contact-link:hover {
          color: #fff;
          text-decoration: underline;
        }

        .content-section {
          padding-bottom: 40px;
        }

        .info-box {
          border: 2px solid #9AC3FF;
          border-radius: 10px;
          padding: 20px;
          margin-top: 20px;
          background-color: #f8f9fa;
          color: #000;
          display: flex;
          align-items: center;
        }

        .info-icon {
          font-size: 2rem;
          margin-right: 15px;
          color: #9AC3FF;
        }

        .info-link {
          color: #9AC3FF;
          font-weight: bold;
        }

        .info-link:hover {
          color: #0056b3;
        }

        .qa-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .qa-accordion {
          width: 100%;
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
              <h2 className='mt-4'>What is Fresh Market Hub?</h2>
              <p className="lead mb-4 mt-3">
                A digital farmers market that strives to make an impact on reducing food wastage, & we aim to help farmers too. We noticed that a lot of people grow fruits/veggies in their backyard, however most of the times they end up falling on the ground which ultimately go to waste. This is why Fresh Market Hub gives an opportunity to the public to sell their produce online.
              </p>
              <div className="info-box">
                <FontAwesomeIcon icon={faUser} className="info-icon" />
                <span>You must be logged in to purchase goods. If you don't have an account, sign up <a href="/Register" className="info-link">here</a>.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section text-white text-center" id="services" style={{ backgroundColor: '#A5D8FF' }}>
        <div className="container px-4 px-lg-5">
          <div className="content-section-heading">
            <h2 className="mb-5">Services</h2>
          </div>
          <div className="row gx-4 gx-lg-5">
            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <span className="service-icon rounded-circle mx-auto mb-3"><FontAwesomeIcon icon={faLeaf} style={{ color: 'black' }} /></span>
              <h4><strong>Buyers</strong></h4>
              <p className="text-faded mb-0" style={{ fontSize: '18px' }}>Buy fresh produce locally. You can only order produce from your city or neighboring cities.</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <span className="service-icon rounded-circle mx-auto mb-3"><FontAwesomeIcon icon={faTruck} style={{ color: 'black' }} /></span>
              <h4><strong>Delivery</strong></h4>
              <p className="text-faded mb-0" style={{ fontSize: '18px' }}>Get produce delivered right to your doorstep through DoorDash.</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <span className="service-icon rounded-circle mx-auto mb-3"><FontAwesomeIcon icon={faDollarSign} style={{ color: 'black' }} /></span>
              <h4><strong>Sellers</strong></h4>
              <p className="text-faded mb-0" style={{ fontSize: '18px' }}>Fully integrated platform to upload your produce & link your PayPal account directly, to receive payments.</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <span className="service-icon rounded-circle mx-auto mb-3"><FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'black' }} /></span>
              <h4><strong>Questions</strong></h4>
              <p className="text-faded mb-0" style={{ fontSize: '18px' }}>Have more questions? Contact us at: <a href="mailto:sales@freshmarket.com" className="text-light contact-link">sales@freshmarket.com</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="callout">
        <div className="container px-4 px-lg-5 text-center">
          <h2 className="mx-auto mb-5 mt-3">Frequently Asked Questions</h2>
          <span className="service-icon rounded-circle mx-auto mb-3"><FontAwesomeIcon icon={faCartShopping} style={{ color: 'black' }} /></span>
          <div className="qa-section">
            <div className="qa-accordion">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography><strong>How do I create an account?</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    To create an account, click on the 'Register' button at the top right corner and fill in the required details.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="qa-accordion">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography><strong>How can I sell my produce?</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Once you have created an account, you can upload your produce by navigating to the 'Sell' section and following the instructions.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="qa-accordion">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography><strong>How is delivery handled?</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    We partner with DoorDash to ensure your produce is delivered fresh to your doorstep.
                  </Typography>
                  </AccordionDetails>
              </Accordion>
            </div>
            <div className="qa-accordion mb-5">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography><strong>What payment methods are accepted?</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    We accept payments via PayPal, credit cards, and other common payment methods.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section bg-primary text-white" style={{ paddingBottom: '40px' }}>
        <div className="container px-4 px-lg-5 text-center">
          <h2 className="mx-auto mb-5">More Information</h2>
          {/* Additional content can go here */}
        </div>
      </section>
    </div>
  );
}

export default Home;

               
