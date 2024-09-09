import React from "react";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Your Store. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
