define([], function() {

    var currentScope = null, commonUtils, config;
     /**
     * User defined presentation controller
     * @constructor
     * @extends voltmx.mvc.Presentation.BasePresenter
     */
    function PresentationController_Mobile() {
        voltmx.mvc.Presentation.BasePresenter.call(this);
        currentScope = this;
        commonUtils = applicationManager.getCommonUtilsManager();
        config = applicationManager.getConfigManager();
        this.appsCount = 0;
        this.index = 0;
    }

    inheritsFrom(PresentationController_Mobile, voltmx.mvc.Presentation.BasePresenter);

    PresentationController_Mobile.prototype.initializePresentationController = function() {

    };
    /**
    * This method will navigate to store form
    **/
    PresentationController_Mobile.prototype.navigateToStoreForm = function(data) {
        voltmx.application.dismissLoadingScreen();
        commonUtils.navigateTo("frmStore", data);
    };
    /*
    * This method will navigate to appDetails form
    */
    PresentationController_Mobile.prototype.navigateToAppDetailsForm = function(data) {
        voltmx.application.dismissLoadingScreen();
        commonUtils.navigateTo("frmAppDetails", data);
    };
  	/*
    * This method will navigate to help form
    */
  	PresentationController_Mobile.prototype.navigateToHelpScreenForm = function() {
        voltmx.application.dismissLoadingScreen();
        commonUtils.navigateTo("frmHelpScreen");
    };
  
	/*
    * This method will query and fetch Apps list from server
    */
    PresentationController_Mobile.prototype.fetchAppsList = function() {
        voltmx.application.dismissLoadingScreen();
      	var queryParams = ["System_ChannelId", "eq", config.channel_id,
                           "or", 
                           "System_ChannelId", "eq", config.responsive_web_channel_id, 
                           "or",
                           "System_ChannelId", "eq", config.native_web_channel_id];
                           
      	var query = queryParams.join(" ");
        var criteria = voltmx.mvc.Expression.eq("$filter", query);
        this.businessController.fetchAppsList(criteria, this.fetchAppsListSuccessCallback, this.fetchAppsListErrorCallback);
    };
  	/*
    * Callback method when apps list is fetched succesfully
    */
    PresentationController_Mobile.prototype.fetchAppsListSuccessCallback = function(data) {
        currentScope.index = 0;
        var filteredData = null;
        currentScope.appsCount = 0;
        if(data && data.length >0){
          filteredData = data.filter(function (arr) {return arr.System_FabricAppName != applicationManager.getConfigManager().constants.storeName;});
          currentScope.appsCount = filteredData.length;
        }
        commonUtils.setCustomData("AppsMetaData", filteredData);
        currentScope.getAppIconforAllApps("frmStore");
    };
    /*
    * This method will update the store form with newly fetched apps list.
    */
    PresentationController_Mobile.prototype.updateStoreForm = function(data) {
        commonUtils.setCustomData("EnterpriseApps", data);
        var response = {
          "data": data,
          "isError": false
        };
        if(voltmx.application.getCurrentForm().id === "frmHelpScreen" || PREV_FORM === "frmHelpScreen"){
          currentScope.navigateToHelpScreenForm();
        }
        else{
          currentScope.presentUserInterface("frmStore", response);
        }
    };
	/*
    * Callback method when fetching apps list fails
    */
    PresentationController_Mobile.prototype.fetchAppsListErrorCallback = function(error) {
      	refreshAppFlag = false;
        var response = {
            "data": error,
            "isError": true
        };
        currentScope.presentUserInterface("frmStore", response);
    };
	/*
    * This method will fetch latest app details.
    */
    PresentationController_Mobile.prototype.fetchAppDetails = function() {
        voltmx.application.dismissLoadingScreen();
        var info = applicationManager.getItem("SELECTED_APP_DETAILS");
        var criteria = voltmx.mvc.Expression.eq("$filter", "System_ChannelId eq " + info.System_ChannelId + " and  System_FabricAppId  eq " + info.fabric_app_id);
        this.businessController.fetchAppsList(criteria, this.fetchAppDetailsSuccessCallback, this.fetchAppDetailsErrorCallback);
    };
    /*
   * Callback method invoked when apps list is fetched successfully
   */
    PresentationController_Mobile.prototype.fetchAppDetailsSuccessCallback = function(data) {
        currentScope.index = 0;
        var filteredData = [];
        currentScope.appsCount = 0;
        if(data && data.length >0){
          filteredData = data.filter(function (arr) {return arr.System_FabricAppName != applicationManager.getConfigManager().constants.storeName;});
          currentScope.appsCount = filteredData.length;
        }
        commonUtils.setCustomData("AppsMetaData", filteredData);
        currentScope.getAppIconforAllApps("frmAppDetails");
    };
   /*
   * Callback method invoked to update the app details form with latest data
   */
    PresentationController_Mobile.prototype.updateDetailsForm = function(data) {
        commonUtils.setCustomData("AppDetails", data);
        var response = {
            "data": data,
            "isError": false
        };
      if(data && data.length === 0){
        commonUtils.navigateTo("frmStore", true);
      }
      else{    
        currentScope.presentUserInterface("frmAppDetails", response);
      }
    };
	/*
   * Callback method invoked when fetching of app details fails
   */
    PresentationController_Mobile.prototype.fetchAppDetailsErrorCallback = function(error) {
      	refreshAppFlag = false;
        var response = {
            "data": error,
            "isError": true
        };
        currentScope.presentUserInterface("frmAppDetails", response);
    };
	/*
    * This method will start download process.
    */
    PresentationController_Mobile.prototype.startDownloadProcess = function(selectedRowItem) {
        voltmx.application.dismissLoadingScreen();
         voltmx.store.setItem("downloadInProgress", true);
        if (selectedRowItem !== null) {
            var identifier, filename, imgId = null;
            for (var i = 0; i < selectedRowItem.channel_attachments_info.length; i++) {
                if (selectedRowItem.channel_attachments_info[i].System_AttachmentType == config.attachment_type_of_binary) {
                    identifier = selectedRowItem.channel_attachments_info[i].System_DownloadLink;
                    break;
                }
            }
            filename = selectedRowItem.appName_full;
            if (config.platformName == "ipad" || config.platformName == "iphone") {
                for (i = 0; i < selectedRowItem.channel_attachments_info.length; i++) {
                    if (selectedRowItem.channel_attachments_info[i].System_AttachmentType === config.attachment_type_of_icon && imgId === null) {
                        imgId = selectedRowItem.channel_attachments_info[i].System_DownloadLink;
                        break;
                    }
                }
                this.businessController.downloadAppforIOS(identifier, imgId, filename, "IOS", this.downloadSuccessCallback,this.downloadErrorCallback);
            } 
            else if (config.platformName == "android" || config.platformName == "android_tablet") {
                this.businessController.downloadAppforAndroid(identifier,filename,this.downloadSuccessCallback,this.downloadErrorCallback);
            }
        } 
    };
   /*
   * Callback method for download success
   */
   PresentationController_Mobile.prototype.downloadSuccessCallback = function(res) {
        var curFormId = voltmx.application.getCurrentForm().id;
        var response = {
            "data": null,
            "isError": false,
            "isDownloadCallback" : true
        };
        currentScope.presentUserInterface(curFormId, response);
    };
   /*
   * Callback method for download failure.
   */
    PresentationController_Mobile.prototype.downloadErrorCallback = function(error) {
        var curFormId = voltmx.application.getCurrentForm().id;
        var response = {
            "data": error,
            "isError": false,
            "isDownloadErrorCallback" : true
        };
        currentScope.presentUserInterface(curFormId, response);
    };
   /*
   * This method is invoked to get app icons for all apps
   */    
    PresentationController_Mobile.prototype.getAppIconforAllApps = function(formId) {
        var metaData = commonUtils.getCustomData("AppsMetaData");
        var serverUrl = commonUtils.getServerUrl();
        var downloadServiceUrl = config.getBinaryServiceUrl;
        if (currentScope.appsCount <= currentScope.index || metaData.length === 0) {
            if(formId == "frmStore"){
              currentScope.updateStoreForm(metaData);
              return;
            } else if(formId == "frmAppDetails"){
              currentScope.updateDetailsForm(metaData);
              return;
            }
        }
        var index = currentScope.index;
        var imgId = null;
        currentScope.temp = {};
        currentScope.temp.appName = metaData[index].System_FabricAppName;
        currentScope.temp.appDescription = metaData[index].System_ChannelAppDescription;
      	var systemChannelId = metaData[index].System_ChannelId;
      	var appVersion = "Version " + metaData[index].System_AppVersion;
      
      	currentScope.temp.System_ChannelId = systemChannelId;
      	if(systemChannelId === config.responsive_web_channel_id || systemChannelId === config.native_web_channel_id){
          	currentScope.temp.btnLaunch = {"text":"OPEN","isVisible":true,"highlightOnParentFocus" :true,"highlightedSkin":"sknLaunch"};
          	currentScope.temp.btnDownload = {"text": "GET", "isVisible": false,"highlightOnParentFocus" :true,"highlightedSkin":"sknBtnGetNative"};
          	currentScope.temp.appVersion = {"text": appVersion,"isVisible": false};
          	currentScope.temp.platformTab = {"text":"WEB", isVisible: true};
        }else{
          	currentScope.temp.btnDownload = {"text":"GET","isVisible":true,"highlightOnParentFocus" :true,"highlightedSkin":"sknBtnGetNative"};
          	currentScope.temp.btnLaunch = {"text":"OPEN","isVisible":false,"highlightOnParentFocus" :true,"highlightedSkin":"sknLaunch"};
          	currentScope.temp.platformTab = {"text":"NATIVE", "isVisible": true};
          	currentScope.temp.appVersion = {"text": appVersion,"isVisible":true};
        }
      	
        currentScope.temp.imgDownloading = {"src":"download.gif","isVisible":false};
        currentScope.temp.appName_full = metaData[index].System_FabricAppName;
        currentScope.temp.longDescription = metaData[index].System_ChannelAppDescription;
        currentScope.temp.channel_name = metaData[index].System_ChannelName;
        currentScope.temp.fabric_app_id = metaData[index].System_FabricAppId;
        currentScope.temp.native_channels_info_id = metaData[index].System_NativeChannelsInfoId;
        currentScope.temp.channel_attachments_info = metaData[index].channelattachmentsinfo;
        currentScope.temp.appIcon = config.constants.defaultAppIcon;
        currentScope.temp.lblSeparator = " ";
        var attachments = metaData[index].channelattachmentsinfo;
        if (attachments !== undefined) {
          for (var j = 0; j < attachments.length; j++) {
            if (attachments[j].System_AttachmentType === config.attachment_type_of_icon) {
              imgId = attachments[j].System_DownloadLink;
              break;
            }
          }
        }
       
        if (imgId !== null) {
            var konyclient = voltmx.sdk.getCurrentInstance();
            var xhr = new voltmx.net.HttpRequest();
            //#ifdef iphone
            	xhr.backgroundTransfer = true;
            //#endif
            var imgUrl = serverUrl + downloadServiceUrl + "?file_id=" + imgId;
            xhr.open(constants.HTTP_METHOD_GET, imgUrl);
            xhr.setRequestHeader("X-Voltmx-Authorization", konyclient.currentClaimToken);
            xhr.onReadyStateChange = function() {
                if (xhr.readyState == 4) {
                    if ((xhr.status == 200) || (xhr.status === 0)) {
                      if(xhr.responseText !== null){
                        try{
                          var resp = JSON.parse(xhr.responseText);
                          if (resp.data !== undefined && resp.data !== null) {
                              currentScope.temp.appIcon = {
                                  "base64": resp.data
                              };
                          } else{
                            currentScope.temp.appIcon = config.constants.errorIcon;
                          } 
                        }catch(err){
                          currentScope.temp.appIcon = config.constants.errorIcon;
                        }
                      } else {
                            currentScope.temp.appIcon = config.constants.errorIcon;
                       }
                    } else {
                        voltmx.print("Failed to download app icon");
                        currentScope.temp.appIcon = config.constants.errorIcon;
                    }
                    metaData[index] = currentScope.temp;
                    currentScope.index = index + 1;
                    commonUtils.setCustomData("AppsMetaData", metaData);
                    currentScope.getAppIconforAllApps(formId);
                }
            };
           xhr.send();
        } else {
            metaData[index] = currentScope.temp;
            currentScope.index = index + 1;
            commonUtils.setCustomData("AppsMetaData", metaData);
            currentScope.getAppIconforAllApps(formId);
        }
    };
  

    return PresentationController_Mobile;
});