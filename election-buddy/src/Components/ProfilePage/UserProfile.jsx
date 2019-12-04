import React from 'react';

import './UserProfile.css';

import UserFunctions from '../../API/UserFunctions';
import CandidateFunctions from '../../API/CandidateFunctions';

export default class UserProfile extends React.Component {

	userFuncs = new UserFunctions();
	candidateFuncs = new CandidateFunctions();


	constructor(props) {

		super(props);



		this.state = {

			userId: this.props.userId || localStorage.getItem('token'),
			username: this.props.username || "",
			firstName: "",
			lastname: "",
			passhash: "",
      us_state: "",
      city: "",
      zip: "",
			bio: "",
      party: "",
			role: [],
			email: "",
			updateSuccess: false,
			verify: ""

		};





		this.onChange = this.onChange.bind(this);

		this.saveUserInfo = this.saveUserInfo.bind(this);

	}





	onChange = event => {

		this.setState({ [event.target.name]: event.target.value })
		this.updateBio()

	}





	componentDidMount() {

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

			party: this.state.party,

			verified: this.state.verify

		};



		this.userFuncs.getUserInfo(user).then(res => {

			// console.log("userInfo here", res[0])

			this.setState({

				username: res[0].username,

				firstname: res[0].fname,

				lastname: res[0].lname,

				email: res[0].email,

				passhash: res[0].passhash

			})

		}).catch(err => {

			//error caught here



		});



		this.userFuncs.getRoles(user.userId).then(res => {

			// console.log("Roles: ", res)

			if (Object.entries(res).length === 0 && res.constructor === Object) {

				this.setState({ role: [...this.state.role, "Not Applicable"] });



			}

			else {

				this.setState({ role: Object.keys(res) })

			}

		})

			.catch(err => {

				//error caught here



			});

			this.candidateFuncs.getCandidateBio(user.userId)
		.then(res => {
			this.setState({bio: res[0].bio})
		})
		.catch(err => {
			console.log("Error occured")
		});



		//[{"userID":4,"partyCode":"FES","zipCode":"90278","state":"CA","city":"Los Angeles"}]

			this.userFuncs.getVoterInfo(localStorage.getItem('token')).then(res =>{
			this.setState({

				party: res[0].partyCode,

				zip: res[0].zipCode,

				us_state: res[0].state,

				city: res[0].city

			})
		}).catch({



		})
			this.candidateFuncs.getCandidateInfo(localStorage.getItem('token')).then(res =>{
				console.log(res)
			this.setState({

				party: res[0].partyCode,

				zip: res[0].zipCode,

				us_state: res[0].state,

				city: res[0].city,

				bio: res[0].bio,

				verify: res[0].verified


			})
		}).catch({



		})



	}



	updateBio = () => {

		this.candidateFuncs.updateCandidateBio(this.state.userId, this.state.bio)

			.then(res => {

				console.log(this.state.bio)

				//this.setState({bio: res[0].bio})

				console.log("in update bio")

				console.log(this.state.userId)

				console.log(this.state.bio)

			})

			.catch(err => {

				console.log("Error occured")

			});

	}

	updateBio = () => {
		this.candidateFuncs.updateCandidateBio(this.state.userId, this.state.bio)
		.then(res => {
			// console.log(this.state.bio)
			// //this.setState({bio: res[0].bio})
			// console.log("in update bio")
			// console.log(this.state.userId)
			// console.log(this.state.bio)
		})
		.catch(err => {
			console.log("Error occured")
		});
	}

	saveUserInfo = async (event) =>{
		event.preventDefault();



		const userInfo = {

			username: this.state.username,

			// pass: this.state.password,

			userId: this.state.userId,

			firstname: this.state.firstName,

			lastName: this.state.lastName,

			email: this.state.email,

			state: this.state.us_state,

			city: this.state.city,

			zipCode: this.state.zip,

			partyCode: this.state.party,

			verified: this.state.verify

		};

		this.updateBio()

		if(this.state.role.includes("voter")) {
			this.userFuncs.updateVoterInfo(userInfo).then(res => {

				// console.log(res)

				this.setState({ updateSuccess: true })

			}).catch(err => {

				this.setState({ updateSuccess: false })

				console.log(err)

			})
		}


		if(this.state.role.includes("candidate")) {
			this.candidateFuncs.updateCandidateInfo(userInfo).then(res => {

				// console.log(res)

				this.setState({ updateSuccess: true })

			}).catch(err => {

				this.setState({ updateSuccess: false })

				console.log(err)

			})
		}

		this.userFuncs.updateUserEmail(userInfo).then(res => {

			// console.log(res)

		}).catch(err => {

			console.log(err)

		})

	}



	render() {

		return (

			<div className="user-profile" id="wrap">

				<h1 className="display-4">Your Profile</h1>

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

							onChange={this.onChange} />

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

							id="firstName" />

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

							id="lastName" />

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

					<div className="col-sm-10">

						<select

							value={this.state.us_state}

							className="custom-select"

							id="state"

							name="us_state"

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

						<input type="text"

							className="form-control"

							id="city"

							name="city"

							onChange={this.onChange}

							value={this.state.city}

						/>

					</div>

				</div>



				<div className="form-group row">

					<label htmlFor="zip" className="col-sm-2 col-form-label">Zip Code:</label>

					<div className="col-sm-10">

						<input type="text"

							name="zip"

							onChange={this.onChange}

							className="form-control"

							value={this.state.zip}

							id="zip" />

					</div>

				</div>



				<div className="form-group row">

					<label htmlFor="party" className="col-sm-2 col-form-label">Party:</label>

					<div className="col-sm-10">

						<select

							value={this.state.party}

							className="custom-select"

							id="party"

							name="party"

							onChange={this.onChange}>

							<option value="">N/A</option>

							<option value="REP">Republican Party</option>

							<option value="DEM">Democratic Party</option>

							<option value="FES">Flat Earth Society</option>

						</select>

					</div>

				</div>

				{
					this.state.role.includes("candidate") ? (
						<div className="form-group row">
							<label htmlFor="bio" className="col-sm-2 col-form-label">Bio:</label>
							<div className="col-sm-10">

								<textarea type="text"
									rows = "3"
									name="bio"

									value={this.state.bio}

									onChange={e => this.setState({ bio: e.target.value })}

									className="form-control"

									id="bio" />

							</div>
						</div>
					) : ""
				}



				{/*Remember to put this info later*/}

				<fieldset className="form-group">

					<div className="row">

						<legend className="col-form-label col-sm-2 pt-0">Role:</legend>

						<div className="col-sm-10">

							<div className="form-check">

								{

									this.state.role[0] == "Not Applicable" ? (

										<input className="form-check-input" type="radio" name="gridRadios1" id="gridRadios1" value="option1" disabled checked />

									) : (

											<input className="form-check-input" type="radio" name="gridRadios1" id="gridRadios1" value="option1" disabled />

										)

								}

								<label className="form-check-label" htmlFor="gridRadios1">

									Not Applicable

                                                                               </label>

							</div>



							<div className="form-check">

								{

									this.state.role.includes("voter") ? (

										<input className="form-check-input" type="radio" name="gridRadios2" id="gridRadios2" value="option2" disabled checked />

									) : (

											<input className="form-check-input" type="radio" name="gridRadios2" id="gridRadios2" value="option2" disabled />

										)

								}

								<label className="form-check-label" htmlFor="gridRadios2">

									Voter

                                                                              </label>


						</div>






							<div className="form-check">

								{

									this.state.role.includes("candidate") ? (

										<input className="form-check-input" type="radio" name="gridRadios3" id="gridRadios3" value="option2" disabled checked />

									) : (

											<input className="form-check-input" type="radio" name="gridRadios3" id="gridRadios3" value="option2" disabled />

										)

								}

								<input className="form-check-input" type="radio" name="gridRadios3" id="gridRadios3" value="option3" disabled />

								<label className="form-check-label" htmlFor="gridRadios3">

									Candidate

                                                                                                                                         </label>

							</div>

							<div className="form-check disabled">

								{

									this.state.role.includes("admin") ? (

										<input className="form-check-input" type="radio" name="gridRadios4" id="gridRadios4" value="option4" disabled checked />

									) : (

											<input className="form-check-input" type="radio" name="gridRadios4" id="gridRadios4" value="option4" disabled />

										)

								}

								<input className="form-check-input" type="radio" name="gridRadios4" id="gridRadios4" value="option4" disabled />

								<label className="form-check-label" htmlFor="gridRadios4">

									Election Official

                 </label>

							</div>

						</div>

					</div>

				</fieldset>



				<div className="form-group row">

					<div className="col-sm-10">

						<button onClick={this.saveUserInfo} type="button" className="btn btn-primary">Save Your Profile</button>

						{

							this.state.updateSuccess ? <p className="text-success">Update Information Success</p> : ""

						}

					</div>

				</div>


			</div>

		);

	}

}
