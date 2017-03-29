class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login(@user)
      render "api/users/show.json.jbuilder", status: 200
    else
      render json: ["not authorized"], status: 403
    end
  end

  def destroy
    @user = current_user

    if @user
      logout
      render "api/users/show.json.jbuilder", status: 200
    else
      render json: ["not signed in"], status: 404
    end
  end
end
