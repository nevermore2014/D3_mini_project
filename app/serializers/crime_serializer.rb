class CrimeSerializer < ActiveModel::Serializer
  attributes :district, :district_code, :crime_desc, :street_name
end
