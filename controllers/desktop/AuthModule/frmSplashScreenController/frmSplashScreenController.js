define({
  
   /**
     * Login Form Pre show event.
     */
    preShow: function() {
        var configManager = applicationManager.getConfigManager();
        //this.view.imgSplash.src = "splash_screen.svg";
        configManager.setPlatformID();
        configManager.getAppProperties(this.checkPlatform.bind(this));
        // this.checkPlatform();
    },
  
   /**
     * Displays QR code based on user agent
     */
    checkPlatform : function() {
        var configManager = applicationManager.getConfigManager();
      voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
          this.doInit();
    },
   /**
     * Invokes init method.
     */
    doInit: function() {
      try{
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
   initSuccessCallback : function(){
     voltmx.print("Init success");
     voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
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
       voltmx.application.dismissLoadingScreen();
     }catch(err){
       alert("Init Failure");
       voltmx.application.dismissLoadingScreen();
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
        this.presenter.showLoginForm();
    },
   /**
     * Does Login and Navigates to appropriate forms.
     */
    doLoginAndNavigate: function() {
      try{
        var cred = applicationManager.getItem("USER_CRED");
        if (cred !== null && cred !== undefined && PREV_FORM !== "frmLogin") {
            this.presenter.customLogin(cred);
        } else {
            this.presenter.showLoginForm();
        }
      }catch(err){
        voltmx.print("CATCH : in login and navigate flow "+err);
        alert(applicationManager.getConfigManager().serverErrorMsg);
        voltmx.application.dismissLoadingScreen();
      }

    }

});