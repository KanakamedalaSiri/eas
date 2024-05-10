define({
  
   /**
     * Login Form Pre show event.
     */
    preShow: function() {
        var configManager = applicationManager.getConfigManager();
        configManager.setPlatformID();
        var commonUtilsManager = applicationManager.getCommonUtilsManager();
      	if(commonUtilsManager.isNetworkAvailable())
        	configManager.getAppProperties(this.doInit.bind(this));
      	else
          alert(configManager.networkErrorMsg);    
    },
  
   /**
     * Invokes init method.
     */
    doInit: function() {
      try{
       this.view.flxLoader.isVisible = true;
       refreshAppFlag = true;
       applicationManager.getConfigManager().init(this.initSuccessCallback.bind(this),this.initErrorCallback.bind(this));
      }catch(err){
        voltmx.print("CATCH : error in doing INIT "+err);
      }
    },
  
  /**
     * Init success callback method.
     * @callback initSuccessCallback
     * @param {json} res - Application Configuration
     */
   initSuccessCallback : function(res){
     voltmx.print("Init success" + res);
	 var appProp = applicationManager.getItem("APP_CONFIG");
     appProp.svcDoc = res.config;
     applicationManager.setItem("APP_CONFIG", appProp);
     applicationManager.getConfigManager().readIdentityServiceDetailsFromServiceDoc();
     applicationManager.getConfigManager().removeUserCredentialsonLoginProviderChange();
     applicationManager.getConfigManager().getClientConfigProperties(this.clientConfigSuccessCallback.bind(this), this.clientConfigErrorCallback.bind(this));
   },
  
  /**
     * Init error callback method.
     * @callback initErrorCallback
     * @param {json} error - Error response
     */
   initErrorCallback : function(error){
     try{
       voltmx.print("Init error");
       if(error&& error.details){
         alert(error.details.errmsg);
       }
       else if(error == applicationManager.getConfigManager().invalidParamsErroMsg){
         alert(applicationManager.getConfigManager().unableToFetchErrorMsg);
       }
       else if(error && error.message){
         alert(error.message);
       }
       else{
         alert(error||applicationManager.getConfigManager().serverErrorMsg);
       }
       this.view.flxLoader.isVisible = false;
       refreshAppFlag = false;
     }catch(err){
       alert("Init Failure");
       this.view.flxLoader.isVisible = false;
       refreshAppFlag = false;
     }
   },
   /**
     * Client Configuration success callback method.
     * @callback clientConfigSuccessCallback
     * @param {json} response - client configuration
     */
  clientConfigSuccessCallback: function(response) {
      try{
        var storeModule = applicationManager.getStoreModule();
        var configManager = applicationManager.getConfigManager();
        if(configManager.isLoginEnabled()){
          this.doLoginAndNavigate();
        } else{
          sdkInstance = voltmx.sdk.getCurrentInstance();
          voltmx.store.setItem("currToken", sdkInstance.currentClaimToken);
          this.presenter.navigateToAppropriateForm();
        }
      }catch(err){
         voltmx.print("CATCH :error in reading client config properties "+err);
         this.doLoginAndNavigate();
      }
    },
  
   /**
     * Client Configuration error callback method.
     * @callback clientConfigErrorCallback
     * @param {json} error - Error response
     */
   clientConfigErrorCallback: function(error) {
        voltmx.print("error :" + error);
     	this.view.flxLoader.isVisible = false;
     	refreshAppFlag = false;
        this.presenter.showLoginForm();
    },
  
   /**
     * Does Login and Navigates to appropriate forms.
     */
    doLoginAndNavigate: function() {
      try{
        var cred ={};
        cred = applicationManager.getItem("USER_CRED");
        if (cred !== null && cred !== undefined && cred.username) {
            this.presenter.customLogin(cred);
        } else {
            this.presenter.showLoginForm();
        }
      }catch(err){
        voltmx.print("CATCH : in login and navigate flow "+err);
        alert(applicationManager.getConfigManager().serverErrorMsg);
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
      }

    },
  
   /**
     * Updates UI
     * @param {json} formdata - Refresh app details
     */
  	updateUI: function(formdata) {
      	if(formdata === "refreshApp"){
          refreshAppFlag = true;
          this.view.flxLoader.isVisible = true;
          return;
        }
    }

});