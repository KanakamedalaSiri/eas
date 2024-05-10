define({
  
    /**
    * This method gets invoked during form initialization.
    * This method does widget data mapping.
    */
    init: function() {
        var widgetDataMap = {
            "lblAppName": "appName",
            "lblAppDescription": "appDescription",
            "lblVersion": "appVersion",
            "imgAppIcon": "appIcon",
            "btnDownload": "btnDownload",
            "lblSeparator": "lblSeparator",
            "flxApps": "flxApps",
            "flxOuter": "flxOuter",
            "imgDownloading": "imgDownloading",
          	"lblPlatformTab": "platformTab",
          	"btnLaunch": "btnLaunch"
        };
        this.view.segAppsList.widgetDataMap = widgetDataMap;
      	this.view.onDeviceBack = function(){};
    },
  
  /**
    * Store form Post show event.
    * This method invokes presentation to fetch apps list from server.
    */
    postshow: function() {
      try{
        this.view.flxLoader.isVisible = true;
        refreshAppFlag = true;
        this.view.lblLoaderText.isVisible = false;
        this.view.flxAppsList.showFadingEdges = false;
        this.view.forceLayout();
        this.view.segAppsList.isVisible = false;
        this.view.lblNoApps.isVisible = false;
        this.showLogout();
        if (this.updateRequired) {
            this.presenter.fetchAppsList();
        } else {
            this.setSegmentData(applicationManager.getCommonUtilsManager().getCustomData("EnterpriseApps"));
        }
      }catch(err){
        voltmx.application.dismissLoadingScreen();
        voltmx.print("CATCH : postshow of store form "+err);
      }
    },

   /**
    * On Navigate callback method
    * @param {String} updateRequired
    */
    onNavigate: function(updateRequired) {
        voltmx.application.dismissLoadingScreen();
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
        applicationManager.getConfigManager().loaderText = "";
        voltmx.application.dismissLoadingScreen();
        if (formdata !== undefined && !formdata.isError && !formdata.isDownloadErrorCallback && !formdata.isDownloadCallback) {
            this.setSegmentData(formdata.data);
        } else if (formdata !== undefined && formdata.isError) {
            this.errorCallback(formdata.data);
        } else if(formdata !== undefined && formdata.isDownloadCallback){
            this.downloadCallback();
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
        voltmx.application.dismissLoadingScreen();
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
          	var config = applicationManager.getConfigManager();
          	var systemChannelId = data[0].System_ChannelId;
            data[0].flxAppsListTemplate = {
                "height": "112dp"
            };
            data[0].flxOuter = {
                "top": "8%",
                "height": "92%"
            };
          //#ifdef iphone
          if(config.responsive_web_channel_id === systemChannelId || config.native_web_channel_id === systemChannelId){
          	data[0].btnLaunch.height = "28.5%";          	
          }
          else{
            data[0].btnDownload.height = "28.5%";
          }
          //#endif
          //#ifdef android
           if(config.responsive_web_channel_id === systemChannelId || config.native_web_channel_id === systemChannelId){
          	data[0].btnLaunch.height = "25.5%";
          }
          else{
          	data[0].btnDownload.height = "25.5%";
          }
          //#endif
			this.checkChildAppsDownloadStatus(data);
            this.view.segAppsList.setData(data);
            this.view.segAppsList.isVisible = true;
          	this.view.lblNoApps.isVisible = false;
            voltmx.application.dismissLoadingScreen();
        } else {
            this.view.segAppsList.isVisible = false;
            this.view.lblNoApps.isVisible = true;
            voltmx.application.dismissLoadingScreen();
        }
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
        this.view.forceLayout();
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
        voltmx.application.dismissLoadingScreen();
        voltmx.print("CATCH : setsegment data "+err);
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
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
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
        voltmx.print("CATCH : errorCallback "+err);
      }
    },
   /**
     * This method gets invoked on clicking "GET" in App details form.
     * This method invokes presentation methods to download the binaries.
     */
    onClickOfGetBtn: function(context,eventobject) {
      try{
        var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        if(!CommonUtilsManager.isNetworkAvailable()){
           	alert(applicationManager.getConfigManager().networkErrorMsg);
          	return;
      	}
        voltmx.application.dismissLoadingScreen();
        this.view.forceLayout();
        voltmx.print(JSON.stringify(eventobject));
        var selectedItem = this.view.segAppsList.data[eventobject.rowIndex];
        if (selectedItem !== null && selectedItem !== undefined) {
            selectedItem.btnDownload={"text":"GET","isVisible": false,"highlightOnParentFocus" :true,"highlightedSkin":"sknBtnGetNative"};
            selectedItem.imgDownloading={"src":"download.gif","isVisible":true};
            this.view.segAppsList.setDataAt(selectedItem, eventobject.rowIndex, 0);
            var temp = {
              "rowData" : selectedItem
            };
            var downloadAppsList = voltmx.store.getItem("downloadAppsList");
            if(downloadAppsList.length === undefined){
              downloadAppsList= [];
            }
          	downloadAppsList.push(temp);
          	voltmx.store.setItem("downloadAppsList",downloadAppsList);
            if(! voltmx.store.getItem("downloadInProgress")){
              this.presenter.startDownloadProcess(selectedItem);
            }
            	
        }
      }catch(err){
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
        voltmx.print("CATCH : on click of get button "+err);
      }
    },
  
    /**
    * On row click event
    * This method is used to navigate to app details form
    */
    onRowClickOfSegAppsList: function() {
      try{
        voltmx.application.dismissLoadingScreen();
        var selectedItem = this.view.segAppsList.selectedRowItems[0];
        if (selectedItem !== null && selectedItem !== undefined) {
            applicationManager.setItem("SELECTED_APP_DETAILS",selectedItem);
            this.presenter.navigateToAppDetailsForm(false);
        }
      }catch(err){
        voltmx.application.dismissLoadingScreen();
        voltmx.print("CATCH : on Row click of segment "+err);
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
              this.view.lblLoaderText.text = applicationManager.getConfigManager().loaderText;
              this.view.lblLoaderText.isVisible = true;
              this.view.segAppsList.removeAll();
              this.view.forceLayout();
            }
            var authModule = applicationManager.getAuthModule();
            authModule.presentationController.logout(this.view.browserLogin);
        } catch (err) {
            this.view.flxLoader.isVisible = false;
          	refreshAppFlag = false;
            this.view.lblLoaderText.isVisible = false;
            voltmx.print("CATCH : Error in invoking logout " + err);
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
       	isPullToRefresh = false;
        this.view.flxLoader.isVisible = false;
        refreshAppFlag = false;
        this.view.lblLoaderText.isVisible = false;
        voltmx.application.dismissLoadingScreen();
        voltmx.print("CATCH : postshow of store form "+err);
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
       var config = applicationManager.getConfigManager();
       var data = this.view.segAppsList.data;
       var downloadAppsList = voltmx.store.getItem("downloadAppsList");
       var rowData = downloadAppsList[0].rowData;
       var rowIndex;
       rowData.btnDownload={"text":"GET","isVisible": true,"highlightOnParentFocus" :true,"highlightedSkin":"sknBtnGetNative"};
       rowData.imgDownloading={"src":"download.gif","isVisible":false};
       for(var idx =0; idx <data.length; idx++){
         if(data[idx].fabric_app_id == rowData.fabric_app_id  && data[idx].System_ChannelId == config.channel_id){
            rowIndex = idx;
            break;
         }
       }
       this.view.segAppsList.setDataAt(rowData, rowIndex, 0);
       downloadAppsList.shift();
       voltmx.store.setItem("downloadAppsList",downloadAppsList);
       if(downloadAppsList.length !==undefined && downloadAppsList.length > 0){
         this.presenter.startDownloadProcess(downloadAppsList[0].rowData);
       } else {
         voltmx.store.setItem("downloadInProgress", false);
       }
       voltmx.print("downloadInProgress:: "+ voltmx.store.getItem("downloadInProgress"));
       voltmx.print("Download pending list : "+downloadAppsList);
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
       var config = applicationManager.getConfigManager();
       var data = this.view.segAppsList.data;
       var downloadAppsList = voltmx.store.getItem("downloadAppsList");
       var rowData = downloadAppsList[0].rowData;
       var rowIndex;
       rowData.btnDownload={"text":"GET","isVisible": true,"highlightOnParentFocus" :true,"highlightedSkin":"sknBtnGetNative"};
       rowData.imgDownloading={"src":"download.gif","isVisible":false};
       for(var idx =0; idx <data.length; idx++){
         if(data[idx].fabric_app_id == rowData.fabric_app_id && data[idx].System_ChannelId == config.channel_id){
            rowIndex = idx;
            break;
         }
       }
       var appName = rowData.appName;
       this.view.segAppsList.setDataAt(rowData, rowIndex, 0);
       downloadAppsList.shift();
       voltmx.store.setItem("downloadAppsList",downloadAppsList);
       voltmx.print("Download pending list : "+downloadAppsList);
       voltmx.print("downloadInProgress:: "+ voltmx.store.getItem("downloadInProgress"));
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
    * Checks status of the app whether it is downloading inprogress or not by checking whether the app is present in queue
    * Sets downloading loader image if download is inprogress.
    * @param {json} data - Apps list
    */
   checkChildAppsDownloadStatus : function(data){
     var config = applicationManager.getConfigManager();
     for(var idx =0; idx<data.length; idx++){
         var downloadAppsList = voltmx.store.getItem("downloadAppsList");
         var isDownloading = null;
         var systemChannelId = data[idx].System_ChannelId;
         if(downloadAppsList.length !== undefined)
           isDownloading = downloadAppsList.filter(function (arr) {return arr.rowData.fabric_app_id === data[idx].fabric_app_id;});
         if(systemChannelId !== config.responsive_web_channel_id && systemChannelId !== config.native_web_channel_id){ 
       		if(isDownloading !== null && isDownloading.length > 0){
            	data[idx].btnDownload = {"text":"GET","isVisible":false,"highlightOnParentFocus" :true,"highlightedSkin":"sknBtnGetNative"};
            	data[idx].imgDownloading = {"src":"download.gif","isVisible":true};
         	} else{
            	data[idx].btnDownload = {"text":"GET","isVisible":true,"highlightOnParentFocus" :true,"highlightedSkin":"sknBtnGetNative"};
            	data[idx].imgDownloading = {"src":"download.gif","isVisible":false};
         	}
         }
     }
   },
   
   onDeviceBack : function(){
     voltmx.print("on device back");
   },
  
  /**
    * This method gets invoked when user clicks on open button
    * This method launches the web app in device browser.
    */
    onClickOfLaunchWebApp : function(context,eventobject) {
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
        voltmx.application.dismissLoadingScreen();
        this.view.forceLayout();
        voltmx.print(JSON.stringify(eventobject));
        var selectedItem = this.view.segAppsList.data[eventobject.rowIndex];
        if (selectedItem !== null && selectedItem !== undefined) {
           
           for (var i = 0; i < selectedItem.channel_attachments_info.length; i++) {
                if (selectedItem.channel_attachments_info[i].System_AttachmentType == config.attachment_type_of_binary) {
                    
                    filename = selectedItem.channel_attachments_info[i].System_AttachmentName;
                    break;
                }
            }
            if(filename.endsWith('.zip')){
              filename = filename.replace('.zip', '');
            }else if(filename.endsWith('.war')){
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
         this.view.segAppsList.removeAll();
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