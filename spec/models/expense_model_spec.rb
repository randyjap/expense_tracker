require 'rails_helper'

RSpec.describe Expense, :type => :model do

  describe "shouldas" do
    it { should validate_presence_of(:user) }
    it { should validate_presence_of(:date) }
    it { should validate_presence_of(:amount) }
    it { should belong_to(:user) }
  end
end
