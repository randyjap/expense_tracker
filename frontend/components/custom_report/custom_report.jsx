import React from 'react';
import moment from 'moment';
import { values } from 'lodash';

class CustomReport extends React.Component {
  constructor(props) {
    super(props);
    this.renderCustomRangeReport = this.renderCustomRangeReport.bind(this);

    this.state = {
      startDate: "",
      endDate: ""
    };
  }

  componentDidMount(){
    this.props.fetchAllExpenses();
  }

  logChange(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
      console.log(this.state);
    };
  }

  renderCustomRangeReport(){
    let data;
    if (this.state.startDate === "" || this.state.endDate === "") {
      data = values(this.props.expenses);
    } else {
      data = (
        values(this.props.expenses)
          .filter( expense => (
            moment(expense.date)
              .isBetween(this.state.startDate, this.state.endDate)
      )));
    }
    let expenseItems;
    if (data) {
      expenseItems = data.map(item => {
        return (
          <tr>
            <td>{item.user_id}</td>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.amount}</td>
            <td>{item.description}</td>
          </tr>
        );
      });
    }
    return expenseItems;
  }

  render() {
    return (
      <div>
        <h1>Custom Range Report</h1>
        <input
           type='date'
           value={this.state.startDate}
           onChange={this.logChange("startDate")} />
        <input
          type='date'
          value={this.state.endDate}
          onChange={this.logChange("endDate")} />
          <table>
            <tr>
             <th>User ID</th>
             <th>Expense ID</th>
             <th>Date</th>
             <th>Amount</th>
             <th>Description</th>
           </tr>
            {this.renderCustomRangeReport()}
          </table>
      </div>
    );
  }
}

export default CustomReport;
