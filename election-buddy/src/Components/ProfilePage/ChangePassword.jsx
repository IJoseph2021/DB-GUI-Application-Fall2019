import React from 'react';
import './UserProfile.css';
import UserFunctions from '../../API/UserFunctions';

export default class ChangePassword extends React.Component {
	userFuncs = new UserFunctions();

	constructor(props) {
		super(props);

		this.state = {
      currentPassword: "",
			newPassword: "",
			newPasswordConfirm: ""
		};

		this.updatePassword = this.updatePassword.bind(this);
	}


	updatePassword = async (event) => {
    if(this.state.currentPassword === this.props.currentPassword){
       this.props.toggleForm()
    }
    else{

    }
    //update with database

	}

    render() {
      return (
				<div>
							<h3 className = "login-heading">Change Your Password</h3>
							<hr />
	            <form>
	              <div className="form-group">
	                <label htmlFor="currentPassword">Current Password:</label>
	                <input
									value={this.state.currentPassword}
									id="currentPassword"
									className="form-control"
									type="password"
									onChange={event => this.setState({ currentPassword: event.target.value })}
									></input>
	              </div>

	              <div className="form-group">
	                <label htmlFor="newPassword">New Password:</label>
	                <input
									value={this.state.newPassword}
	                id="newPassword"
	                className="form-control"
	                type="password"
	                onChange={event => this.setState({ newPassword: event.target.value })}
	                ></input>
	              </div>

								<div className="form-group">
	                <label htmlFor="newPasswordConfirm">Confirm new password:</label>
	                <input
									value={this.state.newPasswordConfirm}
	                id="newPasswordConfirm"
	                className="form-control"
	                type="password"
	                onChange={event => this.setState({ newPasswordConfirm: event.target.value })}
	                ></input>
	              </div>

	              <button
								onClick={this.updatePassword}
								type="button"
								className="form-button"
								>Update password</button>
								</form>
        </div>
      );
    }
}
