import { connect } from 'react-redux';
import Expense from './expense';
import { fetchAllExpenses, destroyExpense } from '../../actions/expenses_actions';

const mapStateToProps = state => ({
  expenses: state.expenses,
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  fetchAllExpenses: () => dispatch(fetchAllExpenses()),
  destroyExpense: (id) => dispatch(destroyExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
