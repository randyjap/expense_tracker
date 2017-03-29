require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe "CSRF protection" do
    it "protects from forgery" do
      expect(ApplicationController.new.forgery_protection_strategy).not_to be_nil
    end
  end

  context "JSON" do
    describe "creating new user" do
      context "when providing correct information" do
        it "should create new user" do
          post :create, params: { user: { :username => "user", :password => "password" } }
          expect(response.status).to eq(200)
          user = User.find_by_username("user")
          expect(session[:session_token]).to eq(user.session_token)
        end
      end

      context "when NOT providing correct information" do
        it "should NOT create a new user" do
          post :create, params: { user: { :username => "user", :password => "123" } }
          expect(response.status).to eq(422)
          expect(User.find_by_username("user")).to eq(nil)
        end
      end
    end
  end
end
