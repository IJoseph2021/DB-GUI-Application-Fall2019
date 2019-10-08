import React from 'react';
import logo from '../../logo_transparent.png';
import './Homepage.css';
import Candidate from './Candidate.js';
import Footer from './Footer.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function Homepage() {
  return (
    <div>
      <div className="navBar">
        <ul>
          <Router>
          <li className = "right"><Link to="/"><img src={logo} alt="Logo"/></Link></li>
          <li className = "right"><Link to="/news">News</Link></li>
          <li className = "right"><Link to="/contact">Contact Us</Link></li>
          <li className = "right"><Link to="login">Login</Link></li>
          <li className = "right-border"><Link to="registration">Sign up</Link></li>
          </Router>
        </ul>
        <div className = "clear"></div>
      </div>
      <Candidate/>
    </div>
  );
}

export default Homepage;
