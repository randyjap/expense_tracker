import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Graph from '../graph/graph_container';

class Expense extends React.Component{
  constructor(props){
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount(){
    this.props.receiveExpenses();
  }

  redirect(route){
    this.props.router.replace(route);
  }

  render(){
    return (
      <div>
        <Graph />
      </div>
    );
  }
}

export default Expense;
