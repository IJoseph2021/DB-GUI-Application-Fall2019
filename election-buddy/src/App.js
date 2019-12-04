import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  { Redirect } from 'react-router-dom';
import UserFunctions from './API/UserFunctions';
import Nav from './Components/NavBar/Nav'
import Footer from './Components/Footer/Footer';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import UserProfile from './Components/ProfilePage/UserProfile';
import Logout from './Components/Logout/Logout';
import Candidate from './Components/CandidateCards/Candidate';
import CandidatePage from './Components/CandidateCards/CandidatePage';
import ChangePassword from './Components/ProfilePage/ChangePassword';
import News from './Components/News/News';
import Support from './Components/Support/Support';

class App extends React.Component {
	userFuncs = new UserFunctions();

	constructor(props) {
		super(props);

		this.state = {
			userId: "",
			loginState: !!localStorage.getItem('token'),
			role: []
		}
		this.updateLoginState = this.updateLoginState.bind(this);
	}


	updateLoginState = () => {
		if(localStorage.getItem('token')){
			this.setState({
					loginState: true,
					userId: localStorage.getItem('token')
			});
		}
		else{
			this.setState({
				loginState: false
			});
		}

		this.userFuncs.getRoles(localStorage.getItem('token')).then(res => {
			console.log("Roles: ", res)
			if(!res){
				this.setState({ role: [...this.state.role, "Not Applicable"] });
			}
			else {
				this.setState({ role: Object.keys(res)})
				}
		})
		.catch(err => {
			//error caught here

		});
	};

	render() {
		return (
			<div>
      <Router>
      <Nav loginState={this.state.loginState} role={this.state.role}/>
				<div className="main-content">
					<Switch>
					<Route exact path="/logout" render={(props) => <Logout {...props} loginState={this.state.loginState} updateLoginState={this.updateLoginState}/>}/>
	          <Route exact path="/" render={() => (
	            this.state.loginState ? (
	              <Homepage/>
	            ) : (
					<Redirect to="/login"/>
	            )
	          )}/>
						{/*this.state.loginState && <Route path="/candidate" exact component={(props) => <CandidatePage {...props} userId={this.state.userId}/>}/>*/}
						{this.state.loginState && <Route path="/support" exact component={Support} />}
						{this.state.loginState && <Route path="/candidate/:id" exact component={CandidatePage} />}
						{this.state.loginState && <Route path="/" exact component={Homepage} />}
						{this.state.loginState && <Route path="/news" exact component={News} />}
						{!this.state.loginState && <Route exact path="/login" render={(props) => <Login {...props} updateLoginState={this.updateLoginState}/>}/>}
						{/*!this.state.loginState && <Route exact path="/login" render={(props) => <Login {...props} updateLoginState={this.updateLoginState}/>}/>*/}
						{!this.state.loginState && <Route exact path="/registration" exact component={Signup}/>}
						{this.state.loginState && <Route path="/profile" exact component={(props) => <UserProfile {...props} userId={this.state.userId}/>}/>}/>}
						{this.state.loginState && <Route path="/changepwd" exact component={(props) => <ChangePassword {...props} userId={this.state.userId}/>}/>}/>}
					</Switch>
				</div>
			<Footer/>
      </Router>
			</div>
		);
	}
}

export default App;
