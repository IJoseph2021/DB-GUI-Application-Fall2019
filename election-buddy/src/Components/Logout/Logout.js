import React from 'react';


class Logout extends React.Component {
	constructor(props) {
		super(props);

    if(this.props.loginState){
      localStorage.removeItem("token")
      this.props.updateLoginState();
    }
    this.props.history.push('/login')
	}


    render() {
      return (
        <div></div>
      );
    }
}


export default Logout;
