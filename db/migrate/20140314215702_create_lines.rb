class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.string :district
      t.string :crime_type
    end
  end
end
