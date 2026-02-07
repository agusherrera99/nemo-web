class Task < ApplicationRecord
  belongs_to :work_block, optional: true

  normalizes :title, :description, with: ->(e) { e.strip.downcase }

  validates :title, length: { maximum: 100 }, presence: true
  validates :description, length: { maximum: 500 }, presence: true

  enum :status, [ :progress, :pending, :completed ], default: :pending
end
