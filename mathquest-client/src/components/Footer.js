import React from 'react'

// const Footer = () => {
//   return (
//     <div>Footer Goes here</div>
//   )
// }

const Footer = () => {
  const footerStyle = {
   
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
   
    bottom: 0,
    width: '100%',
  };

  const socialListStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  };

  const socialLinkStyle = {
    margin: '0 10px',
    color: '#fff',
    textDecoration: 'none',
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <footer className='bg-slate-700 relative' style={footerStyle}>
      <div pa>
        <h4 className='text-2xl cursor-pointer text-decoration-line: underline'>Follow Us </h4>
        <br />
        <ul style = {socialListStyle} >
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              className='text-lg'
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              className='text-lg'
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              className='text-lg'
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
      {/* Add other footer content here */}
    </footer>
  );
};

export default Footer;