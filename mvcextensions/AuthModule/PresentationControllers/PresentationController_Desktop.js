define([], function() {

    var currentScope, commonUtils,config;
	 /**
     * User defined presentation controller
     * @constructor
     * @extends voltmx.mvc.Presentation.BasePresenter
     */
    function Auth_PresentationController() {
        voltmx.mvc.Presentation.BasePresenter.call(this);
        currentScope = this;
        commonUtils = applicationManager.getCommonUtilsManager();
        config = applicationManager.getConfigManager();
    }

    inheritsFrom(Auth_PresentationController, voltmx.mvc.Presentation.BasePresenter);

    Auth_PresentationController.prototype.initializePresentationController = function() {

    };
   /*
    * This method navigates to login form 
    */
   Auth_PresentationController.prototype.showLoginForm = function(data) {
        commonUtils.navigateTo("frmLogin", data);
    }; 
    /*
    * This method is invoked when identity is set AppStoreUserRepository.
    */
    Auth_PresentationController.prototype.customLogin = function(usernamePasswordJSON) {
      
      var loginOptions = {
            "isOfflineEnabled": false,
            "isSSOEnabled": false
        };
        var params = {
            "include_profile": true,
            "userid": usernamePasswordJSON.username,
            "password": usernamePasswordJSON.password,
            "loginOptions": this.loginOptions
        };
        this.businessController.login(params, this.loginSuccessCallback, this.loginErrorCallback);
    };
    /*
    * This method is invoked when identity is set OAuth.
    */
    Auth_PresentationController.prototype.authLogin = function() {
        var loginOptions = {
            "isOfflineEnabled": false,
            "isSSOEnabled": false
        };
        var params = {
            "include_profile": true,
            "loginOptions": this.loginOptions
        };
        this.businessController.login(params,this.loginSuccessCallback, this.loginErrorCallback);
    };
    /*
    * This method is performs logout operations whenever logout is invoked
    */
    Auth_PresentationController.prototype.logout = function() {
        applicationManager.removeItem("USER_CRED");
        this.businessController.logout(null,this.logoutSuccessCallback, this.logoutErrorCallback);
    };
    /*
    * This method is invoked when app properties are retrieved succesfully
    */
    Auth_PresentationController.prototype.appPropertiesSuccessCallback = function(){
        config.readIdentityServiceDetailsFromServiceDoc();
        config.removeUserCredentialsonLoginProviderChange();
        config.getClientConfigProperties(currentScope.configSuccessCallback, currentScope.configErrorCallback);
    };
	  /*
    * This method navigates to appropriate form
    */
    Auth_PresentationController.prototype.navigateToAppropriateForm = function(){
      var storeModule = applicationManager.getStoreModule();
      var curForm = voltmx.application.getCurrentForm().id;
      if (PREV_FORM !== undefined && PREV_FORM === "frmAppDetails") {
        if(curForm == "frmAppDetails"){
          storeModule.presentationController.fetchAppDetails();
        } else{
          storeModule.presentationController.navigateToAppDetailsForm(true);
        }
      } else {
        if(curForm == "frmStore"){
          storeModule.presentationController.fetchAppsList();
        } else{
          storeModule.presentationController.navigateToStoreForm(true);
        }
      }
    };
  	/*
    * Callback method for login success
    */
    Auth_PresentationController.prototype.loginSuccessCallback = function(response) {
        registerPush();
        voltmx.print("Login success" + JSON.stringify(response));
        voltmx.application.dismissLoadingScreen();
        currentScope.navigateToAppropriateForm();
    };

    Auth_PresentationController.prototype.loginErrorCallback = function(error) {
        applicationManager.removeItem("USER_CRED");
        voltmx.application.dismissLoadingScreen();
        var response = {
            "data": error,
            "isError": true
        };
        currentScope.presentUserInterface("frmLogin", response);
    };
 	 /*
    * Callback method for logout success
    */
    Auth_PresentationController.prototype.logoutSuccessCallback = function(response) {
        voltmx.print("Logout success" + JSON.stringify(response));
        voltmx.application.dismissLoadingScreen();
        config.getAppProperties(currentScope.appPropertiesSuccessCallback.bind(this));
    };
   	/*
    * Callback method for config success
    */
    Auth_PresentationController.prototype.configSuccessCallback = function(response) {
        if(config.isLoginEnabled()){
          currentScope.refreshOnTimeOut();
        } else{
          currentScope.navigateToAppropriateForm();
        }
    };
    /*
    * Callback method for config failure
    */
    Auth_PresentationController.prototype.configErrorCallback = function(error) {
        currentScope.refreshOnTimeOut();
    };
	 /*
    *	This method is invoked whenever session is timed out
    */
    Auth_PresentationController.prototype.refreshOnTimeOut = function() {
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
    *	Callback method for logout error
    */
    Auth_PresentationController.prototype.logoutErrorCallback = function(error) {
        voltmx.application.dismissLoadingScreen();
        var response = {
            "data": error,
            "isError": true
        };
        //currentScope.presentUserInterface("frmLogin", response);
       config.getAppProperties(currentScope.appPropertiesSuccessCallback.bind(this));
    };
  /*
   *		This method  prompts network error in the current form
   */
  Auth_PresentationController.prototype.showNetworkError = function(error){

    var data = {
      "isError": true,
      "data": error
    };

    currentScope.presentUserInterface(voltmx.application.getCurrentForm().id, data);
  };
    /*
    *		This method  prompts network error in the current form
    */
    Auth_PresentationController.prototype.showForgotPasswordForm = function() {
        commonUtils.navigateTo("frmForgotPassword", null);
    };
   
    return Auth_PresentationController;
});