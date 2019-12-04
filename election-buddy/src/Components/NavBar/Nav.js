import React, { Component } from 'react';
import logo from '../../logo_transparent.png';
import './NavBar.css';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Nav extends Component {
  constructor(props){
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(){

  }

  render() {
    return(
      <div className = "nav">
        {
          this.props.loginState ?
          (
            <nav style={{"margin": "0 auto"}} className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/"><img src={logo} alt="Logo"/></Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/news">News</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <span style={{"cursor": "pointer"}} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Account
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/profile">User Profile</Link>
                      <Link className="dropdown-item" to="/changepwd">Change password</Link>
                      {
                        this.props.role.includes("admin") ? (
                          <Link className="dropdown-item" to="/admintask">Admin Task</Link>
                        ) : (
                          ""
                        )
                      }
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/logout">Log out</Link>
                    </div>
                  </li>
                  <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                  </form>
                  <div className="container">
                    <button type="button" className="btn btn-primary btn-xs">Search</button>
                  </div>
                </ul>
              </div>
            </nav>
          )
          : (
            <nav style={{"margin": "0 auto"}} className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/"><img src={logo} alt="Logo"/></Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registration">Signup</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/news">News</Link>
                  </li>
                </ul>
              </div>
            </nav>

            )
        }

      </div>
    );
  }
}

export default Nav;
