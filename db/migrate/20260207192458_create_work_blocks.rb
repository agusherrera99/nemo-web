class CreateWorkBlocks < ActiveRecord::Migration[8.0]
  def change
    create_table :work_blocks do |t|
      t.integer :seconds

      t.timestamps
    end
  end
end
