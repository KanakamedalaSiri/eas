define({
   /**
     * This method gets invoked on Post show of App Details form.
     */
    postshow: function() {
      try{
        voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        this.view.forceLayout();
        if (this.updateRequired) {
            this.view.flxMain.isVisible = false;
            this.presenter.fetchAppDetails();
        } else {
            this.setAppDetails();
        }
      }catch(err){
        voltmx.print("CATCH : error in post show of app details "+err);
        this.presenter.navigateToStoreForm(true);
      }  
    },
   /**
     * This method gets invoked on click of back button in App Details form.
     * This method is used to navigate to store form. 
     */
    onClickOfBackBtn: function() {
      try{
        var data = applicationManager.getCommonUtilsManager().getCustomData("EnterpriseApps");
        if (data === undefined || data === null) {
            this.presenter.navigateToStoreForm(true);
        } else {
            this.presenter.navigateToStoreForm(false);
        }
      }catch(err){
        voltmx.print("CATCH : error while clicking on back button "+err);
      }
    },
   /**
     * On Navigate callback method.
     * This method gets invoked while navigating to this form.
     * @param {boolean} updateRequired.
     */
    onNavigate: function(updateRequired) {
        this.showLogout();
        this.view.lblHeader.text = applicationManager.getConfigManager().constants.header_label_on_other_forms;
        this.view.flxScreenshots.isVisible = false;
        this.view.flxScreenshot0.isVisible = false;
        this.view.flxScreenshot1.isVisible = false;
        this.view.flxScreenshot2.isVisible = false;
        this.view.flxScreenshot3.isVisible = false;
        this.view.lblDownloadError.isVisible = false;
        this.view.imgLogout.src = "logout.svg";
        this.view.imgBack.src = "back.svg";
        this.updateRequired = updateRequired;
    },
   /**
     * Updates UI with provided data
     * @param {json} formdata - success/error response
     */
    updateUI: function(formdata) {
      try{
        this.showLogout();
        this.view.flxLoader.isVisible = false;
        applicationManager.getConfigManager().loaderText = "";
        if (formdata !== undefined && formdata.isError) {
            this.errorCallback(formdata.data);
        } else {
            if (formdata.data !== undefined && formdata.data.length > 0) {
                applicationManager.setItem("SELECTED_APP_DETAILS",formdata.data[0]);
            }
            this.setAppDetails();
        }
      }catch(err){
        voltmx.print("CATCH : error in updating UI "+err);
      } 
    },
  
   /**
     * This method is used to show logout button if login is enabled
     */
    showLogout: function() {
      try{
        var configManager = applicationManager.getConfigManager();
        var commonUtils = applicationManager.getCommonUtilsManager();
        var clientProp = applicationManager.getItem("CLIENT_CONFIG");
        this.view.imgLogout.src = "logout.svg";
        if(configManager.isLoginEnabled()){
          this.view.imgLogout.isVisible = true;
        } else{
          this.view.imgLogout.isVisible = false;
        }
      }catch(err){
        voltmx.print("CATCH : error in reading config properties "+err);
      } 
    },
  
   /**
     * This method is used to set data in App Details form
     */
    setAppDetails: function() {
      try{
        scope = this;
        var viewAppData = applicationManager.getItem("SELECTED_APP_DETAILS");
        var commonUtils = applicationManager.getCommonUtilsManager();
        var config = applicationManager.getConfigManager();
        var serverUrl = commonUtils.getServerUrl();
        this.view.lblAppName.text = viewAppData.appName_full;
        this.view.lblVersion.text = viewAppData.appVersion.text;
        this.view.lblAppDescription.text = viewAppData.longDescription;
        var systemChannelId = viewAppData.System_ChannelId;
      	this.view.lblPlatformTab.text = viewAppData.platformTab.text;
      	if(systemChannelId === config.responsive_web_channel_id || systemChannelId === config.native_web_channel_id){
        	this.view.btnWebApp.isVisible = true;
          	this.view.btnGet.isVisible = false;
          	this.view.lblVersion.isVisible = false;
        }else{
            this.view.lblVersion.isVisible = true;
          	this.view.btnWebApp.isVisible = false;
          	this.view.btnGet.isVisible = true;
        }
        
        if(config.platformName === "desktop"){
            this.view.btnWebApp.isVisible = true;
            this.view.btnGet.isVisible = false;
            this.view.lblVersion.isVisible = false;
            this.view.lblPlatformTab.isVisible = false;
            this.view.flxBack.isVisible = false;
            
            this.view.imgAppIcon.left = "30px";
            this.view.imgAppIcon.width = "140px";
            this.view.imgAppIcon.height =  "140px";
            this.view.imgAppIcon.centerY = undefined;
          
            this.view.flxHeader.height = "88px";
            
            this.view.lblHeader.left = 2.1+"%";
            this.view.lblHeader.centerX = undefined;
            this.view.lblHeader.centerY = undefined;
            this.view.lblHeader.height = "22px";
            this.view.lblHeader.width = "172px";
            this.view.lblHeader.top = "46px";
            this.view.lblHeader.text = "ENTERPRISE STORE";
           
            this.view.imgLogout.top = "46px";
            this.view.imgLogout.height = "22px";
            this.view.imgLogout.right = 2.10+"%";
            this.view.imgLogout.width = 1.40+"%";
            this.view.imgLogout.centerY = undefined;
          
            this.view.flxMain.top = "88px";
            
            this.view.flxAppNameAndVersion.top = "0px";
            this.view.flxAppNameAndVersion.height = "170px";
            this.view.imgAppIcon.top = "30px";
            this.view.imgAppIcon.width = "140px";
            this.view.imgAppIcon.height = "140px";
          
            this.view.flxAppDetails.top = "0px";
            this.view.flxAppDetails.height = "170px";
          
            this.view.lblAppName.top = "61px";
            this.view.lblAppName.width = 100+"%";
            this.view.lblAppName.height = "22px";
          
            this.view.flxPlatformTab.height = "16px";
            this.view.flxPlatformTab.width = "158px";
            this.view.flxPlatformTab.top = "12px";
            
          
            this.view.btnWebApp.width = "60px";
            this.view.btnWebApp.height = "28px";
            this.view.btnWebApp.top = "10px";
            this.view.btnWebApp.isVisible = true;
           
          
            this.view.lblDetails.top = "26px";
            this.view.lblDetails.left = "30px";
            this.view.lblDetails.width = "172px";
            this.view.lblDetails.height = "22px";
          
            this.view.flxScreenshots.top = "11px";
          	this.view.flxScreenshots.height = "356px";
          	this.view.flxScreenshots.left = "30px";
            
            this.view.lblAppDescription.left = "30px";
          	this.view.lblAppDescription.top = "11px";
          
            this.view.flxScreenshot0.width = "220px";
            this.view.flxScreenshot0.height =  "356px";
            this.view.flxScreenshot1.width = "220px";
            this.view.flxScreenshot1.height =  "356px";
            this.view.flxScreenshot1.left =  "12px";
            this.view.flxScreenshot2.width = "220px";
            this.view.flxScreenshot2.height =  "356px";
            this.view.flxScreenshot2.left =  "12px";
            this.view.flxScreenshot3.width = "220px";
            this.view.flxScreenshot3.height =  "356px";
            this.view.flxScreenshot3.left =  "12px";

        }
        
        if (viewAppData.appIcon.base64 !== undefined && viewAppData.appIcon.base64 !== null) {
            this.view.imgAppIcon.base64 = viewAppData.appIcon.base64;
        } else {
            this.view.imgAppIcon.src = viewAppData.appIcon;
        }
        this.view.flxMain.isVisible = true;
        var attachments = viewAppData.channel_attachments_info;
        var imageIdentifiers = [];
        if (attachments !== undefined && attachments !== null) {
            for (var j = 0; j < attachments.length; j++) {
                if (attachments[j].System_AttachmentType === config.attachment_type_of_screenshots) {
                    var tmp = {
                        "identifier": attachments[j].System_DownloadLink
                    };
                    imageIdentifiers.push(tmp);
                }
            }
        }
        this.view.forceLayout();
        this.imgIds =imageIdentifiers;
        this.index = 0;
        this.getScreenshots();
      }catch(err){
      voltmx.application.dismissLoadingScreen();
        voltmx.print("CATCH: error in setting app details "+err);
      }  
    },
  
   /**
     * This method gets invoked on clicking "GET" in App details form.
     * This method invokes presentation methods to download the binaries.
     */
    onClickOfGetBtnInAppDetails: function() {
        try {
            voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
            var commonUtils = applicationManager.getCommonUtilsManager();
            var selectedItem = applicationManager.getItem("SELECTED_APP_DETAILS");
            if (selectedItem !== null && selectedItem !== undefined) {
                this.presenter.startDownloadProcess(selectedItem);
            }
        } catch (err) {
            voltmx.print("CATCH: onClickOfGetBtnInAppDetails : " + err);
        }
    },
  
   /**
     * Logout Method
     * This method gets invoked when user clicks Logout button
     */
    onClickOfLogout: function() {
      try {
        var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        if(!CommonUtilsManager.isNetworkAvailable()){
          var error = {
            "message": applicationManager.getConfigManager().networkErrorMsg,
          };
          this.presenter.showNetworkError(error);
        }
        else{
          if(applicationManager.getConfigManager().loaderText !== ""){
            this.view.flxLoader.isVisible = true;
            this.view.lblLoaderText.text = applicationManager.getConfigManager().loaderText;
            this.view.forceLayout();
          }
          voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
          var authModule = applicationManager.getAuthModule();
          authModule.presentationController.logout();
        }
      } catch (err) {
        voltmx.print("CATCH: Error in invoking logout from App details : " + err);
      }
    },
  
    /**
     * Get screenshots method
     * This method fetches the screenshot from the server.
     * @param {array} imgIds - Image Identifiers
     */
    getScreenshots: function(imgIds) {
      try{
         if (scope.imgIds.length > 0 ) {
           var commonUtils = applicationManager.getCommonUtilsManager();
           if(!commonUtils.isNetworkAvailable()){
             alert(applicationManager.getConfigManager().networkErrorMsg);
             scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
             scope.view.lblDownloadError.isVisible = true;
             scope.view.flxScreenshots.isVisible = false;
             scope.view.forceLayout();
             voltmx.application.dismissLoadingScreen();
             return;
           }
           if( scope.index < scope.imgIds.length){
             var konyclient = voltmx.sdk.getCurrentInstance();
             this.view.flxScreenshots.isVisible = true;
             var config = applicationManager.getConfigManager();
             var serverUrl = commonUtils.getServerUrl();
             var downloadServiceUrl = config.getBinaryServiceUrl;
             voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
             scope.xhr = new XMLHttpRequest();
             var url = serverUrl + downloadServiceUrl + "?file_id=" + scope.imgIds[scope.index].identifier;
             scope.xhr.open("GET", url);
             scope.xhr.setRequestHeader("X-Voltmx-Authorization", konyclient.currentClaimToken);
             scope.xhr.overrideMimeType('text/plain; charset=x-user-defined');
             scope.xhr.send();
             scope.xhr.onreadystatechange = scope.getScreenshotCallback;
           }
        } else {
            this.view.flxScreenshots.isVisible = false;
            voltmx.application.dismissLoadingScreen();
        }
      }catch(err){
        voltmx.print("CATCH : error while downloading screenshots  "+err);
        voltmx.application.dismissLoadingScreen();
      }
    },
   /**
     * Get Screenshots callback method.
     * This method maps the base64 string to image widget.
     * @callback getScreenshotCallback
     */
    getScreenshotCallback : function(){
      if (scope.xhr.readyState == 4) {
        var resp;
        try{
          var config = applicationManager.getConfigManager();
          if ((scope.xhr.status == 200) || (scope.xhr.status === 0)) {
            if(scope.xhr.responseText !== null){
              resp = JSON.parse(scope.xhr.responseText);
              if (resp.data === undefined || resp.data === null) {
                scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
                scope.view.lblDownloadError.isVisible = true;
                scope.view.flxScreenshots.isVisible = false;
                scope.view.forceLayout();
                voltmx.application.dismissLoadingScreen();
                return;
              } else {
                if(resp.data === "")
                  scope.view["imgScreenshot" + scope.index].src="image_error_icon.png";
                else
                  scope.view["imgScreenshot" + scope.index].base64 = resp.data;
              }
            } else{
              scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
              scope.view.lblDownloadError.isVisible = true;
              scope.view.flxScreenshots.isVisible = false;
              scope.view.forceLayout();
              voltmx.application.dismissLoadingScreen();
              return;
            }
          } else {
            resp = JSON.parse(scope.xhr.responseText);
            if(resp.opstatus && resp.opstatus == 17005 && resp.mferrmsg && resp.mferrmsg.indexOf("InvalidToken: Token Expired") !== -1){
              PREV_FORM = voltmx.application.getCurrentForm().id;
              config.loaderText = config.refreshSessionMsg;
              scope.sessionTimedOut();
              return;
            } else{
              scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
              scope.view.lblDownloadError.isVisible = true;
              scope.view.flxScreenshots.isVisible = false;
              scope.view.forceLayout();
              voltmx.application.dismissLoadingScreen();
              return;
            }
            voltmx.print("Failed to download app icon");
          }
        }catch(err){
          voltmx.print("CATCH : getscreenshots callback "+err);
          scope.view["imgScreenshot" + scope.index].src = "";
        } 
        scope.view["flxScreenshot" + scope.index].isVisible = true;
        scope.view.forceLayout();
        this.index = this.index + 1;
        voltmx.application.dismissLoadingScreen();
        scope.getScreenshots();
      }
    },
   /**
     * Common Error callback method
     * @callback errorCallback
     * @param {array} imgIds - Image Identifiers
     */
    errorCallback: function(error) {
       try{
         var basicConf = {
                "message": "",
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "info",
                "yesLabel": "OK",
                "alertHandler": "",
        };
        var config = applicationManager.getConfigManager();
        if (error !== undefined && error !== null) {
            if (error.message && (error.message.indexOf("Invalid Session") != -1 || error.message.indexOf("Session Expired") !== -1)) {
                PREV_FORM = voltmx.application.getCurrentForm().id;
                config.loaderText = config.refreshSessionMsg;
                this.sessionTimedOut();
            } else if (error.details !== undefined && error.details !== null) {
                if (error.details.errcode === 0) {
                    PREV_FORM = voltmx.application.getCurrentForm().id;
                    config.loaderText = config.refreshSessionMsg;
                    this.sessionTimedOut();
                }
            }  else if (error.opstatus && error.opstatus === 17005 && error.mferrmsg && (error.mferrmsg.indexOf("InvalidToken: Token Expired") !== -1)) {
                PREV_FORM = voltmx.application.getCurrentForm().id;
                config.loaderText = config.refreshSessionMsg;
                this.sessionTimedOut();
            } else if (error.httpStatusCode && error.httpStatusCode == 500) {
                basicConf.message = config.serverErrorMsg;
                voltmx.ui.Alert(basicConf, {});
                voltmx.application.dismissLoadingScreen();
            } else {
                basicConf.message = error.errmsg || error.message ||config.serverErrorMsg;
                voltmx.ui.Alert(basicConf, {});
                voltmx.application.dismissLoadingScreen();
            }
        }
      }catch(err){
        voltmx.application.dismissLoadingScreen();
        voltmx.print("CATCH : "+err);
      }
    },
  
  	launchWebAppInAppDetails: function(){
      try{
        var commonUtils = applicationManager.getCommonUtilsManager();
        var config = applicationManager.getConfigManager();
        var serverUrl = commonUtils.getServerUrl();
        var filename = '';

        var selectedItem = applicationManager.getItem("SELECTED_APP_DETAILS");
        if (selectedItem !== null && selectedItem !== undefined) {
           for (var i = 0; i < selectedItem.channel_attachments_info.length; i++) {
                if (selectedItem.channel_attachments_info[i].System_AttachmentType == config.attachment_type_of_binary) {
                    
                    filename = selectedItem.channel_attachments_info[i].System_AttachmentName;
                    break;
                }
           }
          if(filename.endsWith('.zip')){
              filename = filename.replace('.zip', '');
          }
          
          else if(filename.endsWith('.war')){
              filename = filename.replace('.war', '');
            }
           var webAppUrl = serverUrl + "/apps/" + filename;
           window.open(webAppUrl);
        }
      }catch(ex){
        voltmx.application.dismissLoadingScreen();
        voltmx.print("catch in launchWebAppInAppDetails: " + ex);
      }
    },
  
    sessionTimedOut : function(){
     try{
       this.view.flxLoader.isVisible = true;
       refreshAppFlag = true;
       this.view.lblLoaderText.isVisible = false;
       if(applicationManager.getConfigManager().loaderText !== ""){
         this.view.lblLoaderText.text = applicationManager.getConfigManager().loaderText;
         this.view.lblLoaderText.isVisible = true;
         this.view.forceLayout();
       }
       var AuthModule = applicationManager.getAuthModule();
       applicationManager.getConfigManager().getAppProperties(AuthModule.presentationController.appPropertiesSuccessCallback);
     } catch(err){
       voltmx.print("In Catch : SessionTimedOut " +err);
     }
   }
});