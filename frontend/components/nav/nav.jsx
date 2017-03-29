import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

class Nav extends React.Component{
  constructor(props){
    super(props);
    this.redirect = this.redirect.bind(this);
    this.signout = this.signout.bind(this);
  }

  redirect(route){
    this.props.router.replace(route);
  }

  signout(){
    this.props.logout();
    this.props.router.replace('/');
  }

  render_signin(){
    return (
      <FlatButton label="Sign In" onClick={() => this.redirect('login')} />
    );
  }

  render_signout(){
    return (
      <FlatButton label="Sign Out" onClick={this.signout} />
    );
  }

  render(){
    let navButton;
    if (this.props.currentUser == null) {
      navButton = this.render_signin();
    } else {
      navButton = this.render_signout();
    }

    return (
      <div>
        <div>
          { navButton }
        </div>
      </div>
    );
  }
}

export default Nav;
