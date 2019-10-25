import React, { Component } from 'react';
import "./LoginPage.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserFunctions from '../../API/UserFunctions';

class LoginPage extends Component {
	userFuncs = new UserFunctions();
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null,
			validLogin: false
		};
	}
    render() {
      return (
        <div className="login-page">
          <div>
            <h3 className = "login-heading">Sign in to your account</h3>
            <hr />
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input id="username" className="form-control" type="text"></input>
              </div>

              <div className="form-group">
                <label htmlFor="userPassword">Password:</label>
                <input id="password" className="form-control" type="password"></input>
              </div>
              <button type="submit" className="form-button">Log In</button>
            </form>
          </div>
        </div>
      );
    }
}

export default LoginPage;
