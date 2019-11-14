import React, { Component } from 'react';
import "./Login.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import UserFunctions from '../../API/UserFunctions';

class Login extends Component {
	userFuncs = new UserFunctions();
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	async handleSubmit(event){
		event.preventDefault();
		const user = {
			username: this.state.username,
			pass: this.state.password
		};
		// this.setState({username: '', password: ''})

		this.userFuncs.login(user).then(res => {
			if (res) {
				localStorage.setItem('token', user.username);
				this.props.history.push("/");
			}
			return res.data;
		}).catch(err => {
 		//error caught here
		});
	}

    render() {
			//console.log(this.state.username);
			//console.log(this.state.password);
			// if (localStorage.getItem('token')) {
			// 	return <Redirect to="/" />;
			// }

      return (
        <div className="login-page">
          <div>
            <h3 className = "login-heading">Sign in to your account</h3>
            <hr />
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
								value={this.state.username}
								id="username"
								className="form-control"
								type="text"
								onChange={event => this.setState({ username: event.target.value })}
								></input>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
								value={this.state.password}
								id="password"
								className="form-control"
								type="password"
								onChange={event => this.setState({ password: event.target.value })}
								></input>
              </div>
              <button
							onClick={this.handleSubmit}
							type="button"
							className="form-button"
							>Log In</button>
            </form>
          </div>
        </div>
      );
    }
}

export default Login;
