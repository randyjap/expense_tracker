json.expenses @expenses do |expense|
  json.id expense.id
  json.amount expense.amount
  json.description expense.description
  json.date expense.date.strftime("%b %d, %Y")
end.sort_by! { |k, _| k["date"] }.reverse!
