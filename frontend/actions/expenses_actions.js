import * as APIUtil from '../util/expenses_api_util';
import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const RECEIVE_EXPENSE = 'RECEIVE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const receiveExpenses = expenses => ({
  type: RECEIVE_EXPENSES,
  expenses
});

export const receiveExpense = expense => ({
  type: RECEIVE_EXPENSE,
  expense
});

export const removeExpense = expense => ({
  type: REMOVE_EXPENSE,
  expense
});

export const createExpense = data => dispatch => (
  APIUtil.createExpense(data)
  .then(expense => dispatch(receiveExpense(expense)))
  .fail(err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchAllExpenses = () => dispatch => (
  APIUtil.fetchAll.Expenses()
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
    .then(expense => dispatch(removeExpense(expense)))
    .fail(err => dispatch(receiveErrors(err.responseJSON)))
);
