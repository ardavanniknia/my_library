require 'net/http'
require 'json'

class BooksController < ApplicationController
  before_action :authenticate_user!

  def index
    if params[:query].present?
      @books = current_user.books.where("title LIKE ? OR author LIKE ?", "%#{params[:query]}%", "%#{params[:query]}%")
    else
      @books = current_user.books
    end
  end

  def new
    @book = Book.new
  end

  def create
    @book = current_user.books.new(book_params)
  
    if @book.save
      redirect_to books_path, notice: "Book added successfully!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @book = current_user.books.find(params[:id])
  end

  def update
    @book = current_user.books.find(params[:id])
    if @book.update(book_params)
      redirect_to books_path, notice: "Book was successfully updated!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @book = current_user.books.find(params[:id])
    @book.destroy
    redirect_to books_path, notice: "Book was successfully deleted."
  end
  
  def show
    @book = current_user.books.find(params[:id])
  end

  def search
    @results = [] # مقدار پیش‌فرض برای جلوگیری از nil

    if params[:query].present?
      @results = search_books(params[:query])
    end
  end
  
  private
  
  def search_books(query)
    url = "https://openlibrary.org/search.json?q=#{URI.encode_www_form_component(query)}"
    response = Net::HTTP.get(URI(url))
    puts "API Response: #{response}" # لاگ گرفتن از پاسخ API
    data = JSON.parse(response)

    data["docs"].map do |book|
      {
        title: book["title"],
        author: book["author_name"]&.join(", "),
        summary: book["first_sentence"]&.join(" ") || "No summary available."
      }
    end
  end

  def book_params
    params.require(:book).permit(:title, :author, :summary, :deadline)
  end
end