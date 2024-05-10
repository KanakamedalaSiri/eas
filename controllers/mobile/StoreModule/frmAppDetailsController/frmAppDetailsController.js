define({
  
   /**
     * This method gets invoked on Post show of App Details form.
     */
    postshow: function() {
      try{
        this.view.flxLoader.isVisible = true;
        refreshAppFlag = true;
        this.view.lblLoaderText.isVisible = false;
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
        this.view.flxLoader.isVisible = true;
        refreshAppFlag = true;
        this.view.lblLoaderText.isVisible = false;
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
        this.view.flxMain.showFadingEdges = false;
        this.view.flxScreenshots.showFadingEdges = false;
        this.view.flxScreenshots.isVisible = false;
        this.view.flxScreenshot0.isVisible = false;
        this.view.flxScreenshot1.isVisible = false;
        this.view.flxScreenshot2.isVisible = false;
        this.view.flxScreenshot3.isVisible = false;
        this.view.lblDownloadError.isVisible = false;
        this.updateRequired = updateRequired;
    },
  
   /**
     * Updates UI with provided data
     * @param {json} formdata - success/error response
     */
    updateUI: function(formdata) {
      try{
        if(formdata === "refreshApp"){
          refreshAppFlag = true;
          this.view.flxLoader.isVisible = true;
          return;
        }
        this.showLogout();
        this.view.lblDownloadError.isVisible = false;
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        applicationManager.getConfigManager().loaderText = "";
        if (formdata !== undefined && formdata.isError) {
            this.errorCallback(formdata.data);
        } else if(formdata !== undefined && formdata.isDownloadCallback){
            this.downloadCallback();
        } else if(formdata !== undefined && formdata.isDownloadErrorCallback){
            this.downloadErrorCallback(formdata.data);
        } else {
            if (formdata.data && formdata.data.length > 0) {
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
        this.view.lblPlatformTab.text = viewAppData.platformTab.text;
        if (viewAppData.appIcon.base64 !== undefined && viewAppData.appIcon.base64 !== null) {
            this.view.imgAppIcon.base64 = viewAppData.appIcon.base64;
        } else {
            this.view.imgAppIcon.src = viewAppData.appIcon;
        }
        var downloadAppsList = voltmx.store.getItem("downloadAppsList");
        var isDownloading = null;
        var systemChannelId = viewAppData.System_ChannelId;
        if(config.responsive_web_channel_id === systemChannelId || config.native_web_channel_id === systemChannelId){
          this.view.btnWebApp.isVisible = true;
          this.view.btnGet.isVisible = false;
          this.view.lblVersion.isVisible = false;
          this.view.imgDownloading.isVisible = false;
        }
       	else{
          	this.view.lblVersion.isVisible = true;
          	this.view.btnWebApp.isVisible = false;
        	if(downloadAppsList.length!== undefined){
          		isDownloading = downloadAppsList.filter(function (arr) {return arr.rowData.fabric_app_id === viewAppData.fabric_app_id;});
        	}      
       		if(isDownloading !== null && isDownloading.length > 0){
           		this.view.btnGet.isVisible = false;
           		this.view.imgDownloading.isVisible = true;
        	} else{             	
           		this.view.btnGet.isVisible = true;
           		this.view.imgDownloading.isVisible = false;
        	}
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
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
        voltmx.print("CATCH: error in setting app details "+err);
      }  
    },

    /**
     * This method gets invoked on clicking "GET" in App details form.
     * This method invokes presentation methods to download the binaries.
     */
    onClickOfGetBtnInAppDetails: function() {
        try {
           var CommonUtilsManager = applicationManager.getCommonUtilsManager();
           if(!CommonUtilsManager.isNetworkAvailable()){
           		alert(applicationManager.getConfigManager().networkErrorMsg);
          		return;
      		}
            voltmx.application.dismissLoadingScreen();
            this.view.btnGet.isVisible = false;
            this.view.imgDownloading.isVisible = true;
            var commonUtils = applicationManager.getCommonUtilsManager();
            var selectedItem = applicationManager.getItem("SELECTED_APP_DETAILS");
            if (selectedItem !== null && selectedItem !== undefined) {
              var temp = {
                "rowData":selectedItem
              };
              var downloadAppsList = voltmx.store.getItem("downloadAppsList");
              if(downloadAppsList.length === undefined){
                 downloadAppsList =[];
              }
              downloadAppsList.push(temp);
              voltmx.store.setItem("downloadAppsList",downloadAppsList);
              if(! voltmx.store.getItem("downloadInProgress")){
                this.presenter.startDownloadProcess(selectedItem);
              }
            }
        } catch (err) {
            this.view.flxLoader.isVisible = false;
          	refreshAppFlag = false;
            this.view.lblLoaderText.isVisible = false;
            this.view.btnGet.isVisible = true;
            this.view.imgDownloading.isVisible = false;
            voltmx.print("CATCH: onClickOfGetBtnInAppDetails : " + err);
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
             scope.view.flxLoader.isVisible = false;
             refreshAppFlag = false;
             scope.view.lblLoaderText.isVisible = false;
             voltmx.application.dismissLoadingScreen();
             return;
           }
           if( scope.index < scope.imgIds.length){
             var konyclient = voltmx.sdk.getCurrentInstance();
             this.view.flxScreenshots.isVisible = true;
             var config = applicationManager.getConfigManager();
             var serverUrl = commonUtils.getServerUrl();
             var downloadServiceUrl = config.getBinaryServiceUrl;
             scope.view.flxLoader.isVisible = true;
             refreshAppFlag = true;
        	 scope.view.lblLoaderText.isVisible = false;
             scope.xhr = new voltmx.net.HttpRequest();
             //#ifdef iphone
             	scope.xhr.backgroundTransfer = true;
             //#endif
             var url = serverUrl + downloadServiceUrl + "?file_id=" + scope.imgIds[scope.index].identifier;
             scope.xhr.open(constants.HTTP_METHOD_GET, url);
             scope.xhr.setRequestHeader("X-Voltmx-Authorization", konyclient.currentClaimToken);
             scope.xhr.onReadyStateChange = scope.getScreenshotCallback;
             scope.xhr.send();
             
           }
        } else {
          	refreshAppFlag = false;
            this.view.flxScreenshots.isVisible = false;
            this.view.flxLoader.isVisible = false;
        	this.view.lblLoaderText.isVisible = false;
            voltmx.application.dismissLoadingScreen();
        }
      }catch(err){
        voltmx.print("CATCH : error while downloading screenshots  "+err);
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
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
          if ((scope.xhr.status == 200) || (scope.xhr.status === 0)) {
            if(scope.xhr.response !== null){
              resp = scope.xhr.response;
              if (resp.data === undefined || resp.data === null) {
                scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
                scope.view.lblDownloadError.isVisible = true;
                scope.view.flxScreenshots.isVisible = false;
                scope.view.forceLayout();
                scope.view.flxLoader.isVisible = false;
                refreshAppFlag = false;
        		scope.view.lblLoaderText.isVisible = false;
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
              scope.view.flxLoader.isVisible = false;
              refreshAppFlag = false;
        	  scope.view.lblLoaderText.isVisible = false;
              voltmx.application.dismissLoadingScreen();
              return;
            }
          } else {
			if(typeof scope.xhr.response === "string")
				resp = JSON.parse(scope.xhr.response);
			else
				resp = scope.xhr.response;
            if(resp && resp.opstatus && resp.opstatus == 17005 && resp.mferrmsg && resp.mferrmsg.indexOf("InvalidToken: Token Expired") !== -1){
              PREV_FORM = voltmx.application.getCurrentForm().id;
              applicationManager.getConfigManager().loaderText = applicationManager.getConfigManager().refreshSessionMsg;
              scope.sessionTimedOut();
              return;
            } else{
              scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
              scope.view.lblDownloadError.isVisible = true;
              scope.view.flxScreenshots.isVisible = false;
              scope.view.forceLayout();
              scope.view.flxLoader.isVisible = false;
              refreshAppFlag = false;
        	  scope.view.lblLoaderText.isVisible = false;
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
        scope.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        scope.view.lblLoaderText.isVisible = false;
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
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
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
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
        voltmx.application.dismissLoadingScreen();
        voltmx.print("CATCH : "+err);
      }
    },
  
    /**
     * Binary download success callback method.
     * This method updates the status of downloaded app in the list.
     * This method initiates next app download if available in the queue.
     * @callback downloadCallback
     */
    downloadCallback : function(){
     try{
       voltmx.print("Download success callback");
       var downloadAppsList = voltmx.store.getItem("downloadAppsList");
       var viewAppData = applicationManager.getItem("SELECTED_APP_DETAILS");
       if(viewAppData.fabric_app_id == downloadAppsList[0].rowData.fabric_app_id){
          this.view.btnGet.isVisible = true;
          this.view.imgDownloading.isVisible = false;
       }
       downloadAppsList.shift();
       voltmx.store.setItem("downloadAppsList",downloadAppsList);
       if(downloadAppsList.length !==undefined && downloadAppsList.length > 0 ){
         this.presenter.startDownloadProcess(downloadAppsList[0].rowData);
       } else {
         voltmx.store.setItem("downloadInProgress", false);
       }
     }catch(err){
       voltmx.print("CATCH : downloadCallback  :"+err);
     }
   },
  
  /**
    * Binary download error callback method
    * This method updates the status of downloaded app in the list.
    * This method initiates next app download if available in the queue.
    * @callback downloadErrorCallback
    * @param {json} error - Error Response
    */
   downloadErrorCallback : function(error){
     try{
       voltmx.print("Download Error callback");
       this.view.btnGet.isVisible = true;
       this.view.imgDownloading.isVisible = false;
       var downloadAppsList = voltmx.store.getItem("downloadAppsList");
       var viewAppData = applicationManager.getItem("SELECTED_APP_DETAILS");
       if(viewAppData.fabric_app_id == downloadAppsList[0].rowData.fabric_app_id){
          this.view.btnGet.isVisible = true;
          this.view.imgDownloading.isVisible = false;
       }
       var appName = downloadAppsList[0].rowData.appName;
       downloadAppsList.shift();
       voltmx.store.setItem("downloadAppsList",downloadAppsList);
       this.showDownloadErrorAlert(error, appName);
       if(downloadAppsList.length !==undefined && downloadAppsList.length > 0){
         	this.presenter.startDownloadProcess(downloadAppsList[0].rowData);
       	} else {
            voltmx.store.setItem("downloadInProgress", false);
       	}
        
     }catch(err){
       voltmx.print("CATCH : downloadErrorCallback  :"+err);
     }
   },
  
   /**
    * This method gets invoked when user clicks on open button
    * This method launches the web app in device browser.
    */
   onClickOfLaunchWebAppInAppDetails: function(){
    try{
        var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        if(!CommonUtilsManager.isNetworkAvailable()){
           	alert(applicationManager.getConfigManager().networkErrorMsg);
          	return;
      	}
        var commonUtils = applicationManager.getCommonUtilsManager();
        var config = applicationManager.getConfigManager();
        var serverUrl = commonUtils.getServerUrl();
        var filename;
        this.view.forceLayout();
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
          voltmx.application.openURL(webAppUrl);
        }
      }catch(ex){
        voltmx.print("Catch in launchWebApp" + ex);
      }
  },
  
  /**
    * This method gets invoked when user clicks on device back.
    */
   onDeviceBack : function(){
     voltmx.print("on device back");
   },
  
  /**
    * Session Timeout callback method
    * This method gets invoked when token gets expired.
    * This method does init and login again.
    */
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
   },
  showDownloadErrorAlert: function(error, appName){
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
      }else{
        alert(config.unableToDownloadErrorMsg.replace("<appname>", appName));
      }
    }else{
      alert(config.unableToDownloadErrorMsg.replace("<appname>", appName));
    }
  }
});