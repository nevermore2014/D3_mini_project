class LinesController < ApplicationController
  def index
    @lines = Line.all
    respond_to do |format|
      format.html
      format.json { render json: @lines, root: false }
    end
  end
end
