import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function About() {
  return (
    <div style={{ marginTop: '50px' }}>
      <h2>About Our Digital Farmers Market</h2>
      <p>
        Our digital farmers market connects farmers, producers, and buyers in a convenient online platform. 
        We provide a seamless experience for purchasing fresh produce directly from local sources.
      </p>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div style={{ marginTop: '30px' }}>
            <h3>How We Work</h3>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>How We Work</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Sellers have the ability 
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ marginTop: '30px' }}>
            <h3>How to Sell Individually</h3>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>How to Sell Individually</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                 PlaceHolder
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
