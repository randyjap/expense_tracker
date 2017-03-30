import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

class Nav extends React.Component{
  constructor(props){
    super(props);
    this.signout = this.signout.bind(this);
  }

  redirect(route){
    this.props.router.replace(route);
  }

  signout(){
    this.props.logout().then(() => this.props.router.replace('/'));
  }

  render(){
    let navButtons;
    if (this.props.currentUser === null) {
      navButtons = (
        <div>
          <FlatButton label="Sign In" onClick={() => this.redirect('login')} />
        </div>
      );
    } else {
      navButtons = (
        <div>
          <FlatButton label="Sign Out" onClick={this.signout} />
          <FlatButton label="All Expenses"
            onClick={() => this.redirect('expenses')} />
          <FlatButton label="Weekly Report"
            onClick={() => this.redirect('weekly_report')} />
          <FlatButton label="Custom Report"
            onClick={() => this.redirect('custom_report')} />
        </div>
      );
    }

    return (
      <div>
        { navButtons }
      </div>
    );
  }
}

export default Nav;
