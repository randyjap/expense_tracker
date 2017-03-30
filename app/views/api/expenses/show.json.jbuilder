json.id @expense.id
json.user_id @expense.user.id
json.amount @expense.amount
json.description @expense.description
json.date @expense.date.strftime("%Y-%m-%d")
