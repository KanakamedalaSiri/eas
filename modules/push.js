//Type your code here

var osType;
var messagingService;
var push_id = "";

function setPushCallbacks() {
	voltmx.push.setCallbacks({
		onsuccessfulregistration : pushRegisterSuccessCallback,
		onfailureregistration : pushRegisterFailureCallback,
		onlinenotification : onlinePushNotificationCallback,
		offlinenotification : offlinePushNotificationCallback,
		onsuccessfulderegistration : pushDeregisterSuccessCallback,
		onfailurederegistration : pushDeregisterFailureCallback
	});
}

function registerPush() {
  try{
    
    var prev_cred = voltmx.store.getItem("PREV_CRED");
    
	var configRegister;
    var setPreviousCreds = {};
    var platform = voltmx.os.deviceInfo().name;
     var clientConfig = voltmx.store.getItem("CLIENT_CONFIG");
    if(platform.toLowerCase() == "android" || platform.toLowerCase() == "android_tablet"){
          configRegister = {
            senderid : clientConfig.SENDERID
        };
        osType = "androidgcm";
    } else if(platform.toLowerCase() == "iphone" || platform.toLowerCase() == "ipad"){
        configRegister = [0, 1, 2];
		osType = platform.toLowerCase();
    }else{
        configRegister = {
           messagingSenderId : clientConfig.SENDERID,
           publicKey : clientConfig.PUBLICKEY
        };
        osType = "webfcm";
    }
	voltmx.print(JSON.stringify(configRegister));
	voltmx.push.register((configRegister));
    
  } catch(err){
    voltmx.print("Error in registering for push"+err);
  }
	
}

function pushRegisterSuccessCallback(identifier) {
 try{
       voltmx.print("push identifier :"+identifier);
       var deviceId = voltmx.os.deviceInfo().deviceid;
       var emailid = "";
   	   var authClient = null;
       var config = applicationManager.getConfigManager();
   if((voltmx.store.getItem("IDENTITY_PROV") !== "AppStoreUserRepository" && config.isLoginEnabled()))
      {
       
       authClient = voltmx.sdk.getCurrentInstance().getIdentityService(voltmx.store.getItem("IDENTITY_PROV"));
       authClient.getProfile(true,
    function(response) {
         emailid = response.email;
         if(emailid === null || emailid === undefined)
           emailid = "";
         var messagingService = null;
       var sdkObj = voltmx.sdk.getCurrentInstance();
       if(sdkObj !== null && sdkObj !== undefined){
         messagingService = sdkObj.getMessagingService();
       }
       if(messagingService !== null && messagingService !== undefined){
           messagingService.register(osType, deviceId, identifier, emailid, subscribeSuccessCallback, subscribeFailureCallback);
       }
         
    }, function(error) {
        voltmx.print("Failed to fetch profile : " + JSON.stringify(error));
    }
);
     return;
      }
       var id = voltmx.store.getItem("USER_CRED");
       if(id !== null && id !== undefined){
         emailid = id.username;
       }
       var messagingService = null;
       var sdkObj = voltmx.sdk.getCurrentInstance();
       if(sdkObj !== null && sdkObj !== undefined){
         messagingService = sdkObj.getMessagingService();
       }
       if(messagingService !== null && messagingService !== undefined){
           messagingService.register(osType, deviceId, identifier, emailid, subscribeSuccessCallback, subscribeFailureCallback);
       } else {
           voltmx.application.dismissLoadingScreen();
           alert("Messaging service object is null or undefined");
       voltmx.application.dismissLoadingScreen();
   } 
 } catch(err){
     voltmx.print("Error in registering push for mf app"+err);
     voltmx.application.dismissLoadingScreen();
 }
}

function subscribeSuccessCallback(response) {
	voltmx.application.dismissLoadingScreen();
	voltmx.print("push subscription successful " + response);
}

function subscribeFailureCallback(error) {
	voltmx.application.dismissLoadingScreen();
	voltmx.print("push subscription failed with error :" + JSON.stringify(error));
}

function pushRegisterFailureCallback(error) {
	voltmx.application.dismissLoadingScreen();
    voltmx.print("Push registration failed");
}

function onlinePushNotificationCallback(notification) {
   try{
     voltmx.print("online notification :"+JSON.stringify(notification));
       var alertContent;
       var title;
     
       var platform = voltmx.os.deviceInfo().name;
       
       if(platform.toLowerCase() == "android" || platform.toLowerCase() =="androidtab"){
          alertContent = notification["content"];
          title = notification["title"];
       } else if (platform.toLowerCase() == "iphone" || platform.toLowerCase() == "ipad"){
          alertContent = notification["alert"]["body"];
          title = notification["alert"]["title"];
       }else{
          alertContent = notification["notification"]["body"];
          title = notification["notification"]["title"];
       }
       var basicProperties = {
        message: alertContent,
        alertType: constants.ALERT_TYPE_INFO,
        alertTitle: title,
        yesLabel: "OK",
        noLabel: "",
        alertHandler: null
      };
     voltmx.ui.Alert(basicProperties, {});
   } catch(err){
     voltmx.print("Error in online receiving/showing notification"+err);
   }
   
}

function offlinePushNotificationCallback(notification) {
 	try{
 		voltmx.print("offline notification :"+JSON.stringify(notification));  
		var alertContent;
   		var title;
        if(FPConfig.PlatformName == "android" || FPConfig.PlatformName =="androidtab"){
            alertContent = notification["content"];
            title = notification["title"];
        } else if (FPConfig.PlatformName == "iphone" || FPConfig.PlatformName == "ipad"){
            alertContent = notification["alert"]["body"];
            title = notification["alert"]["title"];
        }
        var basicProperties = {
          message: alertContent,
          alertType: constants.ALERT_TYPE_INFO,
          alertTitle: title,
          yesLabel: "OK",
          noLabel: "",
          alertHandler: null
        };
  		voltmx.ui.Alert(basicProperties, {});
   	} catch(err){
     voltmx.print("Error in offline receiving/showing notification"+err);
   }   
}

function pushDeregisterSuccessCallback() {
	voltmx.print("Deregistered successfully");
}

function pushDeregisterFailureCallback(errormsg) {
	voltmx.print("Deregisteration failed with error " + errormsg);
}

function deregisterDevice() {
	unSubscribeKMS();
	voltmx.push.deRegister({});
}

function unSubscribeKMS() {
  voltmx.print("unSubscribed from KMS");
}