import React from "react";

// const Footer = () => {
//   return (
//     <div>Footer Goes here</div>
//   )
// }

// Define the Footer component
const Footer = () => {
  const footerStyle = {
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    bottom: 0,
    width: "100%",
  };

  // Styles for the social media links list
  const socialListStyle = {
    listStyle: "none",
    padding: 0,
    display: "flex",
    justifyContent: "center",
  };

  // Styles for individual social media linkss
  const socialLinkStyle = {
    margin: "0 10px",
    color: "#fff",
    textDecoration: "none",
    listStyle: "none",
    padding: 0,
    display: "flex",
    justifyContent: "center",
  };

  // Render the Footer component
  return (
    // Footer container with a fixed position at the bottom of the page
    <footer className="bg-slate-700 fixed bottom-0" style={footerStyle}>
      <div pa>
        <h4 className="text-xl cursor-pointer">Follow Us </h4>

        <ul style={socialLinkStyle}>
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              className="text-sm"
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
              className="text-sm"
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
              className="text-sm"
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

// Export the Footer component
export default Footer;
