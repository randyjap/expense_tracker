class Api::ExpensesController < ApplicationController
  before_action :require_login

  def index
    if current_user.admin
      @expenses = Expense.all.includes(:user)
    else
      @expenses = current_user.expenses.includes(:user)
    end
    render "api/expenses/index.json.jbuilder", status: 200
  end

  def show
    if current_user.admin
      @expense = Expense.find_by_id(params[:id])
      render "api/expenses/show.json.jbuilder", status: 200
    elsif current_user.expenses.find_by_id(params[:id])
      @expense = current_user.expenses.find_by_id(params[:id])
      render "api/expenses/show.json.jbuilder", status: 200
    else
      render json: ["not found"], status: 404
    end
  end

  def create
    @expense = Expense.new(expense_params)
    @expense.user = current_user

    if @expense.save
      render "api/expenses/show.json.jbuilder", status: 200
    else
      render json: @expense.errors.full_messages, status: 422
    end
  end

  def edit
    @expense = current_user.expenses.find_by_id(params[:id])

    if @expense && @expense.update(expense_params)
      render "api/expenses/edit.json.jbuilder"
    else
      render json: ["not authorized"], status: 422
    end
  end

  def update
    @expense = current_user.expenses.find_by_id(params[:id])

    if @expense && @expense.update(expense_params)
      render "api/expenses/show.json.jbuilder"
    else
      render json: ["not authorized"], status: 422
    end
  end

  def destroy
    @expense = current_user.expenses.find_by_id(params[:id])
    @expense.destroy

    render json: @expense, status: 200
  end

  private

  def expense_params
    params.require(:expense).permit(:date, :amount, :description)
  end
end
