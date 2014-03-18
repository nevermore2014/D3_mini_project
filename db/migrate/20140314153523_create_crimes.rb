class CreateCrimes < ActiveRecord::Migration
  def change
    create_table :crimes do |t|
      t.string :district
      t.string :district_code
      t.string :crime_desc
      t.string :street_name
    end
  end
end
