# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(
  username: "user",
  password: "password"
)

admin = User.create(
  username: "admin",
  password: "password",
  admin: true
)

50.times do
  Expense.create(
    user: user,
    date: Faker::Time.between(30.days.ago, Date.today, :all),
    amount: Faker::Number.decimal(2),
    description: Faker::Food.ingredient
  )
end

50.times do
  Expense.create(
    user: admin,
    date: Faker::Time.between(30.days.ago, Date.today, :all),
    amount: Faker::Number.decimal(2),
    description: Faker::Food.ingredient
  )
end
