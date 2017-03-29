class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.integer :user_id, null: false
      t.datetime :date, null: false
      t.float :amount, precision: 10, scale: 2
      t.string :description, null: false
      t.timestamps
    end
  end
end
