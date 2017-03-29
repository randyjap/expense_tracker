Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy, :show]
    resources :users, only: [:create, :show]
    resources :expenses
  end
end
