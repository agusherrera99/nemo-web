class WorkBlocksController < ApplicationController
  def finish
    @total_seconds = params[:total_seconds]
    work_block = WorkBlock.create!(seconds: @total_seconds)
    redirect_to root_path, notice: "Sesión finalizada con #{work_block.seconds} segundos."
  end
end
