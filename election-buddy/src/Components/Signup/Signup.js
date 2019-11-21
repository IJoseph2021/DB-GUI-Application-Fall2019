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
        var roles = ["","Not Applicable", "Voter", "Candidate"];

        return (
            <div className="signup-page">
            { this.state.validateForm ?  "":<div className="invalid-signup">Password fields don't match. Please try again</div> }

            { this.state.signUpSuccess ?  <div className="invalid-signup">Invalid Registration. Please try again.</div>:"" }
                <div>
                    <h3 className="signup-heading">Create your Account</h3>
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

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                value={this.state.confirmPassword}
                                id="confirmPassword"
                                className="form-control"
                                type="password"
                                onChange={event => this.setState({ confirmPassword: event.target.value })}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="fname">First Name:</label>
                            <input
                                value={this.state.fname}
                                id="fname"
                                className="form-control"
                                type="text"
                                onChange={event => this.setState({ fname: event.target.value })}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lname">Last Name:</label>
                            <input
                            value={this.state.lname}

                                id="lname"
                                className="form-control"
                                type="text"
                                onChange={event => this.setState({ lname: event.target.value })}
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
                        <button
                            type="button"
                            onClick={this.handleSubmit}
                            className="form-button"
                        >Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;
