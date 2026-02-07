class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :title, limit: 100
      t.string :description, limit: 500
      t.integer :status

      t.timestamps
    end
  end
end
