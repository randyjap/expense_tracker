import React from 'react';
import moment from 'moment';
import { values } from 'lodash';

class WeeklyReport extends React.Component {
  constructor(props) {
    super(props);
    this.prepareWeeklyReport = this.prepareWeeklyReport.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllExpenses();
  }

  prepareWeeklyReport() {
    let weeklyTotals = {};

    values(this.props.expenses).forEach( expense => {
      let date = moment(expense.date).format("MMDDYYYY");
      let year = moment(date, 'MMDDYYYY').year();
      let week = moment(date, "MMDDYYYY").isoWeek();

      let key = String(year) + String(week);
      if (weeklyTotals[key]) {
        let currentTotal = weeklyTotals[key][2] + expense.amount;
        weeklyTotals[key] = [year, week, currentTotal];
      } else {
        weeklyTotals[key] = [year, week, expense.amount];
      }
    });

    return Object.keys(weeklyTotals).reverse().map(key => (
      <tr>
        <td>{weeklyTotals[key][0]}</td>
        <td>{weeklyTotals[key][1]}</td>
        <td>{weeklyTotals[key][2].toFixed(2)}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <h1>Weekly Totals</h1>
        <table>
          <tr>
            <th>Year</th>
            <th>Week</th>
            <th>Total</th>
          </tr>
          {this.prepareWeeklyReport()}
        </table>
      </div>
    );
  }
}

export default WeeklyReport;
