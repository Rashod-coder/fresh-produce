import React, { useState } from 'react';
import { Box, Container, Typography, Link, Button, TextField, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, YouTube } from '@mui/icons-material';
import { db, auth } from '../Firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

function Footer() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'emails'), {
        email: email,
        timestamp: new Date()
      });
      setSuccessMessage('Thank you for signing up!');
      setErrorMessage('');
      setEmail('');
    } catch (e) {
      setErrorMessage('Error signing up, please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <Box component="footer" sx={{ backgroundColor: '#333', color: '#fff', padding: '2rem 0' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
        <Box sx={{ flex: 1, padding: '1rem' }}>
          <Typography variant="h6">Stay Connected</Typography>
          <Box component="form" onSubmit={handleSignUp} sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
            <TextField
              type="email"
              placeholder="Email Address"
              variant="outlined"
              size="small"
              value={email}
              onChange={handleEmailChange}
              requiredw
              sx={{ backgroundColor: '#fff', borderRadius: 1, marginRight: '0.5rem' }}
            />
            <Button type="submit" variant="contained" color="primary">Sign Up</Button>
          </Box>
          {successMessage && <Typography sx={{ marginTop: '1rem', color: 'green' }}>{successMessage}</Typography>}
          {errorMessage && <Typography sx={{ marginTop: '1rem', color: 'red' }}>{errorMessage}</Typography>}
          <Box sx={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <IconButton href="https://facebook.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
              <Twitter />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
              <LinkedIn />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
              <Instagram />
            </IconButton>
            <IconButton href="https://youtube.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
              <YouTube />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ flex: 1, padding: '1rem' }}>
          <Typography variant="h6">Committed to the Community.</Typography>
          <Typography sx={{ marginTop: '1rem' }}>
            Fresh Market Hub is proud to be part of the community. We strive to make a difference in reducing food wastage. 
          </Typography>
        </Box>

        
      </Container>
      
      <Box sx={{ backgroundColor: '#222', padding: '2rem 0', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography>
            Fresh Market Hub &copy; {new Date().getFullYear()} | 
            <Link href="/privacy" sx={{ color: '#00bcd4', textDecoration: 'none', marginLeft: '0.5rem' }}>Privacy Policy</Link> 
          </Typography>
          <Typography>Based in Bay Area California | Phone: (123) 456-7890</Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
