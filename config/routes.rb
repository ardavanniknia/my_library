Rails.application.routes.draw do
  devise_for :users
  resources :books, only: [:index, :new, :create, :edit, :update, :destroy]  
  root "books#index"
  get 'search', to: 'books#search', as: 'search_books'
end