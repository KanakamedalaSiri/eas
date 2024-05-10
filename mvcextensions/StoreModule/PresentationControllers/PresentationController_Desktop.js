define([], function() {
  var currentScope = null, commonUtils, config;
  /**
     * User defined presentation controller
     * @constructor
     * @extends voltmx.mvc.Presentation.BasePresenter
     */
  function PresentationController() {
    voltmx.mvc.Presentation.BasePresenter.call(this);
    currentScope = this;
    commonUtils = applicationManager.getCommonUtilsManager();
    config = applicationManager.getConfigManager();
    this.appsCount = 0;
    this.index = 0;
  }
  inheritsFrom(PresentationController, voltmx.mvc.Presentation.BasePresenter);
  PresentationController.prototype.initializePresentationController = function() {
  };
  /**
    * This method will navigate to store form
    **/
  PresentationController.prototype.navigateToStoreForm = function(data) {
    commonUtils.navigateTo("frmStore", data);
  };
  /*
    * This method will navigate to appDetails form
    */
  PresentationController.prototype.navigateToAppDetailsForm = function(data) {
    commonUtils.navigateTo("frmAppDetails", data);
  };
  /*
    * This method will query and fetch Apps list from server
    */
  PresentationController.prototype.fetchAppsList = function() {
    var config = applicationManager.getConfigManager();
    voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if(config.platformName === "desktop"){
      var queryParams = ["System_ChannelId", "eq", config.responsive_web_channel_id, 
                         "or",
                         "System_ChannelId", "eq", config.native_web_channel_id];
    }
    else{
      var queryParams = ["System_ChannelId", "eq", config.channel_id,
                         "or",
                         "System_ChannelId", "eq", config.responsive_web_channel_id,
                         "or",
                         "System_ChannelId", "eq", config.native_web_channel_id];
    }
    var query = queryParams.join(" ");
    var criteria = voltmx.mvc.Expression.eq("$filter", query);
    this.businessController.fetchAppsList(criteria, this.fetchAppsListSuccessCallback, this.fetchAppsListErrorCallback);
  };
  /*
    * Callback method when apps list is fetched succesfully
    */
  PresentationController.prototype.fetchAppsListSuccessCallback = function(data) {
    currentScope.index = 0;
    data = data.filter(function (arr) {
      return !((arr.System_ChannelId === applicationManager.getConfigManager().responsive_web_channel_id) &&
               arr.System_FabricAppName === applicationManager.getConfigManager().constants.storeName);
    });
    commonUtils.setCustomData("AppsMetaData", data);
    currentScope.appsCount = data.length;
    currentScope.getAppIconforAllApps("frmStore");
  };
  /*
    * This method will update the store form with newly fetched apps list.
    */
  PresentationController.prototype.updateStoreForm = function(data) {
    var response = {
      "data": data,
      "isError": false
    };
    currentScope.presentUserInterface("frmStore", response);
  };
  /*
    * Callback method when fetching apps list fails
    */
  PresentationController.prototype.fetchAppsListErrorCallback = function(error) {
    var response = {
      "data": error,
      "isError": true
    };
    currentScope.presentUserInterface("frmStore", response);
  };
  /*
    * This method will fetch latest app details.
    */
  PresentationController.prototype.fetchAppDetails = function() {
    voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var info = applicationManager.getItem("SELECTED_APP_DETAILS");
    var criteria = voltmx.mvc.Expression.eq("$filter", "System_ChannelId eq " + info.System_ChannelId + " and  System_FabricAppId  eq " + info.fabric_app_id);
    this.businessController.fetchAppsList(criteria, this.fetchAppDetailsSuccessCallback, this.fetchAppDetailsErrorCallback);
  };
  /*
   * Callback method invoked when app apps list are fetched successfully
   */
  PresentationController.prototype.fetchAppDetailsSuccessCallback = function(data) {
    currentScope.index = 0;
    data = data.filter(function (arr) {
      return !((arr.System_ChannelId === applicationManager.getConfigManager().responsive_web_channel_id) &&
               arr.System_FabricAppName === applicationManager.getConfigManager().constants.storeName);
    });
    commonUtils.setCustomData("AppsMetaData", data);
    if(data){
      currentScope.appsCount = data.length;
    }
    currentScope.getAppIconforAllApps("frmAppDetails");
  };
  /*
   * Callback method invoked when app apps list are fetched successfully
   */
  PresentationController.prototype.updateDetailsForm = function(data) {
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
   * Callback method to handle failure of fetching apps list
   */
  PresentationController.prototype.fetchAppDetailsErrorCallback = function(error) {
    var response = {
      "data": error,
      "isError": true
    };
    currentScope.presentUserInterface("frmAppDetails", response);
  };
  /*
   * This method will start download process.
   */
  PresentationController.prototype.startDownloadProcess = function(selectedRowItem,selectedSide) {
    if (selectedRowItem !== null) {
      var identifier, filename, imgId = null,i;
      if(selectedSide === "Left"){
        for (i = 0; i < selectedRowItem.channel_attachments_infoLeft.length; i++) {
          if (selectedRowItem.channel_attachments_infoLeft[i].System_AttachmentType == config.attachment_type_of_binary) {
            identifier = selectedRowItem.channel_attachments_infoLeft[i].System_DownloadLink;
            filename = selectedRowItem.appName_fullLeft;
            break;
          }
        }
      }          
      else if(selectedSide === "Right"){
        for (i = 0; i < selectedRowItem.channel_attachments_infoRight.length; i++) {
          if (selectedRowItem.channel_attachments_infoRight[i].System_AttachmentType == config.attachment_type_of_binary) {
            identifier = selectedRowItem.channel_attachments_infoRight[i].System_DownloadLink;
            filename = selectedRowItem.appName_fullRight;
            break;
          }
        }
      }         
      else{
        for (i = 0; i < selectedRowItem.channel_attachments_info.length; i++) {
          if (selectedRowItem.channel_attachments_info[i].System_AttachmentType == config.attachment_type_of_binary) {
            identifier = selectedRowItem.channel_attachments_info[i].System_DownloadLink;
            filename = selectedRowItem.appName_full;
            break;
          }
        }
      }
      if (config.platformName === "ipad" || config.platformName === "iphone") {
        if(selectedSide === "Left"){              
          for (i = 0; i < selectedRowItem.channel_attachments_infoLeft.length; i++) {
            if (selectedRowItem.channel_attachments_infoLeft[i].System_AttachmentType === config.attachment_type_of_icon && imgId === null) {
              imgId = selectedRowItem.channel_attachments_infoLeft[i].System_DownloadLink;
              break;
            }
          }
        }
        else if(selectedSide === "Right"){
          for (i = 0; i < selectedRowItem.channel_attachments_infoRight.length; i++) {
            if (selectedRowItem.channel_attachments_infoRight[i].System_AttachmentType === config.attachment_type_of_icon && imgId === null) {
              imgId = selectedRowItem.channel_attachments_infoRight[i].System_DownloadLink;
              break;
            }
          }
        }
        else{
          for (i = 0; i < selectedRowItem.channel_attachments_info.length; i++) {
            if (selectedRowItem.channel_attachments_info[i].System_AttachmentType === config.attachment_type_of_icon && imgId === null) {
              imgId = selectedRowItem.channel_attachments_info[i].System_DownloadLink;
              break;
            }
          }
        }
        this.businessController.downloadApp(identifier, imgId, filename, "IOS", this.downloadErrorCallback);
      } else if (config.platformName === "android" || config.platformName === "android_tablet") {
        this.businessController.downloadApp(identifier, imgId, filename, "ANDROID" ,this.downloadErrorCallback);
        //                 this.businessController.downloadAppforAndroid(identifier,filename,this.downloadErrorCallback);
      }
    } else {
      voltmx.application.dismissLoadingScreen();
    }
  };
  /*
   * This method is invoked when download fails.
   */
  PresentationController.prototype.downloadErrorCallback = function(error) {
    var curFormId = voltmx.application.getCurrentForm().id;
    var response = {
      "data": error,
      "isError": true
    };
    currentScope.presentUserInterface(curFormId, response);
  };
  /*
   * This method is invoked to get app icons for all apps
   */
  PresentationController.prototype.getAppIconforAllApps = function(formId) {
    var metaData = commonUtils.getCustomData("AppsMetaData");
    var serverUrl = commonUtils.getServerUrl();
    var downloadServiceUrl = config.getBinaryServiceUrl;
    if (currentScope.appsCount <= currentScope.index || metaData.length === 0) {
      if(formId === "frmStore"){
        currentScope.updateStoreForm(metaData);
        return;
      } else if(formId === "frmAppDetails"){
        currentScope.updateDetailsForm(metaData);
        return;
      }
    }
    var index = currentScope.index;
    currentScope.temp = {};
    if (config.platformName === "android" || config.platformName === "iphone") {
      if (metaData[index].System_FabricAppName.length > 20) {
        currentScope.temp.appName = metaData[index].System_FabricAppName.substring(0, 17) + "...";
      } else {
        currentScope.temp.appName = metaData[index].System_FabricAppName;
      }
      if (metaData[index].System_ChannelAppDescription.length > 40) {
        currentScope.temp.appDescription = metaData[index].System_ChannelAppDescription.substring(0, 40) + "...";
      } else {
        currentScope.temp.appDescription = metaData[index].System_ChannelAppDescription;
      }
    } else if (config.platformName === "android_tablet" || config.platformName === "ipad") {
      if (metaData[index].System_FabricAppName.length > 20) {
        currentScope.temp.appName = metaData[index].System_FabricAppName.substring(0, 17) + "...";
      } else {
        currentScope.temp.appName = metaData[index].System_FabricAppName;
      }
      if (metaData[index].System_ChannelAppDescription.length > 30) {
        currentScope.temp.appDescription = metaData[index].System_ChannelAppDescription.substring(0, 27) + "...";
      } else {
        currentScope.temp.appDescription = metaData[index].System_ChannelAppDescription;
      }
    }else{
      currentScope.temp.appName = metaData[index].System_FabricAppName;
      currentScope.temp.appDescription = metaData[index].System_ChannelAppDescription;
      if (metaData[index].System_FabricAppName.length > 30) 
        currentScope.temp.appName = metaData[index].System_FabricAppName.substring(0, 27) + "...";    
      if (metaData[index].System_ChannelAppDescription.length > 50) 
        currentScope.temp.appDescription = metaData[index].System_ChannelAppDescription.substring(0, 47) + "...";

    }

    var systemChannelId = metaData[index].System_ChannelId;
    var appVersion = "Version " + metaData[index].System_AppVersion;
    currentScope.temp.System_ChannelId = systemChannelId;
    if(systemChannelId === config.responsive_web_channel_id || systemChannelId === config.native_web_channel_id){
      currentScope.temp.btnLaunch = {"text":"OPEN","isVisible":true};
      currentScope.temp.btnDownload = {"text": "GET", "isVisible": false};
      currentScope.temp.appVersion = {"text": appVersion, "isVisible":false};
      if(config.platformName === "desktop"){
        currentScope.temp.platformTab = {"text":"WEB", "isVisible": false};
        currentScope.temp.appName = {"text" : currentScope.temp.appName, "top" :"21%"};
        currentScope.temp.appDescription = {"text" : currentScope.temp.appDescription, "top" : "58%"};        
      }   
      else{
        currentScope.temp.platformTab = {"text":"WEB", "isVisible": true};
      }   
    }else{
      currentScope.temp.btnDownload = {"text":"GET","isVisible":true};
      currentScope.temp.btnLaunch = {"text":"LAUNCH","isVisible":false};
      currentScope.temp.platformTab = {"text":"NATIVE", "isVisible": true , "left":"1dp"};
      currentScope.temp.appVersion = {"text": appVersion, "isVisible": true};
    }

    currentScope.temp.appName_full = metaData[index].System_FabricAppName;
    currentScope.temp.longDescription = metaData[index].System_ChannelAppDescription;
    currentScope.temp.channel_name = metaData[index].System_ChannelName;
    currentScope.temp.fabric_app_id = metaData[index].System_FabricAppId;
    currentScope.temp.native_channels_info_id = metaData[index].System_NativeChannelsInfoId;
    currentScope.temp.channel_attachments_info = metaData[index].channelattachmentsinfo;
    currentScope.temp.appIcon = config.constants.defaultAppIcon;
    currentScope.temp.download = "GET";
    currentScope.temp.lblSeparator = " ";
    var attachments = metaData[index].channelattachmentsinfo;
    var imgId = null;
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
      var xhr = new XMLHttpRequest();
      var imgUrl = serverUrl + downloadServiceUrl + "?file_id=" + imgId;
      xhr.open("GET", imgUrl);
      xhr.setRequestHeader("X-Voltmx-Authorization", konyclient.currentClaimToken);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if ((xhr.status === 200) || (xhr.status === 0)) {
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
    } else {
      metaData[index] = currentScope.temp;
      currentScope.index = index + 1;
      commonUtils.setCustomData("AppsMetaData", metaData);
      currentScope.getAppIconforAllApps(formId);
    }

  };
     /*
   *		This method  prompts network error in the current form
   */
  PresentationController.prototype.showNetworkError = function(error){

    var data = {
      "isError": true,
      "data": error
    };

    currentScope.presentUserInterface(voltmx.application.getCurrentForm().id, data);
  };

  return PresentationController;
});