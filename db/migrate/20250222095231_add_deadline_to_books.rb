class AddDeadlineToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :deadline, :datetime
  end
end
