import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import errorReducer from './error_reducer';
import expensesReducer from './expenses_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer,
  expenses: expensesReducer
});

export default rootReducer;
