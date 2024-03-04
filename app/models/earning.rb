# == Schema Information
#
# Table name: earnings
#
#  id                    :integer          not null, primary key
#  amount                :integer
#  ref                   :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  store_id              :integer
#  trans_id              :string
#  transaction_status_id :integer
#
# Indexes
#
#  index_earnings_on_store_id               (store_id)
#  index_earnings_on_transaction_status_id  (transaction_status_id)
#
# Foreign Keys
#
#  fk_rails_...  (store_id => stores.id)
#  fk_rails_...  (transaction_status_id => transaction_statuses.id)
#
class Earning < ApplicationRecord
  belongs_to :store
end
