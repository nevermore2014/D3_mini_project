require_relative '../import_crime_data'
namespace :import do
  desc "Import my cirme data"
  task crime_data: :environment do
    ImportCrime.import
  end

  desc "Cleart my database"
  task clear_data: :environment do
    Crime.delete_all
  end

end
