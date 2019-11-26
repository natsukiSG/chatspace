Rails.application.routes.draw do
  root to: "messages#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :update] do
  resources :messages, only: [:index, :create, :destroy]
  end
end
