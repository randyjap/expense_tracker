import React from 'react';
import moment from 'moment';
import { values } from 'lodash';

class CustomReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Weekly Totals</h1>
        <table>
          <tr>
            <th>Year</th>
            <th>Week Number</th>
            <th>Total</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default CustomReport;
