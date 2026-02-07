class WorkBlocksController < ApplicationController
  def finish
    @total_seconds = params[:total_seconds]
    redirect_to root_path, notice: "Sesión finalizada con #{@total_seconds} segundos."
  end
end
