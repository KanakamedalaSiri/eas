define([], function() {
  
    var currentScope,config,CommonUtilsManager;
  
    /**
     * User defined presentation controller
     * @constructor
     * @extends voltmx.mvc.Presentation.BasePresenter
     */
    function PresentationController_Tablet() {
        voltmx.mvc.Presentation.BasePresenter.call(this);
        currentScope = this;
        config = applicationManager.getConfigManager();
        CommonUtilsManager = applicationManager.getCommonUtilsManager();
    }

    inheritsFrom(PresentationController_Tablet, voltmx.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of voltmx.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    PresentationController_Tablet.prototype.initializePresentationController = function() {
        
    };
    /*
    * This method navigates to login form 
    */
    PresentationController_Tablet.prototype.showLoginForm = function(data) {
        CommonUtilsManager.navigateTo("frmLogin", data);
    };  
    /*
    * This method is invoked when identity is set AppStoreUserRepository.
    */
    PresentationController_Tablet.prototype.customLogin = function(usernamePasswordJSON) {
        if(!CommonUtilsManager.isNetworkAvailable()){
          var error = {
              "message": applicationManager.getConfigManager().networkErrorMsg,
          };
          currentScope.showNetworkError(error);
          return;
      	}  
        var loginOptions = {
            "isOfflineEnabled": false,
            "isSSOEnabled": false
        };
        var params = {
            "include_profile": true,
            "userid": usernamePasswordJSON.username,
            "password": usernamePasswordJSON.password,
            "loginOptions": this.loginOptions,
            "httpRequestOptions": {
              "enableBackgroundTransfer": true
            }
        };
        this.businessController.login(params, this.loginSuccessCallback, this.loginErrorCallback);
    };
	  /*
    * This method is invoked when identity is set OAuth.
    */
    PresentationController_Tablet.prototype.authLogin = function(browserID) {
       if(!CommonUtilsManager.isNetworkAvailable()){
          var error = {
              "message": applicationManager.getConfigManager().networkErrorMsg,
          };
          currentScope.showNetworkError(error);
          return;
      	}  
        var loginOptions = {
            "isOfflineEnabled": false,
            "isSSOEnabled": false
        };
         var params = {
            "include_profile": true,
          	"browserWidget" : browserID,
            "loginOptions": this.loginOptions,
            "httpRequestOptions": {
              "enableBackgroundTransfer": true
            }
        };
        var prov = applicationManager.getItem("IDENTITY_PROV");
        if(prov.toLowerCase().includes("google")){
          params.UseDeviceBrowser = true;
          params.browserWidget = null;
          //#ifdef ipad
          params.success_url = "com.voltmx.Store://";
          //#endif
          //#ifdef tabrcandroid
          params.success_url = "https://com.voltmx.Store";
          //#endif
          voltmx.store.setItem("disablefrmLoginPreShow", true);
        }
        this.businessController.login(params,this.loginSuccessCallback, this.loginErrorCallback);
    };
  	/*
    * This method is performs logout operations whenever logout is invoked
    */
    PresentationController_Tablet.prototype.logout = function(browserID) {
        if(!CommonUtilsManager.isNetworkAvailable()){
          	var error = {
              "errmsg": applicationManager.getConfigManager().networkErrorMsg,
            };     
           currentScope.showNetworkError(error);
           return;
        }
       	applicationManager.removeItem("USER_CRED");
        downloadQueue= [];
      	voltmx.store.setItem("downloadAppsList",[]);
        voltmx.store.setItem("downloadInProgress", false);
        var config = applicationManager.getConfigManager();
        if(config.isLoginEnabled()){
          var type = applicationManager.getItem("IDENTITY_TYPE");
          var params = null;
          if (type === config.identityProviderAuth) {
            params = {
              "browserWidget" : browserID
            };
          } 
          this.businessController.logout(params,this.logoutSuccessCallback, this.logoutErrorCallback);
        }
        else{
        	config.getAppProperties(currentScope.appPropertiesSuccessCallback.bind(this));
        }
        
    };
    /*
    * This method is invoked when app properties are retrieved succesfully
    */
    PresentationController_Tablet.prototype.appPropertiesSuccessCallback = function(){
        config.init(currentScope.sdkInitSuccessCallback,currentScope.sdkInitErrorCallback);
    };
	  /*
    * This method navigates to appropriate form
    */
    PresentationController_Tablet.prototype.navigateToAppropriateForm = function(){
      var storeModule = applicationManager.getStoreModule();
      var curForm = voltmx.application.getCurrentForm();
      if (PREV_FORM !== undefined && PREV_FORM === "frmAppDetails") {
        if(curForm.id == "frmAppDetails"){
          curForm.flxLoader.isVisible = true;
          refreshAppFlag = true;
          storeModule.presentationController.fetchAppDetails();
        } else{
          storeModule.presentationController.navigateToAppDetailsForm(true);
        }
      } else {
        if(curForm.id == "frmStore"){
          curForm.flxLoader.isVisible = true;
          refreshAppFlag = true;
          storeModule.presentationController.fetchAppsList();
        } else{
          storeModule.presentationController.navigateToStoreForm(true);
        }
      }
    };
    /*
    * Callback method for sdk init success
    */
    PresentationController_Tablet.prototype.sdkInitSuccessCallback = function(res){
     var appProp = applicationManager.getItem("APP_CONFIG");
     appProp.svcDoc = res.config;
     applicationManager.setItem("APP_CONFIG", appProp);
     if(!isPullToRefresh){
     	voltmx.store.setItem("downloadAppsList",[]);
     }
     isPullToRefresh = false;
     voltmx.store.setItem("downloadInProgress", false);
     applicationManager.getConfigManager().readIdentityServiceDetailsFromServiceDoc();
     applicationManager.getConfigManager().getClientConfigProperties(currentScope.configSuccessCallback, currentScope.configErrorCallback);
    };
    /*
    * Callback method for sdk init error
    */
    PresentationController_Tablet.prototype.sdkInitErrorCallback = function(error){
       isPullToRefresh = false;
       voltmx.application.dismissLoadingScreen();
       downloadQueue= [];
       voltmx.store.setItem("downloadAppsList",[]);
       voltmx.store.setItem("downloadInProgress", false);
       var response = {
         "data": error,
         "isError": true
       };
       currentScope.presentUserInterface("AuthModule/frmSplashScreen", response);
    };
    /*
    * Callback method for config success
    */
    PresentationController_Tablet.prototype.configSuccessCallback = function(response) {
        if(config.isLoginEnabled()){
          currentScope.refreshOnTimeOut();
        } else{
          currentScope.navigateToAppropriateForm();
        }
    };
    /*
    * Callback method for config failure
    */
    PresentationController_Tablet.prototype.configErrorCallback = function(error) {
        currentScope.refreshOnTimeOut();
    };
    /*
    *	This method is invoked whenever session is timed out
    */
    PresentationController_Tablet.prototype.refreshOnTimeOut = function() {
      try{
        var cred = applicationManager.getItem("USER_CRED");
        if (cred !== undefined && cred !== null) {
          currentScope.customLogin(cred);
        } else{
          	currentScope.showLoginForm();
        }
      }
      catch(err){
        voltmx.print("CATCH : Error in refreshOnTimeout : " + err);
      }
    };
   /*
    *	This is a callback method for login success
   */
   PresentationController_Tablet.prototype.loginSuccessCallback = function(response) {
        registerPush();
        voltmx.print("Login success" + JSON.stringify(response));
        voltmx.application.dismissLoadingScreen();
        currentScope.navigateToAppropriateForm();
    };
    /*
    *	This is a callback method for login error
    */
    PresentationController_Tablet.prototype.loginErrorCallback = function(error) {
        applicationManager.removeItem("USER_CRED");
        voltmx.application.dismissLoadingScreen();
        var response = {
            "data": error,
            "isError": true
        };
        currentScope.presentUserInterface("frmLogin", response);
    };
    /*
    *	This is a callback method for logout error
    */
    PresentationController_Tablet.prototype.logoutErrorCallback = function(error) {
        voltmx.application.dismissLoadingScreen();
        var response = {
            "data": error,
            "isError": true
        };
        //currentScope.presentUserInterface("frmLogin", response);
       config.getAppProperties(currentScope.appPropertiesSuccessCallback.bind(this));
    };

    PresentationController_Tablet.prototype.showForgotPasswordForm = function() {
        CommonUtilsManager.navigateTo("frmForgotPassword", null);
    };
    /*
    *		This method  prompts network error in the current form
    */
    PresentationController_Tablet.prototype.showNetworkError = function(error){
          
          var data = {
            "isError": true,
             "data": error
          };
      	
          currentScope.presentUserInterface(voltmx.application.getCurrentForm().id, data);
    };
    /*
    *	Callback method for logout success
    */
    PresentationController_Tablet.prototype.logoutSuccessCallback = function(response) {
        voltmx.print("Logout success" + JSON.stringify(response));
        config.getAppProperties(currentScope.appPropertiesSuccessCallback.bind(this));
    };

   

    return PresentationController_Tablet;
});