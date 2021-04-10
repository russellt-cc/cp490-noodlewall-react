import logo from './images/noodlewall-logo-50p.png';
import './css/Footer.css';
import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        {/* split into columns so we can do a horizontal display */}
        <div id="footer_left" className="footer_column">
          <p><strong>ABOUT NOODLEWALL</strong></p>
          <div className="footer_links">
            <a href="/#">How it Works</a>
            <a href="/#">Pricing</a>
            <a href="/#">Community Guidelines</a>
            <a href="/#">Terms of Service</a>
            <a href="/#">Privacy Policy</a>
          </div>
        </div>
        <div id="footer_center" className="footer_column">
          <a href="index.html"><img src={logo} height="40px" alt="Noodlewall Logo"/></a>
          <p>&copy; 2021 Noodlewall</p>
        </div>
        <div id="footer_right" className="footer_column">
          <p><strong>SUPPORT</strong></p>
          <div className="footer_links">
            <a href="/#">Contact Us</a>
          </div>
        </div>
      </footer>    
    );
  }
}

export default Footer;
