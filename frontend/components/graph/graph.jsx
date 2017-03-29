import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
var LineChart = require("react-chartjs").Line;
var data = {
  labels: ["13", "14", "15", "16", "17", "18", "19"],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
    }
  ]
};

class Graph extends React.Component{
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
        <LineChart data={data} width="600" height="250"/>
      </div>
    );
  }
}

export default Graph;
