import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import ExpenseItem from './expense_item';

var LineChart = require("react-chartjs").Line;

class Expense extends React.Component{
  constructor(props){
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllExpenses();
  }

  redirect(route){
    this.props.router.replace(route);
  }

  render(){
    let expenseList = this.props.expenses["expenses"];
    let expenseItems;
    let datapoints = [];
    let labels = [];
    if (expenseList) {
      expenseItems = expenseList.map(expenseObject => {
        return (
          <ExpenseItem key={expenseObject.id}
            destroyExpense={this.props.destroyExpense}
            item={expenseObject} />
        );
      });
      datapoints = expenseList.map(expenseObject => expenseObject.amount);

      let mod = Math.round(expenseList.length / 10);
      for (let i = 0; expenseList.length > i; i++) {
        if (i % mod == 0) {
          labels.push(expenseList[i].date);
        } else {
          labels.push("");
        }
      }
    }

    let data = {
      labels: labels,
      datasets: [
        {
          data: datapoints
        }
      ]
    };

    return (
      <div>
        <LineChart width={"1200px"} height={"500px"} redraw={true} data={data} />
        <table>
          <tr>
           <th>Date</th>
           <th>Amount</th>
           <th>Description</th>
           <th>Edit</th>
           <th>Delete</th>
         </tr>
          { expenseItems }
        </table>
      </div>
    );
  }
}

export default Expense;
