import React from 'react';
import { Link } from 'react-router';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(id) {
    this.props.destroyExpense(id);
  }

  render() {
    let item = this.props.item;
    return (
     <tr>
       <td>{item.date}</td>
       <td>{item.amount}</td>
       <td>{item.description}</td>
       <td><button>Edit</button></td>
       <td><button
         onClick={() => this.props.destroyExpense(item.id)}>
         Delete</button></td>
     </tr>
    );
  }
}

export default ExpenseItem;
