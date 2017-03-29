import { connect } from 'react-redux';
import Expense from './expense';
import { receiveExpenses } from '../../actions/expenses_actions';

const mapStateToProps = state => ({
  expenses: state.expenses
});

const mapDispatchToProps = dispatch => ({
  receiveExpenses: (expenses) => dispatch(receiveExpenses(expenses))
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
