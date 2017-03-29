export const createExpense = expense => (
  $.ajax({
    method: 'POST',
    url: `/api/expenses`,
    data: { expense }
  })
);

export const fetchAllExpenses = () => (
  $.ajax({
    method: 'GET',
    url: '/api/expenses'
  })
);

export const fetchExpense = id => (
  $.ajax({
    method: 'POST',
    url: `/api/expenses/${id}`
  })
);

export const updateExpense = expense => (
  $.ajax({
    method: 'PATCH',
    url: `/api/expenses/${expense.id}`,
    data: { expense }
  })
);

export const destroyExpense = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/expenses/${id}`
  })
);
