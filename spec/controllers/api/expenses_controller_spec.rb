require 'rails_helper'

RSpec.describe Api::ExpensesController, type: :controller do
  let(:user) { User.create!(username: "user", password: "password") }
  let(:admin) { User.create!(username: "admin", password: "password", admin: true) }
  let(:expense) { Expense.create!(user: user, date: Time.now, amount: 100, description: "dinner") }

  describe "CSRF protection" do
    it "protects from forgery" do
      expect(ApplicationController.new.forgery_protection_strategy).not_to be_nil
    end
  end

  describe "GET #index" do
    context "when logged in" do
      before do
        allow(controller).to receive(:current_user) { user }
      end

      it "successfully renders index" do
        get :index
        expect(response.status).to eq 200
      end
    end

    context "when NOT logged in" do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it "successfully renders index" do
        get :index
        expect(response.status).to eq 401
      end
    end
  end

  describe "POST #create" do
    context "when logged in" do
      before do
        allow(controller).to receive(:current_user) { user }
      end

      it "allows users to save new expenses with correct information" do
        post :create, params: { expense: { :user => user, :date => Time.now, :amount => 100, :description => "dinner" } }
        expect(response.status).to eq 200
      end

      it "DOESN'T allow users to save new expenses with MISSING information" do
        post :create, params: { expense: { :user => user, :date => Time.now, :description => "dinner" } }
        expect(response.status).to eq 422
      end
    end

    context "when NOT logged in" do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it "DOESN'T allow users to save new expenses" do
        post :create, params: { expense: { :user => user, :date => Time.now, :amount => 100, :description => "dinner" } }
        expect(response.status).to eq 401
      end

      it "DOESN'T allow users to save new expenses with MISSING information" do
        post :create, params: { expense: { :user => user, :date => Time.now, :description => "dinner" } }
        expect(response.status).to eq 401
      end
    end
  end

  describe "GET #show" do
    context "when logged in as owner" do
      before do
        allow(controller).to receive(:current_user) { user }
      end

      it "should allow owner to see expense" do
        id = expense.id
        get :show, params: { id:  id }
        expect(response.status).to eq 200
      end
    end

    context "when logged in as admin" do
      before do
        allow(controller).to receive(:current_user) { admin }
      end

      it "should allow owner to see expense" do
        id = expense.id
        get :show, params: { id:  id }
        expect(response.status).to eq 200
      end
    end

    context "when logged NOT logged in as owner" do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it "should NOT show expense" do
        id = expense.id
        get :show, params: { id:  id }
        expect(response.status).to eq 401
      end
    end
  end

  describe "PATCH #update" do
    context "when logged in as owner" do
      before do
        allow(controller).to receive(:current_user) { user }
      end

      it "should allow owner to update" do
        id = expense.id
        description = "birthday dinner"
        patch :update, params: { id:  id, expense: { :amount => 200, :description => description } }
        patched_expense = Expense.find(id)
        expect(patched_expense.amount).to eq(200)
        expect(patched_expense.description).to eq(description)
      end
    end

    context "when logged in as admin/ non-owner" do
      before do
        allow(controller).to receive(:current_user) { admin }
      end

      it "should NOT allow admin/ non-owner to update expenses" do
        id = expense.id
        description = "birthday dinner"
        patch :update, params: { id:  id, expense: { :amount => 200, :description => description } }
        unpatched_expense = Expense.find(id)
        expect(unpatched_expense.amount).to eq(100)
        expect(unpatched_expense.description).to eq("dinner")
        expect(response.status).to eq 422
      end
    end

    context "when logged NOT logged in" do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it "should NOT allow non-logged in users to update expenses" do
        id = expense.id
        description = "birthday dinner"
        patch :update, params: { id:  id, expense: { :amount => 200, :description => description } }
        unpatched_expense = Expense.find(id)
        expect(unpatched_expense.amount).to eq(100)
        expect(unpatched_expense.description).to eq("dinner")
        expect(response.status).to eq 401
      end
    end
  end
end
