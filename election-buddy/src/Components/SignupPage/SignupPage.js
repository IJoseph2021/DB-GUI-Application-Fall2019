import React, { Component } from 'react';
import './SignupPage.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserFunctions from '../../API/UserFunctions';

class SignupPage extends Component {
    userFuncs = new UserFunctions();
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            comfirmPassword: "",
            fname: "",
            lname: "",
            email: ""
        };
    }

    validateForm() {
        return (
            this.state.username.length > 0 &&
            this.state.password > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = {
            user_name: this.state.username,
            user_password: this.state.password,
            user_fname: this.state.fname,
            user_lname: this.state.lname,
            user_email: this.state.email
        };
    }

    render() {

        return (
            <div className="signup-page">
                <div>
                    <h3 className="signup-heading">Create your Account</h3>
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
                            <label htmlFor="userPassword">Password:</label>
                            <input
                                id="password"
                                className="form-control"
                                type="password"
                                onChange={event => this.setState({ password: event.target.value })}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                id="confirmPassword"
                                className="form-control"
                                type="password"
                                onChange={event => this.setState({ confirmPassword: event.target.value })}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="fname">First Name:</label>
                            <input
                                id="fname"
                                className="form-control"
                                type="text"
                                onChange={event => this.setState({ fname: event.target.value })}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lname">Last Name:</label>
                            <input
                                id="lname"
                                className="form-control"
                                type="text"
                                onChange={event => this.setState({ lname: event.target.value })}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                className="form-control"
                                type="text"
                                onChange={event => this.setState({ email: event.target.value })}
                            ></input>
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                        >Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignupPage;
