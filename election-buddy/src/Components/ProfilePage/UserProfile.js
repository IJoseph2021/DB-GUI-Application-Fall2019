import React from 'react';
import './UserProfile.css';

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "John",
      firstName: "",
      lastName: "",
      state: "",
      city: "",
      zip: "",
      party: ""
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
      return (
        <div className="login-page">
          <div>
            <h3 className = "login-heading">Your Profile</h3>
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
                <label htmlFor="firstName">First Name:</label>
                <input
								id="firstName"
								className="form-control"
								type="text"
								onChange={event => this.setState({ firstName: event.target.value })}
								></input>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                id="lastName"
                className="form-control"
                type="text"
                onChange={event => this.setState({ lastName: event.target.value })}
                ></input>
              </div>

              <div class="form-group">
              	<label htmlFor="state">State:</label>
              		<select
                  className ="form-control"
                  id="state"
                  name="state"
                  onChange={event => this.setState({ state: event.target.value })}>
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
                id="city"
                className="form-control"
                type="text"
                onChange={event => this.setState({ city: event.target.value })}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="zip">Zipcode:</label>
                <input
                id="zip"
                className="form-control"
                type="text"
                onChange={event => this.setState({ zip: event.target.value })}
                ></input>
              </div>


              {/* 5 choices for party: Republican, Democratic, Independent */}
              <div class="form-group">
                <label htmlFor="party">Party:</label>
                  <select
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
							type="submit"
							className="form-button"
							>Save Your Profile</button>
            </form>
          </div>
        </div>
      );
    }
}