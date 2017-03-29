import { connect } from 'react-redux';
import Graph from './graph';
import { receiveExpenses } from '../../actions/expenses_actions';

const mapStateToProps = state => ({
  expenses: state.expenses
});

const mapDispatchToProps = dispatch => ({
  receiveExpenses: (expenses) => dispatch(receiveExpenses(expenses))
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
