require 'rails_helper'

RSpec.describe User, :type => :model do

  describe "shouldas" do
    it { should validate_length_of(:password).is_at_least(6) }
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:session_token) }
    it { should have_many(:expenses) }
  end
end
