import React from 'react';
import { Link } from 'react-router';
import * as APIUtil from '../../util/expenses_api_util';

var LineChart = require("react-chartjs").Line;

class Expense extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: "",
      amount: "",
      description: "",
      id: null
    };
    this.redirect = this.redirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.renderItemForm = this.renderItemForm.bind(this);
    this.fetchExpense = this.fetchExpense.bind(this);
    this.newExpenseItem = this.newExpenseItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  newExpenseItem(){
    this.setState({
      date: "",
      amount: "",
      description: "",
      id: null
    });
  }

  fetchExpense(id){
    APIUtil.fetchExpense(id)
      .then(expense => this.setState(expense));
  }

  deleteItem(id) {
    this.props.destroyExpense(id);
    this.newExpenseItem();
  }

  handleEdit(id) {
    this.fetchExpense(id);
    document.getElementById("date").focus();
    $('html,body').animate({ scrollTop: $("#date").offset().top}, 'slow');
  }

  handleSubmit() {
    if (this.state.id) {
      this.props.updateExpense(this.state);
    } else {
      this.props.createExpense(this.state);
    }
    this.newExpenseItem();
  }

  componentDidMount(){
    this.props.fetchAllExpenses();
  }

  redirect(route){
    this.props.router.replace(route);
  }

  renderItemForm(){
    return (
      <form>
        <input
          type="submit" value="Reset to Create New Item"
          onClick={this.newExpenseItem}/>
        <br />
        <label>{"Date"}</label>
        <input
          type="date"
          value={this.state.date}
          placeholder="Date"
          onChange={this.handleChange("date")} />
        <br />
        <label>{"Amount"}</label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.handleChange("amount")} />
        <br />
        <label>{"Description"}</label>
        <input
          type="text"
          value={this.state.description}
          placeholder="Description"
          onChange={this.handleChange('description')} />
        <br />
        <input
          type="submit" value={this.state.id ? "Update" : "Create"}
          onClick={this.handleSubmit}/>
      </form>
    );
  }

  render(){
    let expenseList = this.props.expenses["expenses"];
    let expenseItems;
    let datapoints = [];
    let labels = [];
    if (expenseList) {
      expenseItems = expenseList.map(item => {
        return (
          <tr>
            <td>{item.user_id}</td>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.amount}</td>
            <td>{item.description}</td>
            <td><button
              onClick={() => this.handleEdit(item.id)}>Edit</button></td>
            <td><button
              onClick={() => this.deleteItem(item.id)}>
              Delete</button></td>
          </tr>
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
        <LineChart width={"1200px"} height={"500px"}
          redraw={true} data={data} />
        <h1 id="date">{this.state.id ?
            "Edit Existing Expense ID: " + this.state.id :
            "Create New Expense"}</h1>
          {this.renderItemForm()}
        <table>
          <tr>
           <th>User ID</th>
           <th>Expense ID</th>
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
