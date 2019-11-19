import React from 'react';
import './UserProfile.css';
import UserFunctions from '../../API/UserFunctions';
import ChangePassword from './ChangePassword';
export default class UserProfile extends React.Component {
	userFuncs = new UserFunctions();

	constructor(props) {
		super(props);

		this.state = {
			username: this.props.username || localStorage.getItem('token'),
      firstName: "",
      lastname: "",
			passhash: "",
      us_state: "",
      city: "",
      zip: "",
      party: "",
			profile: false
		};

		const user = {
			userId: this.state.userId,
			username: this.state.username,
			pass: this.state.password,
			firstname: this.state.firstName,
			lastname: this.state.lastname,
			email: this.state.email,
			us_state: this.state.us_state,
			city: this.state.city,
			zip: this.state.zip,
			party: this.state.party
		};


		this.userFuncs.getUserInfo(user).then(res => {
			console.log("userInfo here", res[0])
			this.setState({
				firstname: res[0].fname,
				lastname: res[0].lname,
				email: res[0].email,
				passhash: res[0].passhash
			})
		}).catch(err => {
		//error caught here

		})

		this.getUserInfo = this.getUserInfo.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
	}

	toggleForm (event) {
		this.setState({
			profile: !this.state.profile
		})
	}


	getUserInfo = async (event) => {

};

	saveUserInfo = async (event) =>{
		event.preventDefault();

		const userInfo = {
			// username: this.state.username,
			// pass: this.state.password,
			firstname: this.state.firstName,
			lastName: this.state.lastName,
			us_state: this.state.us_state,
			city: this.state.city,
			zip: this.state.zip,
			party: this.state.party
		};
	}

    render() {
      return (
				<div>
	        <div className="login-page">
					{this.state.profile ? (
						<ChangePassword currentPassword={this.state.passhash} toggleForm={this.toggleForm}/>
					) : (
						<div className="profile">
	            <h3 className = "login-heading">Your Profile</h3>
	            <hr />
	            <form>
	              <div className="form-group">
	                <label htmlFor="username">Username:</label>
	                <input
									disabled
									value={this.state.username}
									id="username"
									className="form-control"
									type="text"
									onChange={event => this.setState({ username: event.target.value })}
									></input>
	              </div>

	              <div className="form-group">
	                <label htmlFor="firstName">First Name:</label>
	                <input
									value={this.state.firstname}
									id="firstName"
									className="form-control"
									type="text"
									onChange={event => this.setState({ firstName: event.target.value })}
									></input>
	              </div>

	              <div className="form-group">
	                <label htmlFor="lastName">Last Name:</label>
	                <input
									value={this.state.lastname}
	                id="lastName"
	                className="form-control"
	                type="text"
	                onChange={event => this.setState({ lastname: event.target.value })}
	                ></input>
	              </div>

								<div className="form-group">
	                <label htmlFor="email">Email:</label>
	                <input
									value={this.state.email}
	                id="email"
	                className="form-control"
	                type="text"
	                onChange={event => this.setState({ email: event.target.value })}
	                ></input>
	              </div>

	              <div className="form-group">
	              	<label htmlFor="state">State:</label>
	              		<select
										value={this.state.us_state}
	                  className ="form-control"
	                  id="state"
	                  name="state"
	                  onChange={event => this.setState({ us_state: event.target.value })}>
	              			<option value="">N/A</option>
	              			<option value="AK">Alaska</option>
	              			<option value="AL">Alabama</option>
	              			<option value="AR">Arkansas</option>
	              			<option value="AZ">Arizona</option>
	              			<option value="CA">California</option>
	              			<option value="CO">Colorado</option>
	              			<option value="CT">Connecticut</option>
	              			<option value="DC">District of Columbia</option>
	              			<option value="DE">Delaware</option>
	              			<option value="FL">Florida</option>
	              			<option value="GA">Georgia</option>
	              			<option value="HI">Hawaii</option>
	              			<option value="IA">Iowa</option>
	              			<option value="ID">Idaho</option>
	              			<option value="IL">Illinois</option>
	              			<option value="IN">Indiana</option>
	              			<option value="KS">Kansas</option>
	              			<option value="KY">Kentucky</option>
	              			<option value="LA">Louisiana</option>
	              			<option value="MA">Massachusetts</option>
	              			<option value="MD">Maryland</option>
	              			<option value="ME">Maine</option>
	              			<option value="MI">Michigan</option>
	              			<option value="MN">Minnesota</option>
	              			<option value="MO">Missouri</option>
	              			<option value="MS">Mississippi</option>
	              			<option value="MT">Montana</option>
	              			<option value="NC">North Carolina</option>
	              			<option value="ND">North Dakota</option>
	              			<option value="NE">Nebraska</option>
	              			<option value="NH">New Hampshire</option>
	              			<option value="NJ">New Jersey</option>
	              			<option value="NM">New Mexico</option>
	              			<option value="NV">Nevada</option>
	              			<option value="NY">New York</option>
	              			<option value="OH">Ohio</option>
	              			<option value="OK">Oklahoma</option>
	              			<option value="OR">Oregon</option>
	              			<option value="PA">Pennsylvania</option>
	              			<option value="PR">Puerto Rico</option>
	              			<option value="RI">Rhode Island</option>
	              			<option value="SC">South Carolina</option>
	              			<option value="SD">South Dakota</option>
	              			<option value="TN">Tennessee</option>
	              			<option value="TX">Texas</option>
	              			<option value="UT">Utah</option>
	              			<option value="VA">Virginia</option>
	              			<option value="VT">Vermont</option>
	              			<option value="WA">Washington</option>
	              			<option value="WI">Wisconsin</option>
	              			<option value="WV">West Virginia</option>
	              			<option value="WY">Wyoming</option>
	              		</select>
	              </div>

	              <div className="form-group">
	                <label htmlFor="city">City:</label>
	                <input
									value={this.state.city}
	                id="city"
	                className="form-control"
	                type="text"
	                onChange={event => this.setState({ city: event.target.value })}
	                ></input>
	              </div>

	              <div className="form-group">
	                <label htmlFor="zip">Zipcode:</label>
	                <input
									value={this.state.zip}
	                id="zip"
	                className="form-control"
	                type="text"
	                onChange={event => this.setState({ zip: event.target.value })}
	                ></input>
	              </div>


	              {/* 5 choices for party: Republican, Democratic, Independent */}
	              <div className="form-group">
	                <label htmlFor="party">Party:</label>
	                  <select
										value={this.state.party}
	                  className ="form-control"
	                  id="party"
	                  name="party"
	                  onChange={event => this.setState({ party: event.target.value })}>
	                    <option value="">N/A</option>
	                    <option value="IND">Independent</option>
	                    <option value="GREEN">Green Party</option>
	                    <option value="REP">Republican Party</option>
	                    <option value="DEM">Democratic Party</option>
	                  </select>
	              </div>

	              <button
								onClick={this.getUserInfo}
								type="button"
								className="form-button"
								>Save your profile</button>
	            </form>
							<button
							onClick={this.toggleForm}
							type="button"
							className="form-button"
							>Switch to change your password</button>
	          </div>
					)}
					</div>
        </div>
      );
    }
}
