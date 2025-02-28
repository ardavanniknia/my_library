Rails.application.routes.draw do
  resources :books, only: [:index, :new, :create, :edit, :update, :destroy]  
  root "books#index"
end