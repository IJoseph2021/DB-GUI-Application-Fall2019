import React from 'react';
import "./Footer.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from '../../logo_transparent.png';


function Footer() {
  return (
    <div>
      <div className = "footer">
        <div className = "content">
          <img src={logo} alt="Logo"/>
        </div>
        <hr/>
        <div className = "content">
          <ul>
            <Router>
              <li className = "left"><Link to="/terms">Terms of Use</Link></li>
              <li className = "left"><Link to="/privacy">Privacy Policy</Link></li>
              <li className = "left"><Link to="/about">About Us</Link></li>
              <li className = "left"><Link to="/support">Support</Link></li>
            </Router>
          </ul>
          <p>&copy; 2019 Election Buddy. SHARK Inc. All Rights Reserved.</p>
          <p>Southern Methodist University - Computer Science department</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
