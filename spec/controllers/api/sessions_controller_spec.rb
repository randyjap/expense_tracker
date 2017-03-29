require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  let!(:user) { User.create({ :username => "user", :password => "password" }) }

  describe "CSRF protection" do
    it "protects from forgery" do
      expect(ApplicationController.new.forgery_protection_strategy).not_to be_nil
    end
  end

  context "JSON" do
    describe "signing in" do
      context "when NOT authorized" do
        it "should NOT allow sign in" do
          post :create, params: { user: { :username => "foo", :password => "bar" } }
          expect(response.status).to eq(403)
        end
      end

      context "when authorized" do
        it "should allow sign in" do
          post :create, params: { user: { :username => "user", :password => "password" } }
          expect(response.status).to eq(200)
          user = User.find_by_username("user")
          expect(session[:session_token]).to eq(user.session_token)
        end
      end
    end

    describe "signing out" do
      context "when signed in" do
        it "should sign out" do
          post :create, params: { user: { :username => "user", :password => "password" } }
          post :destroy
          expect(response.status).to eq(200)
          user = User.find_by_username("user")
          expect(session[:session_token]).to_not eq(user.session_token)
        end
      end

      context "when NOT signed in" do
        it "should NOT sign out" do
          post :destroy
          expect(response.status).to eq(404)
        end
      end
    end
  end
end
