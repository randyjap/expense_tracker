import { connect } from 'react-redux';
import Expense from './expense';
import { createExpense, updateExpense,
  fetchExpense, fetchAllExpenses,
  destroyExpense } from '../../actions/expenses_actions';

const mapStateToProps = state => ({
  expenses: state.expenses,
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  fetchAllExpenses: () => dispatch(fetchAllExpenses()),
  fetchExpense: (id) => dispatch(fetchExpense(id)),
  destroyExpense: (id) => dispatch(destroyExpense(id)),
  createExpense: (id) => dispatch(createExpense(id)),
  updateExpense: (id) => dispatch(updateExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
