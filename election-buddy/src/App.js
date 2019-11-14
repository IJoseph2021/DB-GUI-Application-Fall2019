import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  { Redirect } from 'react-router-dom';
import Nav from './Components/NavBar/Nav'
import Footer from './Components/Footer/Footer';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import UserProfile from './Components/ProfilePage/UserProfile';
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loginState: !!localStorage.getItem('token')
		}
		this.updateLoginState = this.updateLoginState.bind(this);
	}

	updateLoginState = () => {
		if(localStorage.getItem('token')){
			this.setState({
					loginState: true
			});
		}
		else{
			this.setState({
				loginState: false
			});
		}
	};

	render() {
		return (
			<div>
      <Router>
      <Nav/>
				<Switch>
          <Route exact path="/" render={() => (
            this.state.loginState ? (
              <Homepage/>
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
					{this.state.loginState && <Route path="/" exact component={Homepage} />}
					{/*{!this.state.loginState && <Route exact path="/login" render={(props) => <Login {...props} updateLoginState={this.updateLoginState}/>}/>}*/}
					{!this.state.loginState && <Route exact path="/login" render={(props) => <Login {...props} updateLoginState={this.updateLoginState}/>}/>}
					{!this.state.loginState && <Route exact path="/registration" exact component={Signup}/>}
					{this.state.loginState && <Route path="/profile" exact component={UserProfile}/>}
				</Switch>
      </Router>
      <Footer/>
			</div>
		);
	}
}

export default App;
