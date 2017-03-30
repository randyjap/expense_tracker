import { connect } from 'react-redux';
import CustomReport from './custom_report';
import { fetchAllExpenses } from '../../actions/expenses_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  expenses: state.expenses.expenses
});

const mapDispatchToProps = dispatch => ({
  fetchAllExpenses: () => dispatch(fetchAllExpenses())
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomReport);
