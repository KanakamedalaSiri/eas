define({
  /**
     * This function gets invoked on Login form preshow event.
     */
  preShow: function() {
    this.setUserInputs("", "");
    this.showCustomOrAuthLogin();
    this.view.imglogo.src = applicationManager.getConfigManager().constants.logo_on_login_form;
    this.view.lblTitle.text =applicationManager.getConfigManager().constants.header_label_on_login_form;
    this.view.txtPassword.secureTextEntry = true;
  },
  /**
     * This function will be called when we want to refresh the UI with the latest data.
     */
  updateUI: function(formdata) {
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
      voltmx.print("Error in login: Login is enabled but identity is not configured");
      this.view.lblLoading.text = configManager.identityErrorMsgResponsive;
      this.view.lblLoading.centerY = "50%";
      this.view.lblLoading.isVisible = true;
      return;
    }
    else if (type === configManager.identityProviderAuth || type === configManager.identityProviderSAML) {
      this.view.flxMain.isVisible = false;
      this.view.lblLoading.text = applicationManager.getConfigManager().popupBlockedMsg;
      this.view.lblLoading.top = "10%";
      this.view.lblLoading.isVisible = true;
      applicationManager.setItem("USER_CRED",null);
      this.presenter.authLogin();
      //voltmx.application.isPopupBlocked(this.isPopupBlockedCallback);
    } else {
      var appProp = applicationManager.getItem("APP_CONFIG");
      this.view.lblLoading.isVisible = false;
      this.view.flxMain.isVisible = true;
      if(appProp && appProp.svcDoc && appProp.svcDoc.login && appProp.svcDoc.login[0]["forgot_pswd_submit_userid"]){
        this.view.btnForgot.isVisible = true;
      } else{
        this.view.btnForgot.isVisible = false;
      }
    }
  },

  isPopupBlockedCallback : function(param){
    if(param === true){
      this.view.lblLoading.text = applicationManager.getConfigManager().popupBlockedMsg;
      this.view.forceLayout();
    } else{
      this.presenter.authLogin();
    }
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
    var CommonUtilsManager = applicationManager.getCommonUtilsManager();
    if(!CommonUtilsManager.isNetworkAvailable()){
      var error = {
        "message": applicationManager.getConfigManager().networkErrorMsg,
      };
      this.presenter.showNetworkError(error);
    }else{
      var usernamePasswordJson = {};
      if (this.view.txtUsername.text === null || this.view.txtUsername.text === "" || this.view.txtPassword.text === null || this.view.txtPassword.text === "") {
        alert(applicationManager.getConfigManager().userInputFieldErrorMsg);
      } else {
        voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        usernamePasswordJson = {
          "username": this.view.txtUsername.text,
          "password": this.view.txtPassword.text
        };
        this.storeClientCredentails(usernamePasswordJson);
        this.presenter.customLogin(usernamePasswordJson);
      }
    }
  },
  /**
     * This function stores user credentials for auto login purpose.
     */
  storeClientCredentails: function(usernamePasswordJson) {
    applicationManager.setItem("USER_CRED", {
      "username": usernamePasswordJson.username,
      "password": usernamePasswordJson.password
    });
  },
  /**
     * This function removes user credentials.
     */
  removeCredentials: function() {
    try {
      applicationManager.removeItem("USER_CRED");
    } catch (err) {
      voltmx.print("Error in removing USER_CRED");
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
        if((error.opstatus && error.opstatus === 105) ||(error.details.errmsg && error.details.errmsg.includes("provider not found")) || (error.details.message && error.details.message.includes("provider not found"))){
          applicationManager.getConfigManager().getAppProperties(this.presenter.appPropertiesSuccessCallback);
        }
        else
          alert(error.details.errmsg || error.details.message);

      } else if (error.message && error.message !== null && error.message !== undefined) {

        alert(error.message);

      }
    }catch(err){
      alert(error || applicationManager.getConfigManager().serverErrorMsg);
    }
  },
  /**
     * This function is used to navigate to forgot password form.
     */
  onClickbtnForgot: function() {
    voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    voltmx.application.dismissLoadingScreen();
    this.presenter.showForgotPasswordForm();
  }

});