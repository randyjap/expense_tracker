class Expense < ApplicationRecord
  validates :user, :date, :amount, presence: true
  belongs_to :user
end
