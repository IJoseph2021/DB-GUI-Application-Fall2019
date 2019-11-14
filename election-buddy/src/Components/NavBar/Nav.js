import React, { Component } from 'react';
import logo from '../../logo_transparent.png';
import './NavBar.css';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return(
      <div>
        <div className="navBar">
          <ul>
            <Router>
              <li className = "right"><Link to="/"><img src={logo} alt="Logo"/></Link></li>
              <li className = "right"><Link to="/news">News</Link></li>
              <li className = "right"><Link to="/contact">Contact Us</Link></li>
              {

              }
              <li className = "right"><Link to="/login">Login</Link></li>
              <li className = "right-border"><Link to="/registration">Sign up</Link></li>
            </Router>
          </ul>
          <div className = "clear"></div>
        </div>
      </div>
    );
  }
}

export default Nav;
