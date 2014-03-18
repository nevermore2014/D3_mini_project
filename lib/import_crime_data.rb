require 'csv'
require 'pry'
require 'crimes'

class ImportCrime
  def self.import
    data = CSV.read("#{Rails.root}/data/Crime_Incident_Reports_sort_by_dist.csv")
    district_array = []
    crime_array = []
    data.each do |row|
      Crime.create!(district: row[0], district_code: row[1], crime_desc: row[2], street_name: row[3])
      if !district_array.include?(row[0])
        district_array << row[0]
      end
      if !crime_array.include?(row[2])
        crime_array << row[2]
      end
    end

    district_array.each do |dis|
      line = {}
      crime_array.each do |cri|
        line[cri] = 0
      end
      data.each do |row|
        if dis == row[0]
          line[row[2]] += 1
        end
      end
      line.each do |k, v|
        if v > 80
          Line.create!(district: dis, crime_type: k)
        end
      end
    end
  end
end