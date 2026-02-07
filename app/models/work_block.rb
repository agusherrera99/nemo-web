class WorkBlock < ApplicationRecord
  validates :seconds, numericality: { other_than: 0, only_integer: true }, presence: true
end
