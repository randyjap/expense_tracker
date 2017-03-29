import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

class Expense extends React.Component{
  constructor(props){
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect(route){
    this.props.router.replace(route);
  }

  render(){
    return (
      <div>
      </div>
    );
  }
}

export default Expense;
