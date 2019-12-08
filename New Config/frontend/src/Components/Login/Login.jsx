import React, { Component } from 'react';
import "./Login.css";

import UserFunctions from '../../API/UserFunctions';

class Login extends Component {
	userFuncs = new UserFunctions();
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			validLogin: true
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	async handleSubmit(event) {
	  event.preventDefault();
			var user = {
				username: this.state.username,
				pass: this.state.password
			};
	  this.userFuncs.login(user).then(res => {
				if (res.indexOf("login unsuccessful") > 0) {
					this.setState({validLogin: false})
					this.forceUpdate()
				}
				else{
					this.userFuncs.getUserId(user).then(response => {
						console.log(response)
						localStorage.setItem('token', response.userId);
						this.props.updateLoginState();
						this.props.history.push('/');
					}).catch(err => {})
				}
			}).catch(err => {
	 		//error caught here
			});

		}

    render() {
      return (
				<div>
					<div className="container">
						<div className="row">
							<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
								<div className="card card-signin my-5">
									<div className="card-body">
										<h5 className="card-title text-center">Sign In To Your Account</h5>
										<div>
										{
											this.state.validLogin ? "" : <div className="invalid">Invalid Login. Please try again.</div>
										}
										</div>
										<hr className="my-4"/>
										<form className="form-signin">
											<div className="form-label-group">
												<input
												type="text"
												id="username"
												className="form-control"
												placeholder="Username" required autoFocus
												onChange={event => this.setState({ username: event.target.value })}
												/>
												<label htmlFor="username">Username</label>
											</div>

											<div className="form-label-group">
												<input
												type="password"
												id="inputPassword"
												className="form-control"
												placeholder="Password" required
												onChange={event => this.setState({ password: event.target.value })}
												/>
												<label htmlFor="inputPassword">Password</label>
											</div>

											<button
											className="btn btn-lg btn-primary btn-block text-uppercase"
											type="button"
											onClick={this.handleSubmit}
											>Sign in</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
        </div>
      );
    }
}

export default Login;
