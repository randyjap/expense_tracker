import { RECEIVE_EXPENSES } from '../actions/expenses_actions';
import { merge } from 'lodash';

const expensesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_EXPENSES:
      return action.expenses;
    default:
      return state;
  }
};

export default expensesReducer;
