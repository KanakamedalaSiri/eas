define([], function() {
    /*
     * ConfigManager class handles all the configuration properties and constants
     */
    function configManager() {

        this.constants = {
            defaultAppIcon: "defaultappicon.png",
            errorIcon: "error_icon.png",
            storeName : "Store",
            logo_on_login_form : "logo.png",
            header_label_on_login_form : "Enterprise App Store",
            header_label_on_other_forms : "ENTERPRISE APP STORE"
        };
        
        this.popupBlockedMsg = "Please wait while we load your App Store. For the best App Store Experience, ensure popups are enabled in your browser.";
        this.networkErrorMsg = "We are facing some connectivity issues at the moment. Please check your internet connection and try again.";
        this.refreshSessionMsg = "Session timed out, refreshing your content";
        this.userInputFieldErrorMsg = "Username and Password are mandatory. Please provide both to proceed.";
        this.serverErrorMsg = "We are facing some issues in fetching your content right now, please try after some time.";
        this.imgDownloadFailureErrorMsg = "Could not retrieve screenshots, please try after some time";
        this.loaderText = "";
        this.invalidParamsErroMsg = "Invalid initialization parameters passed. Please check appKey, appSecret and ServiceUrl parameters";
        this.unableToFetchErrorMsg = "We are unable to connect to your App Store at the moment. Please refresh after some time.";
        this.unableToDownloadErrorMsg = "The download for <appname> was interrupted. Please try again after some time.";
      	this.identityErrorMsgNative = "Your Store authentication is not setup properly. Please contact your System Administrator. \n \n The application will exit now. Please retry when the issue has been resolved.";
      	this.identityErrorMsgResponsive = "Your Store authentication is not setup properly. Please contact your System Administrator. \n \n Please try again after some time.";
      	this.identityErrorDismissMsg = "OK, Exit App";
        
        this.identityProviderBasic = "basic";
        this.identityProviderAuth = "oauth2";
        this.identityProviderSAML = "saml";
        this.storeLoginKey = "KONY_APPSTORE_LOGIN";
      	this.helperDuration = 5;
        
        this.platformName = "";
        this.channel_id = "";
      	this.responsive_web_channel_id = "9";
      	this.native_web_channel_id = "";
      
        this.attachment_type_of_icon = "icon";
        this.attachment_type_of_screenshots = "screen";
        this.attachment_type_of_binary = "bin";
      
        this.nativeAppInfoDataModelName = "nativeappchannelsinfo";
        this.channelAttachmentInfoDataModelName = "channelattachmentsinfo";
        this.downloadObjectServiceName ="EASDownloadBinaryService";
        this.downloadServiceDataModelName ="File";
        this.getBinaryServiceUrl = "/services/data/v1/EASDownloadBinaryService/binary/File/getBinary";
		this.forgot_password_url = "";
      	this.mobileBreakpoint = 480;
      	this.tabletBreakpoint = 771;
      	this.desktopBreakpoint = 1366;
      	this.isTwoColumnView = false;
    }

    inheritsFrom(configManager, voltmx.mvc.Business.Delegator);

    configManager.prototype.initializeBusinessController = function() {};
	   /*
     * This method will set the platform ID based on the platform
     */
    configManager.prototype.setPlatformID = function(){
      
       if(voltmx.os.deviceInfo().name != "thinclient"){
           //#ifdef android
           this.platformName = "android";
           this.channel_id = "3";
           this.native_web_channel_id = "7";
           //#endif
           //#ifdef iphone
           this.platformName = "iphone";
           this.channel_id = "1";
           this.native_web_channel_id = "7";
           //#endif
           //#ifdef ipad
           this.platformName = "ipad";
           this.channel_id = "2";
           this.native_web_channel_id = "8";
           //#endif
           //#ifdef tabrcandroid
           this.platformName = "android_tablet";
           this.channel_id = "4";
           this.native_web_channel_id = "8";
           //#endif
       } else {
           var userAgent = voltmx.os.deviceInfo().userAgent;
           if(/(?=.*\bAndroid\b)(?=.*\b(m|M)obile\b).*/.test(userAgent)){
              this.platformName = "android";
              this.channel_id = "3";
              this.native_web_channel_id = "7";
           } else if(/(?=.*\biPhone\b).*/.test(userAgent)){
              this.platformName = "iphone";
              this.channel_id = "1";
              this.native_web_channel_id = "7";
           } else if(/(?=.*\biPad\b).*/.test(userAgent)){
              this.platformName = "ipad";
              this.channel_id = "2";
              this.native_web_channel_id = "8";
           } else if(/(?=.*\bAndroid\b)(?!.*\b(m|M)obile\b).*/.test(userAgent)){
              this.platformName = "android_tablet";
              this.channel_id = "4";
              this.native_web_channel_id = "8";
           }
           else{
             this.native_web_channel_id = "8";
              this.platformName = "desktop";
           }
       }
       
    };
   
    configManager.prototype.getAppProperties = function(callback){
      if(voltmx.os.deviceInfo().name != "thinclient"){
         var appProp = {
            "appKey" : appConfig.appKey,
            "appSecret" : appConfig.appSecret,
            "serviceUrl" :appConfig.serviceUrl 
          };
          applicationManager.setItem("APP_CONFIG", appProp);
          callback();
      } else{
          var http = new XMLHttpRequest();
          var path = window.location.href;
          var relPath = path.split("#")[0];
          http.open('get', relPath+"nocache/desktopweb/app.properties");
          http.onreadystatechange = function() {
            var resp;
            if (http.readyState == 4) {
              resp = JSON.parse(http.responseText);
              applicationManager.setItem("APP_CONFIG", resp);
              callback();
            }
          };
          http.send();
      }
      
    };
   	/*
    *	This method will get Current config properties
    */
    configManager.prototype.getClientConfigProperties = function(successCallback, errorCallback) {
        var client = voltmx.sdk.getCurrentInstance();
        var serverConfig = client.getConfigurationService();
        serverConfig.getAllClientAppProperties(function(response) {
                applicationManager.setItem("CLIENT_CONFIG", response);
                successCallback(response);
            },
            function(error) {
                errorCallback(error);
            });
    };
  	/*
    *	This method performs sdk init to connect to Fabric Server
    */
   configManager.prototype.init = function(successCallback ,errorCallback){
        var appProp = applicationManager.getItem("APP_CONFIG");
        var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        if(!CommonUtilsManager.isNetworkAvailable()){
           var message = applicationManager.getConfigManager().networkErrorMsg;
           errorCallback(message);
           return;
        }  
        var konyClient = new voltmx.sdk();
        konyClient.init(appProp.appKey, appProp.appSecret, appProp.serviceUrl, successCallback, errorCallback);
   };
  /*
  * This method will read identity service details from service doc recieved from Server.
  */
   configManager.prototype.readIdentityServiceDetailsFromServiceDoc = function(){
     try{
       var configManager = applicationManager.getConfigManager();
       var appProp = applicationManager.getItem("APP_CONFIG");
       applicationManager.removeItem("IDENTITY_PROV");
       applicationManager.removeItem("IDENTITY_TYPE");
       if (appProp !== undefined) {
         var svcDoc = appProp.svcDoc;
         if (svcDoc !== undefined && svcDoc.login !== undefined && svcDoc.login !== null) {
           applicationManager.setItem("IDENTITY_PROV", svcDoc.login[0]["prov"]);
           applicationManager.setItem("IDENTITY_TYPE", svcDoc.login[0]["type"]);
           if (svcDoc.login[0]["forgot_pswd_submit_userid"])
             configManager.forgot_password_url = svcDoc.login[0]["forgot_pswd_submit_userid"];
           
           if(applicationManager.getItem("PREV_PROVIDER") !== svcDoc.login[0]["prov"]){
              applicationManager.removeItem("USER_CRED");
           }
         }
         config = applicationManager.getConfigManager();
         if (!config.isLoginEnabled() || svcDoc === undefined || svcDoc.login === undefined || (svcDoc.login === null) || svcDoc.login[0] === undefined || svcDoc.login[0] === null || svcDoc.login[0]["prov"] === undefined || svcDoc.login[0]["prov"] === null){
          registerPush();
         }
       }
     }catch(err){
       voltmx.print("CATCH : error in reading login details "+err);
     }
   };
  
   configManager.prototype.isLoginEnabled = function(){
      var clientProp = applicationManager.getItem("CLIENT_CONFIG");
      // providing support for voltmx prefix for AppStore Login
      let voltmxStoreLoginKey = "VOLTMX_APPSTORE_LOGIN";
      if (clientProp !== null && clientProp[voltmxStoreLoginKey] !== undefined) {
        this.storeLoginKey = voltmxStoreLoginKey;
      }
      if (clientProp !== null && clientProp[this.storeLoginKey] !== undefined) {
        if (clientProp[this.storeLoginKey] === "true" || clientProp[this.storeLoginKey] === "TRUE" || clientProp[this.storeLoginKey] === true) {
          return true;
        } else if (clientProp[this.storeLoginKey] === "false" || clientProp[this.storeLoginKey] === false || clientProp[this.storeLoginKey] === null) {
         applicationManager.removeItem("USER_CRED");
          return false;
        }
      } else {
        return false;
      }
    };
   /*
   *	This method will remove User credentials whenever login provider has changed
   */
   configManager.prototype.removeUserCredentialsonLoginProviderChange = function(){
     try{
       var configManager = applicationManager.getConfigManager();
       var appProp = applicationManager.getItem("APP_CONFIG");
       var prov = applicationManager.getItem("IDENTITY_PROV");
       var svcDoc = appProp.svcDoc;
       if(svcDoc.login[0]["prov"] !== prov){
         applicationManager.removeItem("USER_CRED");
       }
     } catch(err){
        voltmx.print("Error in removing user credentials : "+err);
     }
   };

    return configManager;

});