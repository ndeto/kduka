class Product < ActiveRecord::Base
  belongs_to :store
  has_many :order_items
  validates :name, :price, :category_id,:quantity, presence: true
  after_initialize :init


  mount_uploader :image, AvatarUploader
  mount_uploader :img1, Img1Uploader



  def init
    self.viewed  ||= 0
    self.number_sold ||= 0
  end

  #default_scope { where(active: true) }
end
