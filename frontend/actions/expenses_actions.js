import * as APIUtil from '../util/expenses_api_util';
import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const RECEIVE_EXPENSE = 'RECEIVE_EXPENSE';

export const receiveExpenses = expenses => ({
  type: RECEIVE_EXPENSES,
  expenses
});

export const receiveExpense = expense => ({
  type: RECEIVE_EXPENSE,
  expense
});

export const createExpense = data => dispatch => (
  APIUtil.createExpense(data)
  .then(expense => dispatch(receiveExpense(expense)))
  .fail(err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchAllExpenses = () => dispatch => (
  APIUtil.fetchAllExpenses()
    .then(expenses => dispatch(receiveExpenses(expenses)))
    .fail(err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchExpense = id => dispatch => (
  APIUtil.fetchExpense(id)
    .then(expense => dispatch(receiveExpense(expense)))
    .fail(err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateExpense = data => dispatch => (
  APIUtil.updateExpense(data)
    .then(expense => dispatch(receiveExpense(expense)))
    .fail(err => dispatch(receiveErrors(err.responseJSON)))
);

export const destroyExpense = id => dispatch => (
  APIUtil.destroyExpense(id)
    .then(() => dispatch(fetchAllExpenses()))
    .fail(err => dispatch(receiveErrors(err.responseJSON)))
);
