import React, { Component } from 'react';
import './Signup.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserFunctions from '../../API/UserFunctions';

class Signup extends Component {
    userFuncs = new UserFunctions();
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            fname: "",
            lname: "",
            email: "",
            role: "",
            signUpSuccess: false,
            validateForm: true
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm() {
        return (
            this.state.username.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password == this.state.confirmPassword
        );
    }

    async handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()){
          this.setState({validateForm: true})

          const user = {
              user: this.state.username,
              pass: this.state.password,
              fname: this.state.fname,
              lname: this.state.lname,
              email: this.state.email
          };

          this.setState({
            username: "",
            password: "",
            confirmPassword: "",
            fname: "",
            lname: "",
            email: ""
          })

          this.userFuncs.addVote(user).then(res => {

          }).catch(err => {

          })

          this.userFuncs.signUp(user).then(res => {
              if (!!res.indexOf("made")) {
                this.setState({signUpSuccess: false})
                this.forceUpdate();
                this.props.history.push('/login');

              }
              else{
                this.forceUpdate();

              }
            }).catch(err => {
            //error caught here

            });
        }
        else{
          this.setState({validateForm: false})
        }



    }


    render() {
        var roles = ["Not Applicable", "Voter"];

        return (
            <div>
                <div>
        					<div className="container">
        						<div className="row">
        							<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        								<div className="card card-signin my-5">
        									<div className="card-body">
        										<h5 className="card-title text-center">Create Account</h5>
                            { this.state.validateForm ?  "":<div className="invalid-signup">Username is invalid OR Password fields don't match. Please try again</div> }

                            { this.state.signUpSuccess ?  <div className="invalid-signup">Invalid Registration. Please try again.</div>:"" }
        										<hr className="my-4"/>
        										<form className="form-signin">
        											<div className="form-label-group">
        												<input
                                value={this.state.username}
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
                                value={this.state.password}
        												type="password"
        												id="inputPassword"
        												className="form-control"
        												placeholder="Password"
                                onChange={event => this.setState({ password: event.target.value })}
        												/>
                                <label htmlFor="inputPassword">Password</label>

        											</div>

                              <div className="form-label-group">
        												<input
                                value={this.state.confirmPassword}
        												type="password"
        												id="confirmPassword"
        												className="form-control"
        												placeholder="Password"
                                onChange={event => this.setState({ confirmPassword: event.target.value })}
        												/>
                                <label htmlFor="confirmPassword">Confirm Password</label>
        											</div>

                              <div className="form-label-group">
                                <input
                                value={this.state.fname}
                                type="text"
                                id="fname"
                                className="form-control"
                                placeholder="First Name"
                                onChange={event => this.setState({ fname: event.target.value })}
                                />
                                <label htmlFor="fname">First Name</label>

                              </div>

                              <div className="form-label-group">
                                <input
                                value={this.state.lname}
                                type="text"
                                id="lname"
                                className="form-control"
                                placeholder="Last Name"
                                onChange={event => this.setState({ lname: event.target.value })}
                                />
                                <label htmlFor="lname">Last Name</label>

                              </div>

                              <div className="form-label-group">
                                <input
                                value={this.state.email}
                                type="text"
                                id="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={event => this.setState({ email: event.target.value })}
                                />
                                <label htmlFor="email">Email</label>

                              </div>

                              {/*
                                <div>
                                <label htmlFor="role">What is your role?</label>
                                <select
                                name="role"
                                id="role"
                                onChange={event => this.setState({role: event.target.value})}
                                >
                                {
                                    roles.map(x => (
                                      <option
                                      key={x}
                                      id="role"
                                      value={x}
                                      > {x}
                                      </option>
                                  )
                                )
                                }
                                </select>
                                </div>
                                <div class="selectWrapper">
                                  <select class="selectBox">
                                  <option>Option 1</option>
                                  <option>Option 2</option>
                                  <option>Option 3</option>
                                  <option>Option 4</option>
                                </select>
                                </div>
                                */}

        											<button style={{"marginTop": "2em"}}
        											className="btn btn-lg btn-primary btn-block text-uppercase"
        											type="button"
        											onClick={this.handleSubmit}
        											>Sign Up</button>
        										</form>
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

export default Signup;
