import React, { Component } from 'react';
import "./Login.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserFunctions from '../../API/UserFunctions';

class Login extends Component {
	userFuncs = new UserFunctions();
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null,
			validLogin: false
		};
	}

	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	handleSubmit(event){
		event.preventDefault();
		const user = {
			user_name: this.state.username,
			user_password: this.state.password
		};
	}

    render() {
			//console.log(this.state.username);
			//console.log(this.state.password);

      return (
        <div className="login-page">
          <div>
            <h3 className = "login-heading">Sign in to your account</h3>
            <hr />
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
								id="username"
								className="form-control"
								type="text"
								onChange={event => this.setState({ username: event.target.value })}
								></input>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
								id="password"
								className="form-control"
								type="password"
								onChange={event => this.setState({ password: event.target.value })}
								></input>
              </div>
              <button
							type="submit"
							className="form-button"
							>Log In</button>
            </form>
          </div>
        </div>
      );
    }
}

export default Login;
