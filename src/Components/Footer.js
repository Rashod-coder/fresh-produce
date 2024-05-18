import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={textStyle}>Fresh Market Hub &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem 0',
  position: 'relative', 
  bottom: 0,
  width: '100%',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const textStyle = {
  margin: 0,
};

export default Footer;
