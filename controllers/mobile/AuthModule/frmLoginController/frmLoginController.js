define({
  
    /**
     * This function gets invoked on Login form preshow event.
     */
    preShow: function() {
        this.view.flxLoader.isVisible = true;
      	refreshAppFlag = true;
      	var disableloginPreShow = voltmx.store.getItem("disablefrmLoginPreShow");
      	if(disableloginPreShow === true){
          voltmx.store.setItem("disablefrmLoginPreShow", false);
          return;
        }
        this.setUserInputs("", "");
        this.showCustomOrAuthLogin();
        this.view.txtPassword.secureTextEntry = true;
        this.view.imglogo.src = applicationManager.getConfigManager().constants.logo_on_login_form;
        this.view.lblTitle.text = applicationManager.getConfigManager().constants.header_label_on_login_form;
      	this.view.onDeviceBack = function(){};
    },

    /**
     * This function will be called when we want to refresh the UI with the latest data.
     */
    updateUI: function(formdata) {
      	if(formdata === "refreshApp"){
          refreshAppFlag = true;
          this.view.flxLoader.isVisible = true;
        }
        if (formdata !== undefined && formdata.isError) {
            this.errorCallback(formdata.data);
        }
    },
    
    /**
     * This function decides whether to show custom login page or auth login.
     */
    showCustomOrAuthLogin: function() {
        var type = applicationManager.getItem("IDENTITY_TYPE");
        var prov = applicationManager.getItem("IDENTITY_PROV");
        var configManager = applicationManager.getConfigManager();
        applicationManager.setItem("PREV_PROVIDER",prov);
        if(type === null || type === undefined){
          this.view.flxMain.isVisible = false;
          this.view.browserLogin.isVisible = false;
          this.view.flxLoader.isVisible = false;
          this.view.lblLoading.isVisible = false;
          refreshAppFlag = false;
          voltmx.print("Error in login: Login is enabled but identity is not configured");
		  var CommonUtilsManager = applicationManager.getCommonUtilsManagerPresenter();
		  CommonUtilsManager.presentationController.showAlertMessage(configManager.identityErrorMsgNative, constants.ALERT_TYPE_INFO, "", configManager.identityErrorDismissMsg, "", this.exitApplication.bind());
          return;
        }
        else if (type === configManager.identityProviderAuth || type === configManager.identityProviderSAML) {
            this.view.flxMain.isVisible = false;
            if(!prov.toLowerCase().includes("google")){
            	this.view.browserLogin.isVisible = true;
          	}
          	else{
              	this.view.browserLogin.isVisible = false;
            }
            this.view.lblLoading.isVisible = true;
            applicationManager.removeItem("USER_CRED");
            this.presenter.authLogin(this.view.browserLogin);
          	if(!prov.toLowerCase().includes("google")){
            	refreshAppFlag = false;
          	}
        } else {
            var appProp = applicationManager.getItem("APP_CONFIG");
            this.view.lblLoading.isVisible = false;
            this.view.flxMain.isVisible = true;
          	this.view.browserLogin.isVisible = false;
            if(appProp && appProp.svcDoc && appProp.svcDoc.login && appProp.svcDoc.login[0]["forgot_pswd_submit_userid"]){
               this.view.btnForgot.isVisible = true;
            } else{
               this.view.btnForgot.isVisible = false;
            }
          	refreshAppFlag = false;
        }
        this.view.flxLoader.isVisible = false;
        this.view.forceLayout();
    },
  
  	exitApplication: function(){
  		voltmx.application.exit();
	},
  
    /**
     * This function sets username and password text box with provided inputs.
     */
    setUserInputs: function(username, password) {
        this.view.txtUsername.text = username;
        this.view.txtPassword.text = password;
    },

    /**
     * This function gets invoked when user clicks on login button in custom login page.
     */
    onClickbtnLogin: function() {
        var usernamePasswordJson = {};
        if (this.view.txtUsername.text === null || this.view.txtUsername.text === "" || this.view.txtPassword.text === null || this.view.txtPassword.text === "") {
            alert(applicationManager.getConfigManager().userInputFieldErrorMsg);
        } else {
          	refreshAppFlag = true;
            this.view.flxLoader.isVisible = true;
            usernamePasswordJson = {
                "username": this.view.txtUsername.text,
                "password": this.view.txtPassword.text
            };
            this.storeClientCredentails(usernamePasswordJson);
            this.presenter.customLogin(usernamePasswordJson);
        }
    },

    /**
     * This function stores user credentials for auto login purpose.
     */
    storeClientCredentails: function(usernamePasswordJson) {
      applicationManager.setItem("USER_CRED",usernamePasswordJson);
    },

    /**
     * This function removes user credentials.
     */
    removeCredentials: function() {
        try {
           applicationManager.removeItem("USER_CRED");
        } catch (err) {
            voltmx.print("Error in removing keas001");
        }

    },

     /**
     * This function shows the appropriate error message based on error code and error message.
     */
    errorCallback: function(error) {
      try{
        if (error && error.opstatus && error.opstatus == 101) {

            alert(error.message);

        } else if(error && error.details && (error.details.errmsg || error.details.message)){
            if((error.opstatus && error.opstatus === 105) || (error.details.errmsg && error.details.errmsg.includes("provider not found")) || (error.details.message && error.details.message.includes("provider not found"))){
              applicationManager.getConfigManager().getAppProperties(this.presenter.appPropertiesSuccessCallback);
            }
            else
              alert(error.details.errmsg || error.details.message);

        } else if (error.message && error.message !== null && error.message !== undefined) {

            alert(error.message);

        }
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.forceLayout();
      }catch(err){
         alert(error || applicationManager.getConfigManager().serverErrorMsg);
         this.view.flxLoader.isVisible = false;
         refreshAppFlag = false;
         this.view.forceLayout();
      }
    },

     /**
     * This function is used to navigate to forgot password form.
     */
    onClickbtnForgot: function() {
        voltmx.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        voltmx.application.dismissLoadingScreen();
        this.presenter.showForgotPasswordForm();
    },
  
    /**
     * This function gets invoked when user clicks on device back button.
     */
    onDeviceBack : function(){
     voltmx.print("on device back");
    }

});