  class CrimesController < ApplicationController
  def index
    @crimes = Crime.all
    respond_to do |format|
      format.html
      format.json { render json: @crimes, root: false}
    end
  end
end
