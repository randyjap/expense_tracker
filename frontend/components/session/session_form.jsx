import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        username: "",
        password: ""
    };
    this.updateProperty = this.updateProperty.bind(this);
    this.redirect = this.redirect.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    this.props.clearSessionErrors();
  }

  redirect(route){
    this.props.router.replace(route);
    this.props.clearSessionErrors();
  }

  signup(e){
    e.preventDefault();
    const user = this.state;
    this.props.signup({user})
      .then(() => this.redirect('theater')
    );
  }

  login(e){
    e.preventDefault();
    const user = this.state;
    this.props.login({user})
      .then(() => this.redirect('theater')
    );
  }

  updateProperty(property){
    return e => this.setState({ [property]: e.target.value });
  }

  demoLogin() {
    const username = "Guest";
    const password = "password";
    let counter = 0;
    const typer = () => {
      counter++;
      this.setState({ username: username.slice(0, counter) });
      if (counter === username.length) {
        this.setState({ password });
        clearInterval(animation);
        this.props.login({user: {username, password} }).then(() => this.redirect('theater'));
      }
    };
    const animation = setInterval(typer, 70);
  }

  render(){
    let style = {
      backgroundColor: "red",
      position: "absolute",
      right: "25px",
      top: "20px",
      color: "white"
    };

    return(
      <div className="main-session-splash">
        <div className="splash-nav">
          <Link to="/">
            <img className="logo" src="http://res.cloudinary.com/dkympkwdz/image/upload/v1488680995/gct-logo_blthd0.png"/>
          </Link>
        </div>
        <div className="login-form">
          <h1 className="session-form-header">Sign In</h1>
            <TextField style={{width: 360, marginTop: 10}} autoFocus hintText="Enter Username" floatingLabelText="Username" value={this.state.username} onChange={this.updateProperty('username')} required /><br />
            <TextField style={{width: 360, marginBottom: 40}} errorText={this.props.errors.join(" and ")} hintText="Enter Password" floatingLabelText="Password" type="password" value={this.state.password} onChange={this.updateProperty('password')} required /><br />
            <div><RaisedButton label="Login" onClick={this.login} style={{margin: 12, width: 350}} /></div>
            <div><RaisedButton label="Signup" onClick={this.signup} style={{margin: 12, width: 350}} /></div>
            <Divider />
            <div><RaisedButton label="Demo" onClick={this.demoLogin} secondary={true} style={{margin: 12, width: 350}} /></div>
        </div>
      </div>
    );
  }
}

export default SessionForm;
