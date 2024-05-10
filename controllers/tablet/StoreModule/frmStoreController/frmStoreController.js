define({

    /**
    * This method gets invoked during form initialization.
    * This method does widget data mapping.
    */
    init: function() {
        var widgetDataMap = {
            "lblAppNameLeft": "appNameLeft",
            "lblAppDescriptionLeft": "appDescriptionLeft",
            "lblVersionLeft": "appVersionLeft",
            "imgAppIconLeft": "appIconLeft",
            "btnDownloadLeft": "btnDownloadLeft",
            "lblSeparatorLeft": "lblSeparatorLeft",
            "flxAppsLeft": "flxAppsLeft",
            "flxOuterLeft": "flxOuterLeft",
          	"imgDownloadingLeft": "imgDownloadingLeft",
          	"lblPlatformTabLeft": "platformTabLeft",
          	"btnLaunchLeft":"btnLaunchLeft",
          	"lblAppNameRight": "appNameRight",
            "lblAppDescriptionRight": "appDescriptionRight",
            "lblVersionRight": "appVersionRight",
            "imgAppIconRight": "appIconRight",
            "btnDownloadRight": "btnDownloadRight",
            "lblSeparatorRight": "lblSeparatorRight",
            "flxAppsRight": "flxAppsRight",
            "flxOuterRight": "flxOuterRight",
          	"imgDownloadingRight": "imgDownloadingRight",
          	"lblPlatformTabRight": "platformTabRight",
          	"btnLaunchRight":"btnLaunchRight"
        };
        this.view.segAppsList.widgetDataMap = widgetDataMap;
      	
    },
  	preShow: function(){
      voltmx.application.dismissLoadingScreen();
      this.showLogout();
      this.view.lblLoaderText.isVisible = false;
    },

   /**
    * Store form Post show event.
    * This method invokes presentation to fetch apps list from server.
    */
    postshow: function() {
      try{
        downloadQueue = [];
        this.view.flxLoader.isVisible = true;
        refreshAppFlag = true;
        this.view.flxAppsList.showFadingEdges = false;
        this.view.flxScreenshots.showFadingEdges = false;
        this.view.flxAppDetailsParent.showFadingEdges = false;
        this.view.forceLayout();
        this.view.segAppsList.isVisible = false;
        this.view.lblNoApps.isVisible = false;
        if (this.updateRequired) {
            this.presenter.fetchAppsList();
        } else {
            this.setSegmentData(applicationManager.getCommonUtilsManager().getCustomData("EnterpriseApps"));
        }
       
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        voltmx.print("CATCH : postshow of store form "+err);
      }
    },
  
   /**
    * On Navigate callback method
    * @param {String} updateRequired
    */
    onNavigate: function(updateRequired) {
        this.view.lblHeader.text = applicationManager.getConfigManager().constants.header_label_on_other_forms;
        this.view.segAppsList.removeAll();
        this.view.forceLayout();
        this.updateRequired = updateRequired;
    },

    /**
    * Updates UI with provided data
    * @param {json} formdata - Success/Error Response
    */
    updateUI: function(formdata) {
      	if(formdata === "refreshApp"){
          refreshAppFlag = true;
          this.view.flxLoader.isVisible = true;
          return;
        }
        this.showLogout();
        this.view.flxLoader.isVisible = false;
      	refreshAppFlag = false;
      	voltmx.application.dismissLoadingScreen();
        applicationManager.getConfigManager().loaderText = "";
        if (formdata !== undefined && !formdata.isError && !formdata.isDownloadErrorCallback && !formdata.isDownloadCallback) {
            this.setSegmentData(formdata.data);
        } else if (formdata !== undefined && formdata.isError) {
            this.errorCallback(formdata.data);
        }else if(formdata !== undefined && formdata.isDownloadCallback){
            this.downloadSuccessCallback();
        } else if(formdata !== undefined && formdata.isDownloadErrorCallback){
          	this.downloadErrorCallback(formdata.data);
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
      } catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        voltmx.print("CATCH : show logout "+err);
      }
    },

   /**
    * Sets app list data into segment
    * @callback downloadErrorCallback
    * @param {json} data - apps list
    */
    setSegmentData: function(data) {
      try{
        if (data && data.length > 0) {
            var splittedData = this.splitData(data);
          	this.view.segAppsList.data = this.generateSegmentData(splittedData);
          	this.setAppDetails();
          	this.view.segAppsList.isVisible = true;
          	this.view.lblNoApps.isVisible = false;
            this.view.flxLoader.isVisible = false;
          	refreshAppFlag = false;
        } else {
          	this.view.segAppsList.removeAll();
            this.view.lblNoApps.isVisible = true;
            this.view.flxLoader.isVisible = false;
          	this.view.flxAppDetailsContainer.isVisible = false;
          	applicationManager.removeItem("SELECTED_APP_DETAILS");
          	applicationManager.removeItem("lastViewedApp");
          	refreshAppFlag = false;
        }
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
        this.view.forceLayout();
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        voltmx.print("CATCH : setsegment data "+err);
      }
    },
  	splitData: function(data){
      	var leftData = [], rightData = [];
      	for(var i in data){
          if(i % 2 === 0)
            leftData.push(data[i]);
           else
             rightData.push(data[i]);
        }
      	return {
          'leftData': leftData,
          'rightData': rightData
        };
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
                this.view.flxLoader.isVisible = false;
              	refreshAppFlag = false;
            } else {
                basicConf.message = error.errmsg || error.message ||config.serverErrorMsg;
                voltmx.ui.Alert(basicConf, {});
                this.view.flxLoader.isVisible = false;
              	refreshAppFlag = false;
            }
        }
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        voltmx.print("CATCH : "+err);
      }
    },
 /**
     * This method gets invoked on clicking "GET" in App details form.
     * This method invokes presentation methods to download the binaries.
     */
    onClickOfGetBtn: function(eventobject, params) {
      try{
        var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        if(!CommonUtilsManager.isNetworkAvailable()){
           	alert(applicationManager.getConfigManager().networkErrorMsg);
          	return;
      	}
        var selectedIndex = params[0].rowIndex;
        var selectedSide = params[1];

        var selectedItem = this.view.segAppsList.selectedRowItems[0][selectedSide];
        if (selectedItem !== null && selectedItem !== undefined) {
            this.showLoadingForApp(selectedIndex, selectedSide);
            downloadStatus[selectedItem.fabric_app_id].isDownloading = true;
          	downloadQueue.push(selectedItem);
          	if(downloadQueue.length === 1)
          		this.beginNextDownload();
        }
        else{
          this.view.flxLoader.isVisible = false;
          refreshAppFlag = false;
        }
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        voltmx.print("CATCH : on click of get button "+err);
      }
    },

   /**
    * On row click event
    * This method is used to navigate to app details form
    */
    onRowClickOfSegAppsList: function(context, selectedSide) {
      try{
        scope = this;
        var selectedItem = this.view.segAppsList.selectedRowItems[0][selectedSide];
        var config = applicationManager.getConfigManager();
      	if (selectedItem !== null && selectedItem !== undefined) {
            applicationManager.setItem("SELECTED_APP_DETAILS",selectedItem);
          	var platformTab = selectedItem.platformTab.text;
			      this.view.lblPlatformTab.text = platformTab;
          	var systemChannelId = selectedItem.System_ChannelId;
        	  if(config.responsive_web_channel_id === systemChannelId || config.native_web_channel_id === systemChannelId){
          		this.view.btnWebApp.isVisible = true;
          		this.view.btnGet.isVisible = false;
              this.view.lblVersion.isVisible = false;
                this.view.imgDownloading.isVisible = false;
          	}else{
              this.view.lblVersion.isVisible = true;
              this.view.btnWebApp.isVisible = false;
          		if(downloadStatus[selectedItem.fabric_app_id].isDownloading){
          			this.view.btnGet.isVisible = false;
          			this.view.imgDownloading.isVisible = true;
          		}
          		else{
          			this.view.btnGet.isVisible = true;
          			this.view.imgDownloading.isVisible = false;
          		}
            }
        	voltmx.store.setItem("lastViewedApp", selectedItem.fabric_app_id + platformTab);
          	this.view.flxScreenshots.isVisible = false;
        	this.view.flxScreenshot0.isVisible = false;
        	this.view.flxScreenshot1.isVisible = false;
        	this.view.flxScreenshot2.isVisible = false;
        	this.view.flxScreenshot3.isVisible = false;
        	this.view.lblDownloadError.isVisible = false;
			this.view.lblAppName.text = selectedItem.appName_full;
        	this.view.lblVersion.text = selectedItem.appVersion.text;
        	this.view.lblAppDescription.text = selectedItem.longDescription;
        	
          	if (selectedItem.appIcon.base64 !== undefined && selectedItem.appIcon.base64 !== null) {
            	this.view.imgAppIcon.base64 = selectedItem.appIcon.base64;
        	} else {
            	this.view.imgAppIcon.src = selectedItem.appIcon;
        	}
        	
          	var attachments = selectedItem.channel_attachments_info;
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
        	this.imgIds =imageIdentifiers;
        	this.index = 0;
        	this.view.flxAppDetailsContainer.isVisible = true;
       		this.getScreenshots(); 
       }
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        voltmx.print("CATCH : on Row click of segment "+err);
      }
    },
    /**
     * Logout Method
     * This method gets invoked when user clicks Logout button
     */
    onClickOfLogout: function() {
        try {
          	voltmx.application.dismissLoadingScreen();
          	downloadQueue = [];
            if(applicationManager.getConfigManager().loaderText !== ""){
              refreshAppFlag = true;
              this.view.flxLoader.isVisible = true;
              this.view.lblLoaderText.text = applicationManager.getConfigManager().loaderText;
              this.view.segAppsList.removeAll();
              this.view.forceLayout();
            }
          	refreshAppFlag = true;
            this.view.flxLoader.isVisible = true;
            var authModule = applicationManager.getAuthModule();
            authModule.presentationController.logout(this.view.browserLogin);
        } catch (err) {
            this.view.flxLoader.isVisible = false;
          	refreshAppFlag = false;
            voltmx.print("CATCH : Error in invoking logout " + err);
        }
    },
  	onClickOfCross: function(){
    	this.view.flxAppDetailsContainer.isVisible = false;
      	this.view.lblAppName.text = null;
        this.view.lblVersion.text = null;
        this.view.lblAppDescription.text = null;
  	},
  /**
     * Get screenshots method
     * This method fetches the screenshot from the server.
     * @param {array} imgIds - Image Identifiers
     */
  	getScreenshots: function() {
      try{
         if (scope.imgIds.length > 0 ) {
           var commonUtils = applicationManager.getCommonUtilsManager();
           if(!commonUtils.isNetworkAvailable()){
             alert(applicationManager.getConfigManager().networkErrorMsg);
             scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
             scope.view.lblDownloadError.isVisible = true;
             scope.view.flxScreenshots.isVisible = false;
             scope.view.forceLayout();
             this.view.flxLoader.isVisible = false;
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
             refreshAppFlag = true;
             this.view.flxLoader.isVisible = true;
             scope.xhr = new voltmx.net.HttpRequest();
             //#ifdef ipad
             	scope.xhr.backgroundTransfer = true;
             //#endif
             var url = serverUrl + downloadServiceUrl + "?file_id=" + scope.imgIds[scope.index].identifier;
             scope.xhr.open(constants.HTTP_METHOD_GET, url);
             scope.xhr.setRequestHeader("X-Voltmx-Authorization", konyclient.currentClaimToken);
             scope.xhr.onReadyStateChange = scope.getScreenshotCallback;
             scope.xhr.send();
             
           }
        } else {
            this.view.flxScreenshots.isVisible = false;
            this.view.flxLoader.isVisible = false;
          	refreshAppFlag = false;
        }
      }catch(err){
        voltmx.print("CATCH : error while downloading screenshots  "+err);
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
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
            if(scope.xhr.response !== null){
              resp = scope.xhr.response;
              if (resp.data === undefined || resp.data === null) {
                scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
                scope.view.lblDownloadError.isVisible = true;
                scope.view.flxScreenshots.isVisible = false;
                scope.view.forceLayout();
                this.view.flxLoader.isVisible = false;
                refreshAppFlag = false;
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
              this.view.flxLoader.isVisible = false;
              refreshAppFlag = false;
              return;
            }
          } else {
            if(typeof scope.xhr.response === 'string')
            	resp = JSON.parse(scope.xhr.response);
            else
              	resp = scope.xhr.response;
            if(resp && resp.opstatus && resp.opstatus == 17005 && resp.mferrmsg && resp.mferrmsg.indexOf("InvalidToken: Token Expired") !== -1){
              PREV_FORM = voltmx.application.getCurrentForm().id;
              config.loaderText = config.refreshSessionMsg;
              scope.sessionTimedOut();
              return;
            } else{
              scope.view.lblDownloadError.text = applicationManager.getConfigManager().imgDownloadFailureErrorMsg;
              scope.view.lblDownloadError.isVisible = true;
              scope.view.flxScreenshots.isVisible = false;
              scope.view.forceLayout();
              this.view.flxLoader.isVisible = false;
              refreshAppFlag = false;
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
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        scope.getScreenshots();
      }
    },
  
   /**
    * On Pull to Refresh on Segment
    * This method invokes presentation to refresh the list.
    */
  	onPullToRefresh : function(){
     try{
	    var CommonUtilsManager = applicationManager.getCommonUtilsManager();
		if(!CommonUtilsManager.isNetworkAvailable()){
          alert(applicationManager.getConfigManager().networkErrorMsg);
          return;
		}
		
       if(!voltmx.store.getItem("downloadInProgress")){
        voltmx.application.dismissLoadingScreen();
        this.view.flxLoader.isVisible = true;
         refreshAppFlag = true;
        this.view.lblLoaderText.isVisible = false;
        this.view.forceLayout();
        var curForm = voltmx.application.getCurrentForm().id;
        PREV_FORM = curForm;
        refreshAppFlag = true;
       	isPullToRefresh = true;
        var nativeAuthModule = applicationManager.getAuthModule();
        nativeAuthModule.presentationController.appPropertiesSuccessCallback();
       }
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        isPullToRefresh = false;
        this.view.lblLoaderText.isVisible = false;
        voltmx.application.dismissLoadingScreen();
        voltmx.print("CATCH : postshow of store form "+err);
      }
    },
    /**
     * This method gets invoked on clicking "GET" in App details form.
     * This method invokes presentation methods to download the binaries.
     */
	onClickOfGetBtnInAppDetails: function(){
      try{
        var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        if(!CommonUtilsManager.isNetworkAvailable()){
           	alert(applicationManager.getConfigManager().networkErrorMsg);
          	return;
      	}
      	var selectedItem = applicationManager.getItem("SELECTED_APP_DETAILS");
        if (selectedItem !== null && selectedItem !== undefined) {
        	downloadStatus[selectedItem.fabric_app_id].isDownloading = true;
        	downloadQueue.push(selectedItem);
          	this.view.btnGet.isVisible = false;
          	this.view.imgDownloading.isVisible = true;
        	var itemLocation = downloadStatus[selectedItem.fabric_app_id]; 
        	this.showLoadingForApp(parseInt(itemLocation.itemIndex), itemLocation.itemSide);
          	if(downloadQueue.length === 1)
          		this.beginNextDownload();
        }
        else{
          this.view.flxLoader.isVisible = false;
          refreshAppFlag = false;
        }
      }catch(error){
        voltmx.print('CATCH : In OnclickOfGetBtnInAppDetails ' + error);
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
      }
    },
  	/*
     * This method generates segment data to be displayed on AppsList and returns it.
    */
  	generateSegmentData: function(splittedData){
      	var mergedData = [];
      	var leftData = splittedData.leftData, rightData = splittedData.rightData;
      	downloadStatus = {};
      	var lastViewedApp = voltmx.store.getItem("lastViewedApp");
      	applicationManager.removeItem("SELECTED_APP_DETAILS");
      	for(var leftindex in leftData){
          mergedData.push({});
          for(var key in leftData[leftindex]){
            mergedData[leftindex][key + 'Left'] = leftData[leftindex][key];
          }
          mergedData[leftindex]['Left'] = leftData[leftindex];
          if(leftData[leftindex].fabric_app_id + leftData[leftindex].platformTab.text === lastViewedApp){
            applicationManager.setItem("SELECTED_APP_DETAILS", leftData[leftindex]);
          }
          var itemLocation  = {
            "itemIndex": leftindex,
            "itemSide": "Left",
            "isDownloading": false
          };
		  if (leftData[leftindex].System_ChannelId !== "7" && leftData[leftindex].System_ChannelId !== "8" && leftData[leftindex].System_ChannelId !== "9")
			  downloadStatus[leftData[leftindex].fabric_app_id] = itemLocation;
        }
      	for(var rightindex in rightData){
          for(var key in rightData[rightindex]){
            mergedData[rightindex][key + 'Right'] = rightData[rightindex][key];
          }
          mergedData[rightindex]['Right'] = rightData[rightindex];
          if(rightData[rightindex].fabric_app_id + rightData[rightindex].platformTab.text === lastViewedApp){
            applicationManager.setItem("SELECTED_APP_DETAILS", rightData[rightindex]);
          }
          
          var itemLocation  = {
            "itemIndex": rightindex,
            "itemSide": "Right",
            "isDownloading": false
          };
      if (rightData[rightindex].System_ChannelId !== "7" && rightData[rightindex].System_ChannelId !== "8" && rightData[rightindex].System_ChannelId !== "9")
          downloadStatus[rightData[rightindex].fabric_app_id] = itemLocation;
        }
      	if(leftindex !=  rightindex){
          mergedData[leftindex]['flxOuterRight'] = {isVisible:false};
        }
		return mergedData;
    },
  	/*
    	This method will show loading icon for when "GET" button is clicked
    */
	showLoadingForApp:function(index, itemSide){
      var data = this.view.segAppsList.data[index];
      data['btnDownload' + itemSide] = {isVisible: false};
      data['imgDownloading' + itemSide] = {src:'download.gif', isVisible: true};
      this.view.segAppsList.setDataAt(data, index, 0);
    },
  	/*
    	This method will dismiss loading status and set it back to "GET" button
    */
	dismissLoadingForApp:function(){
      var fabricAppId = downloadQueue[0].fabric_app_id;
      var itemLocation = downloadStatus[fabricAppId];
      downloadStatus[fabricAppId].isDownloading = false;
      var index = parseInt(itemLocation.itemIndex);
      var itemSide = itemLocation.itemSide;
      var data = this.view.segAppsList.data[index];
      data['btnDownload' + itemSide] = {text:"GET", isVisible: true};
      data['imgDownloading' + itemSide] = {isVisible: false};
      this.dismissLoadingInAppDetails(fabricAppId);
      this.view.segAppsList.setDataAt(data, index, 0);
      downloadQueue.splice(0, 1);
      
    },
  	/*
    	This method will begin downloading the next app present in the downloadQueue
    */
  	beginNextDownload: function(){
      if(downloadQueue.length !== 0){
        voltmx.store.setItem("downloadInProgress", true);
        var selectedItem = downloadQueue[0];
        this.presenter.startDownloadProcess(selectedItem);
      }else{
        voltmx.store.setItem("downloadInProgress", false);
      }
    },
  	/*
    	This method will dismiss loading status in app details
    */
  	dismissLoadingInAppDetails: function(fabricAppId){
      if(this.view.flxAppDetailsContainer.isVisible){
        if(fabricAppId + "NATIVE" === voltmx.store.getItem("lastViewedApp")){
           this.view.btnGet.isVisible = true;
           this.view.imgDownloading.isVisible = false;
        }
      }
    },
  
    /**
    * This method gets invoked when user clicks on open button
    * This method launches the web app in device browser.
    */
  	onClickOfWebAppLaunch:function(eventobject, params) {
      try{
        var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        if(!CommonUtilsManager.isNetworkAvailable()){
           	alert(applicationManager.getConfigManager().networkErrorMsg);
          	return;
      	}
        var selectedIndex = params[0].rowIndex;
        var selectedSide = params[1];
		
        var selectedItem = this.view.segAppsList.selectedRowItems[0][selectedSide];
        var config = applicationManager.getConfigManager();
        var commonUtils = applicationManager.getCommonUtilsManager();
        var filename;
        var serverUrl = commonUtils.getServerUrl();
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
        voltmx.print("catch in onClickOfWebAppLaunch :" + ex);
      }
    },
  	onClickOfWebAppLaunchInAppDetails: function(){
      var selectedItem = applicationManager.getItem("SELECTED_APP_DETAILS");
      var config = applicationManager.getConfigManager();
        var commonUtils = applicationManager.getCommonUtilsManager();
        var filename;
        var serverUrl = commonUtils.getServerUrl();
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
          var webAppUrl = serverUrl + "/apps/" + filename;
          voltmx.application.openURL(webAppUrl);
       }
    },
  /**
     * Binary download success callback method.
     * This method updates the status of downloaded app in the list.
     * This method initiates next app download if available in the queue.
     * @callback downloadCallback
     */
  	downloadSuccessCallback: function(){
      this.dismissLoadingForApp();
      this.beginNextDownload();
    },
  
   /**
    * Binary download error callback method
    * This method updates the status of downloaded app in the list.
    * This method initiates next app download if available in the queue.
    * @callback downloadErrorCallback
    * @param {json} error - Error Response
    */
  	downloadErrorCallback: function(error){
      if(downloadQueue && downloadQueue.length > 0){
        var appName = downloadQueue[0].appName;
        this.showDownloadErrorAlert(error, appName);
        this.dismissLoadingForApp();   
        this.beginNextDownload();
      }
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
   /*
  		This method will update the app details whenever the session has been timed out
   */
  setAppDetails: function(){
      try{
        if(this.view.flxAppDetailsContainer.isVisible === false)
          	return;
        scope = this;
        
        var config = applicationManager.getConfigManager();
        var selectedItem = applicationManager.getItem("SELECTED_APP_DETAILS");
      	if (selectedItem !== null && selectedItem !== undefined) {          
        this.view.lblPlatformTab.text = selectedItem.platformTab.text;
          	var systemChannelId = selectedItem.System_ChannelId;
        	if(config.responsive_web_channel_id === systemChannelId || config.native_web_channel_id === systemChannelId){
          		this.view.btnWebApp.isVisible = true;
          		this.view.btnGet.isVisible = false;
              this.view.lblVersion.isVisible = false;
          	}else{
              this.view.lblVersion.isVisible = true;
              this.view.btnWebApp.isVisible = false;
          		if(downloadStatus[selectedItem.fabric_app_id].isDownloading){
          			this.view.btnGet.isVisible = false;
          			this.view.imgDownloading.isVisible = true;
          		}
          		else{
          			this.view.btnGet.isVisible = true;
          			this.view.imgDownloading.isVisible = false;
          		}
            }
          	
          	this.view.flxScreenshots.isVisible = false;
        	this.view.flxScreenshot0.isVisible = false;
        	this.view.flxScreenshot1.isVisible = false;
        	this.view.flxScreenshot2.isVisible = false;
        	this.view.flxScreenshot3.isVisible = false;
        	this.view.lblDownloadError.isVisible = false;
			this.view.lblAppName.text = selectedItem.appName_full;
        	this.view.lblVersion.text = selectedItem.appVersion.text;
        	this.view.lblAppDescription.text = selectedItem.longDescription;
        	
          	if (selectedItem.appIcon.base64 !== undefined && selectedItem.appIcon.base64 !== null) {
            	this.view.imgAppIcon.base64 = selectedItem.appIcon.base64;
        	} else {
            	this.view.imgAppIcon.src = selectedItem.appIcon;
        	}
        	
          	var attachments = selectedItem.channel_attachments_info;
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
        	this.imgIds =imageIdentifiers;
        	this.index = 0;
        	
       		this.getScreenshots(); 
       }else{
         this.view.flxAppDetailsContainer.isVisible = false;
       }
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        voltmx.print("CATCH : on setAppDetails "+err);
      }
    },
  /*
      This method will show download error for the specific app incase the download is interrupted
  */
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