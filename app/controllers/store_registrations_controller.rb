class StoreRegistrationsController < Devise::RegistrationsController
  before_action :authenticate_user!, except:[:edit]

  def new
    if store_signed_in?
    flash[:custom] = "You Need to sign out of current store to create a new one"
    end
    @store = Store.new
    set_admin
  end
  
  # POST /resource
  def create
    @user = User.find(current_user.id)
    @store = @user.store.create(store_params.merge(subdomain:santize(params[:store][:subdomain]),layout_id:1,store_color:'#fc711b',homepage_status:true,aboutpage_status:true,manual_delivery_status:false,auto_delivery_status:false,collection_point_status:false,init:false,important:false,active:false))

    if @store.save
      flash[:notice] = "Your Store has been created! Login here"
      redirect_to(users_stores_path)
    else
      flash[:notice] = "Sorry, we couldnt create the store. Please contact admin"
    end
  end
  
    # GET /resource/edit
  def edit
    
  end


  
    def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource_updated
      if is_flashing_format?
        flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
          :update_needs_confirmation : :updated
        set_flash_message :notice, flash_key
      end
      bypass_sign_in resource, scope: resource_name
      respond_with resource, location: after_update_path_for(resource)
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
    end

  def kick_out
    sign_out :store
  end

  private

  def store_params
    params.require(:store).permit(:email, :username, :password, :password_confirmation, :active, :name, :display_email, :phone)
  end



  def santize(name)
    lower = name.downcase
    nospace = lower.gsub(/[^0-9a-z]/i, "")
    return nospace
  end

end