define({ 

  /**
    * This method is used to show logout button if login is enabled
    */
  showLogout: function() {
    try{
      var configManager = applicationManager.getConfigManager();
      var commonUtils = applicationManager.getCommonUtilsManager();
      var clientProp = applicationManager.getItem("CLIENT_CONFIG");
      if(configManager.isLoginEnabled()){
        this.view.flxLogout.isVisible = true;
      } else{
        this.view.flxLogout.isVisible = false;
      }
    }catch(err){
      voltmx.print("CATCH : error in reading config properties "+err);
    } 
  },
  
  /**
    * Updates UI with provided data
    */
  updateUI: function(formdata) {
    if(formdata === "refreshApp"){
      refreshAppFlag = true;
      this.view.flxLoader.isVisible = true;
      return;
    }
  },

  /**
     * This method gets invoked on click of back button in Help form.
     * This method is used to navigate to store form. 
     */
  onClickOfBackBtn: function() {
    try{
      this.view.flxLoader.isVisible = true;
      refreshAppFlag = true;
      this.view.lblLoaderText.isVisible = false;
      var data = applicationManager.getCommonUtilsManager().getCustomData("EnterpriseApps");
      var storeModule = applicationManager.getStoreModule();
      if (data === undefined || data === null) {
        this.presenter.navigateToStoreForm(true);
      } else {
        this.presenter.navigateToStoreForm(false);
      }
    }catch(err){
      alert(err);
      voltmx.print("CATCH : error while clicking on back button "+err);
    }
  },

  /**
     * Logout Method
     * This method gets invoked when user clicks Logout button
     */
  onClickOfLogout: function() {
    try {
      this.view.flxLoader.isVisible = true;
      refreshAppFlag = true;
      this.view.lblLoaderText.isVisible = false;
      if(applicationManager.getConfigManager().loaderText !== ""){
        this.view.lblLoaderText.isVisible = true;
        this.view.lblLoaderText.text = applicationManager.getConfigManager().loaderText;
        this.view.forceLayout();
      }
      var authModule = applicationManager.getAuthModule();
      authModule.presentationController.logout(this.view.browserLogin);
    } catch (err) {
      voltmx.print("CATCH: Error in invoking logout from App details : " + err);
    }
  }

});