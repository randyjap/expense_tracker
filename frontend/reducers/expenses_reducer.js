import { RECEIVE_EXPENSES,
         RECEIVE_EXPENSE } from '../actions/expenses_actions';
import { merge } from 'lodash';

const expensesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_EXPENSES:
      return action.expenses;
    case RECEIVE_EXPENSE:
      return merge({}, state, {
        [action.expense.id]: action.expense
      });
    default:
      return state;
  }
};

export default expensesReducer;
