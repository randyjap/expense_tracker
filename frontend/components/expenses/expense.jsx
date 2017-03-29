import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import ExpenseItem from './expense_item';

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
    if (expenseList) {
      expenseList = expenseList.map(expenseObject => {
        return (
          <ExpenseItem key={expenseObject.id}
            destroyExpense={this.props.destroyExpense}
            item={expenseObject} />
        );
      });
    }

    return (
      <div>
        <table>
          <tr>
           <th>Date</th>
           <th>Amount</th>
           <th>Description</th>
           <th>Edit</th>
           <th>Delete</th>
         </tr>
          { expenseList }
        </table>
      </div>
    );
  }
}

export default Expense;
