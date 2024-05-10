define({
  /**
    * This method gets invoked during form initialization.
    * This method does widget data mapping.
    */
  init: function() {
    var config = applicationManager.getConfigManager();
    var widgetDataMap;
    if(config.platformName === "android" || config.platformName === "iphone"){
      config.isTwoColumnView=false;
      widgetDataMap = {
        "lblAppName": "appName",
        "lblAppDescription": "appDescription",
        "lblVersion": "appVersion",
        "imgAppIcon": "appIcon",
        "btnDownload": "download",
        "lblSeparator": "lblSeparator",
        "flxApps": "flxApps",
        "flxOuter": "flxOuter",
        "lblPlatformTab": "platformTab",
        "btnLaunch": "btnLaunch"
      };
      this.view.segAppsList.rowTemplate="flxAppsListMobileTemplate";
    }
    else{
      config.isTwoColumnView=true;
      widgetDataMap = {
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
      this.view.segAppsList.rowTemplate="flxAppsListTemplate";
    }
    this.view.segAppsList.widgetDataMap = widgetDataMap;
  },
  /**
    * Store form Post show event.
    * This method invokes presentation to fetch apps list from server.
    */
  postshow: function() {
    try{
      voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
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
    this.showLogout();
    this.view.flxLoader.isVisible = false;
    applicationManager.getConfigManager().loaderText = "";
    voltmx.application.dismissLoadingScreen();
    if (formdata !== undefined && !formdata.isError) {
      voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
      this.setSegmentData(formdata.data);
    } else if (formdata !== undefined && formdata.isError) {
      this.errorCallback(formdata.data);
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
    var config = applicationManager.getConfigManager();
    try{
      if(config.isTwoColumnView){
        if (data && data.length > 0) {
          var splittedData = this.splitData(data);
          this.view.segAppsList.data = this.generateSegmentData(splittedData);
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
      }
      else{
        if (data && data.length > 0) {
          data[0].flxAppsListTemplate = {
            "height": "21.2%"
          };
          data[0].flxOuter = {
            "top": "10%",
            "height": "90%"
          };

          this.view.segAppsList.setData(data);
          this.view.segAppsList.isVisible = true;
          voltmx.application.dismissLoadingScreen();
        } else {
          this.view.segAppsList.isVisible = false;
          this.view.lblNoApps.isVisible = true;
          voltmx.application.dismissLoadingScreen();
        }
      }
      this.view.forceLayout();
      voltmx.application.dismissLoadingScreen();
    }catch(err){
      voltmx.application.dismissLoadingScreen();
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
  /**
     * This method gets invoked on clicking "GET" in App details form.
     * This method invokes presentation methods to download the binaries.
     */
  onClickOfGetBtn: function(context) {
    var config = applicationManager.getConfigManager();
    var selectedItem;
    try{
      voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
      if(config.isTwoColumnView)
        selectedItem = context[0].widgetInfo.selectedRowItems[0];
      else
        selectedItem = context.widgetInfo.selectedRowItems[0];
      if (selectedItem !== null && selectedItem !== undefined) {
        if(config.isTwoColumnView)
          this.presenter.startDownloadProcess(selectedItem,context[1]);
        else
          this.presenter.startDownloadProcess(selectedItem,null);
      }
    }catch(err){
      voltmx.application.dismissLoadingScreen();
      voltmx.print("CATCH : on click of get button "+err);
    }
  },
  /**
    * On row click event
    * This method is used to navigate to app details form
    */
  onRowClickOfSegAppsListMobile: function(context) {
    try{
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

  /*  *
    * On row click event
    * This method is used to navigate to app details form for tablet and desktop
    */
  onRowClickOfSegAppsList: function(selectedSide,context) {
    try{
      scope = this;
      var selectedItem = this.view.segAppsList.selectedRowItems[0][selectedSide];
      var config = applicationManager.getConfigManager();
      if (selectedItem !== null && selectedItem !== undefined) {
        applicationManager.setItem("SELECTED_APP_DETAILS",selectedItem);
        this.presenter.navigateToAppDetailsForm(false);
      }
    }catch(err){
      this.view.flxLoader.isVisible = false;
      refreshAppFlag = false;
      voltmx.print("CATCH : on Row click of segment "+err);
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
      downloadStatus[rightData[rightindex].fabric_app_id] = itemLocation;
    }
    if(leftindex !=  rightindex){
      mergedData[leftindex]['flxOuterRight'] = {isVisible:false};
    }
    return mergedData;
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
          this.view.segAppsList.removeAll();
          this.view.forceLayout();
        }
        voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        var authModule = applicationManager.getAuthModule();
        authModule.presentationController.logout();
      }
    } catch (err) {
      voltmx.application.dismissLoadingScreen();
      voltmx.print("CATCH : Error in invoking logout " + err);
    }
  },
  /**
    * This method gets invoked when user clicks on open button
    * This method launches the web app in device browser.
    */
  onClickOfWebAppLaunch: function(context){
    try{
      var commonUtils = applicationManager.getCommonUtilsManager();
      var config = applicationManager.getConfigManager();
      var serverUrl = commonUtils.getServerUrl();
      var filename,selectedItem,i;
      voltmx.application.dismissLoadingScreen();
      if(config.isTwoColumnView)
        selectedItem = context[0].widgetInfo.selectedRowItems[0];
      else
        selectedItem = context.widgetInfo.selectedRowItems[0];
      if (selectedItem !== null && selectedItem !== undefined) {
        //for Mobiles
        if(!config.isTwoColumnView){
          for (i = 0; i < selectedItem.channel_attachments_info.length; i++) {
            if (selectedItem.channel_attachments_info[i].System_AttachmentType == config.attachment_type_of_binary) {

              filename = selectedItem.channel_attachments_info[i].System_AttachmentName;
              break;
            }
          }
        }
        else{
          //onClick of Left side of segment of Tablets and Desktop
          if(context[1]==="Left"){
            for(i = 0; i < selectedItem.channel_attachments_infoLeft.length; i++) {
              if (selectedItem.channel_attachments_infoLeft[i].System_AttachmentType == config.attachment_type_of_binary) {
                filename = selectedItem.channel_attachments_infoLeft[i].System_AttachmentName;
                break;
              }
            }
          }
          //onClick of Right side of segment of Tablets and Desktop 
          if(context[1]==="Right"){
            for(i = 0; i < selectedItem.channel_attachments_infoRight.length; i++) {
              if (selectedItem.channel_attachments_infoRight[i].System_AttachmentType == config.attachment_type_of_binary) {
                filename = selectedItem.channel_attachments_infoRight[i].System_AttachmentName;
                break;
              }
            }
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
    }catch(err){
      voltmx.application.dismissLoadingScreen();
      alert("CATCH : on click of WebAppLaunch button "+err);
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
  }
});