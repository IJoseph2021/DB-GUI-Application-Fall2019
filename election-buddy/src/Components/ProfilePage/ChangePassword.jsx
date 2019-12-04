import React from 'react';
import './UserProfile.css';
import UserFunctions from '../../API/UserFunctions';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class ChangePassword extends React.Component {
	userFuncs = new UserFunctions();

	constructor(props) {
		super(props);

		this.state = {
      userInputCurrentPassword: "",
			currentPassword: "",
			newPassword: "",
			newPasswordConfirm: "",
			updateSucess: false,
			validateForm: true
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}


	validateForm(){
		if (this.state.newPassword == this.state.newPasswordConfirm){
			if (this.state.currentPassword == this.state.userInputCurrentPassword){
				return true;
			}
		}
		this.setState({updateSucess: false})
		this.setState({validateForm: false});
		this.setState({
			userInputCurrentPassword: "",
			newPassword: "",
			newPasswordConfirm: ""
		});
		this.forceUpdate();
		return false;
	}

	componentDidMount(){
		this.userFuncs.getUserCurrentPassword(this.props.userId || localStorage.getItem('token'))
		.then(res => {
			this.setState({currentPassword: res[0].passhash})
		})
		.catch(err => {
			console.log("Error occured")
		});
	}

	handleSubmit = async (event) => {
		const user = {
			userId: this.props.userId || localStorage.getItem('token'),
			newPass: this.state.newPassword
		}

		if(this.validateForm()){
			this.userFuncs.updatePassword(user).then(res => {
				this.setState({updateSucess: true})
				this.setState({
					userInputCurrentPassword: "",
					newPassword: "",
					newPasswordConfirm: ""
				});
				this.setState({validateForm: true});
				this.forceUpdate()
			})
			.catch(err => {
				console.log("Error Occured")
			})
		}
	}


    render() {
      return (
				<div>
								<div id="wrap">
								<div style={{"display": "inline"}}>
								<span className="display-4">
								<Link
								style={{"textDecoration": "none"}}
								to="/profile">
								Your Profile /
								</Link>
								</span>
								<span className="display-4"> Change Your Password</span>
								</div>
										<div>
											<div className="container">
												<div className="row">
													<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
														<div className="card card-signin my-5">
															<div className="card-body">
																<form className="form-signin">
																{
																	this.state.updateSucess ?
																	<div className="valid-update">Successfully Updated Your Password.</div>
																	:""
																}
																{
																	this.state.validateForm ?
																	"":
																	<div className="invalid-signup">Current password or New Password fields don't match. Please try again</div>
																}
																	<div className="form-label-group">
																		<input
																		value={this.state.userInputCurrentPassword}
																		type="password"
																		id="currentPassword"
																		className="form-control"
																		placeholder="Current Password" required autoFocus
																		onChange={event => this.setState({ userInputCurrentPassword: event.target.value })}
																		/>
																		<label htmlFor="currentPassword">Current Password</label>
																	</div>

																	<div className="form-label-group">
																		<input
																		value={this.state.newPassword}
																		type="password"
																		id="newPassword"
																		className="form-control"
																		placeholder="Password"
																		onChange={event => this.setState({ newPassword: event.target.value })}
																		/>
																		<label htmlFor="newPassword">New Password</label>

																	</div>

																	<div className="form-label-group">
																		<input
																		value={this.state.newPasswordConfirm}
																		type="password"
																		id="confirmPassword"
																		className="form-control"
																		placeholder="Password"
																		onChange={event => this.setState({ newPasswordConfirm: event.target.value })}
																		/>
																		<label htmlFor="confirmPassword">Confirm New Password</label>
																	</div>

																	<button style={{"marginTop": "2em"}}
																	className="btn btn-lg btn-primary btn-block text-uppercase"
																	type="button"
																	onClick={this.handleSubmit}
																	>Change Password</button>
																</form>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
								</div>
        </div>
      );
    }
}
