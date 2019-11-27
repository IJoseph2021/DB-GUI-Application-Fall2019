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

		this.onChange = this.onChange.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
	}

	toggleForm (event) {
		this.setState({
			profile: !this.state.profile
		})
	}


	onChange = event => {
		this.setState({[event.target.name]: event.target.value})
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
				<div className="user-profile">
				<h1 class="display-4">Your Profile</h1>
						<div className="form-group row">
							<label htmlFor="username" className="col-sm-2 col-form-label">Username:</label>
							<div className="col-sm-10">
								<input
								name="username"
								value={this.state.username}
								disabled
								type="text"
								className="form-control"
								id="username"
								onChange={this.onChange}/>
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="firstName" className="col-sm-2 col-form-label">First Name:</label>
							<div className="col-sm-10">
								<input
								name="firstName"
								onChange={this.onChange}
								type="text"
								value={this.state.firstname}
								className="form-control"
								id="firstName"/>
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name:</label>
							<div className="col-sm-10">
								<input
								onChange={this.onChange}
								name="lastName"
								value={this.state.lastname}
								type="text"
								className="form-control"
								id="lastName"/>
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
							<div className="col-sm-10">
								<input
								onChange={this.onChange}
								name="email"
								value={this.state.email}
								type="text"
								className="form-control"
								id="email" />
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="state" className="col-sm-2 col-form-label">State:</label>
							<div className ="col-sm-10">
								<select
								value={this.state.us_state}
								className="custom-select"
								id="state"
								name="state"
								onChange={this.onChange}>
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
						</div>


						<div className="form-group row">
							<label htmlFor="city" className="col-sm-2 col-form-label">City:</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="city" />
							</div>
						</div>


						<div className="form-group row">
							<label htmlFor="party" className="col-sm-2 col-form-label">Party:</label>
							<div className ="col-sm-10">
								<select
								value={this.state.party}
								className ="custom-select"
								id="party"
								name="party"
								onChange={this.onChange}>
									<option value="">N/A</option>
									<option value="IND">Independent</option>
									<option value="GREEN">Green Party</option>
									<option value="REP">Republican Party</option>
									<option value="DEM">Democratic Party</option>
									<option value="FES">Social Democratic Party</option>
								</select>
							</div>
						</div>

						{/*Remember to put this info later*/}
					  <fieldset className="form-group">
					    <div className="row">
					      <legend className="col-form-label col-sm-2 pt-0">Role:</legend>
					      <div className="col-sm-10">
					        <div className="form-check">
					          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" disabled/>
					          <label className="form-check-label" htmlFor="gridRadios1">
											Not Applicable
					          </label>
					        </div>

									<div className="form-check">
										<input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" disabled/>
										<label className="form-check-label" htmlFor="gridRadios2">
										 Voter
										</label>
									</div>


					        <div className="form-check">
					          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled/>
					          <label className="form-check-label" htmlFor="gridRadios3">
											Candidate
										</label>
					        </div>
					        <div className="form-check disabled">
					          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option4" disabled/>
					          <label className="form-check-label" htmlFor="gridRadios4">
					            Election Official
					          </label>
					        </div>
					      </div>
					    </div>
					  </fieldset>

					  <div className="form-group row">
					    <div className="col-sm-10">
					      <button onClick = {this.saveProfile} type="button" className="btn btn-primary">Save Your Profile</button>
					    </div>
					  </div>
        </div>
      );
    }
}
