define([], function() {

    var currentScope;
	 /*
    *	@constructor method for BusinessController.
    */
    function BusinessController() {
        voltmx.mvc.Business.Delegator.call(this);
        currentScope = this;
        this.appsCount = 0;
        this.index = 0;
    }

    inheritsFrom(BusinessController, voltmx.mvc.Business.Delegator);

    BusinessController.prototype.initializeBusinessController = function() {

    };

    BusinessController.prototype.execute = function(command) {
        voltmx.mvc.Business.Controller.prototype.execute.call(this, command);
    };
  	/*
    *	This method fetches the apps list from the server
    */
    BusinessController.prototype.fetchAppsList = function(criteria, successCallback, errorCallback) {
        currentScope.fetchAppsListSuccessCallback = successCallback;
        currentScope.fetchAppsListErrorCallback = errorCallback;
        currentScope.index = 0;
        var config = applicationManager.getConfigManager();
        var appsListModel = voltmx.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition(config.nativeAppInfoDataModelName);
        appsListModel.addAttribute(config.channelAttachmentInfoDataModelName);
      	voltmx.mvc.MDAApplication.getSharedInstance().appContext.httpRequestOptions = {"enableBackgroundTransfer": true};
        appsListModel.getByCriteria(criteria, currentScope.fetchAppsListCallback);
    };
   /*
    *	Callback method which invokes failure/success callback based on server response
    */
    BusinessController.prototype.fetchAppsListCallback = function(status, data,error){
       if (status === voltmx.mvc.constants.STATUS_SUCCESS) {
          currentScope.fetchAppsListSuccessCallback(data);
       } else {
         currentScope.fetchAppsListErrorCallback(error);
       }
    };
   /*
    *	This method is used to download binary in android web app.
    */
    BusinessController.prototype.downloadApp = function(identifier, imgId, filename, type, errorcallback) {
        var config = applicationManager.getConfigManager();
        var commonUtils = applicationManager.getCommonUtilsManager();
        var serverUrl = commonUtils.getServerUrl();
        var downloadUrl;
        var konyclient = voltmx.sdk.getCurrentInstance();
        var xhr = new XMLHttpRequest();
        downloadUrl = serverUrl + config.getBinaryServiceUrl + "?file_id=" + identifier + "&type="+ type + "&ipa_file_name=" + filename;
        if(imgId !== null){
          downloadUrl = downloadUrl+"&icon_id=" + imgId;
        }
        xhr.open("GET", downloadUrl);
        xhr.setRequestHeader("X-Voltmx-Authorization", konyclient.currentClaimToken);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("X-Voltmx-Server-Url", serverUrl + "/services");
        xhr.send();
        xhr.onreadystatechange = function() {
         try{
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status === 0) {
                    var resp = xhr.response;
                    if (resp !== undefined && resp !== null) {
                        resp = JSON.parse(xhr.response);
                        if(typeof resp == "object" && resp.link){
                          window.open(resp.link,"_self");
                          voltmx.application.dismissLoadingScreen();
                        } else{
                          errorcallback(JSON.parse(xhr.response));
                        }
                    }
                } else{
                  if(xhr.response !== null){
                     errorcallback(JSON.parse(xhr.response));
                  }
                }
            }
         }catch(err){
           errorcallback(xhr.response);
         }
        };
          
    };
   /*
    *	This method is used to download binary in android native app.
    */
    BusinessController.prototype.downloadAppforAndroid = function(identifier,filename,successCallback,errorCallback){
      var config = applicationManager.getConfigManager();
      var objSvc = voltmx.sdk.getCurrentInstance().getObjectService(config.downloadObjectServiceName,{"access" : "online"});
      var fileStorage = objSvc.getFileStorage();
      var commonUtils = applicationManager.getCommonUtilsManager();
      var serverUrl = commonUtils.getServerUrl();
      var  headers = {
          "Content-Type" : "application/json"
      };
      var metadata ={
        "file_id" : identifier
      };
      var downloadParams = {
        "headers" :headers,
        "metadata" :metadata
      };
     fileStorage.download(downloadParams,
                       function(res){
       						var json = JSON.parse(JSON.stringify(res));
  							var filePath = json.filePath;
                            if(voltmx.store.getItem("downloadInProgress"))
                              currentScope.showInstallPrompt(filePath,successCallback);
                            voltmx.application.dismissLoadingScreen();
     					}, 
                       function(err){
        					voltmx.print("Download Error " + JSON.stringify(err));
                            errorCallback(err);
                       },
                       {disableIntegrityCheck:true,"forceDownload" : true});
    };
    /*
     *	This method will show install prompt in android native on successfull download of apk file.
    */
    BusinessController.prototype.showInstallPrompt = function(filePath,successCallback){
      var KonyMain = java.import("com.konylabs.android.KonyMain");
      var Intent = java.import("android.content.Intent");
      var Uri= java.import("android.net.Uri");
      var file = java.import("java.io.File");
      var build = java.import("android.os.Build");
      var environment = java.import("android.os.Environment");
      var fileProvider = java.import("androidx.core.content.FileProvider");
      
      var context = KonyMain.getAppContext();
      var installIntent = new Intent(Intent.ACTION_VIEW);
      var fileLocation= filePath;
      
      /* Copying the binary from application data directory to .eas directory 
         as we dont have direct access to application data directory in devices having OS version less than 24
      */
      if(build.VERSION.SDK_INT < 24){
        var mainLoc = environment.getExternalStorageDirectory().getAbsolutePath();
        var dirLoc = mainLoc + constants.FILE_PATH_SEPARATOR + ".eas";
        if(!(new voltmx.io.File(dirLoc).exists()))
          var deleteFile = new voltmx.io.File(dirLoc).remove();
        var myDir = new voltmx.io.File(dirLoc).createDirectory();  
        var copyPath = new voltmx.io.File(filePath).copyTo(dirLoc);
        var filename = filePath.split("/");
        fileLocation = dirLoc+constants.FILE_PATH_SEPARATOR+filename[filename.length -1];

      }
      var newfile = new file(fileLocation);
      var fileUri = Uri.fromFile(newfile);

      if(build.VERSION.SDK_INT >=24){
           fileUri = fileProvider.getUriForFile(context, context.getPackageName(),newfile);
      }
      installIntent.putExtra(Intent.EXTRA_NOT_UNKNOWN_SOURCE, true);
      installIntent.setDataAndType(fileUri, "application/vnd.android.package-archive");
      installIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
	  installIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      context.startActivity(installIntent);
      successCallback(null);
    };
    /*
     *	This method will fetch plist url for iOS.
    */
    BusinessController.prototype.downloadAppforIOS = function(identifier, imgId, filename, type, successCallback, errorcallback) {
        var config = applicationManager.getConfigManager();
        var commonUtils = applicationManager.getCommonUtilsManager();
        var serverUrl = commonUtils.getServerUrl();
        var downloadUrl;
        var konyclient = voltmx.sdk.getCurrentInstance();
        currentScope.xhr = new voltmx.net.HttpRequest();
        //#ifdef iphone
        	currentScope.xhr.backgroundTransfer = true;
        //#endif
      	//#ifdef ipad
        	currentScope.xhr.backgroundTransfer = true;
        //#endif
        downloadUrl = serverUrl + config.getBinaryServiceUrl + "?file_id=" + identifier + "&type="+ type + "&ipa_file_name=" + filename.replace(/( )/g,"");
        if(imgId !== null){
          downloadUrl = downloadUrl+"&icon_id=" + imgId;
        }
        currentScope.xhr.open("GET", downloadUrl);
        currentScope.xhr.setRequestHeader("X-Voltmx-Authorization", konyclient.currentClaimToken);
        currentScope.xhr.setRequestHeader("Content-Type", "application/octet-stream");
        currentScope.xhr.setRequestHeader("X-Voltmx-Server-Url", serverUrl + "/services");
        currentScope.downloadErrorCallback = errorcallback;
        currentScope.downloadSuccessCallback = successCallback;
        currentScope.xhr.onReadyStateChange = currentScope.downloadCallback;
        currentScope.xhr.send();
    };
    /*
    *	This method will launch plist url for iOS native.
    */
    BusinessController.prototype.downloadCallback = function(){
      if (currentScope.xhr.readyState  == 4) {
          var resp = currentScope.xhr.response;
          if(typeof resp === "object" && resp.text !== undefined)
            resp=resp.text;
          if (resp !== undefined && resp !== null) {
            if(typeof resp == "string")
              resp = JSON.parse(resp);
            if(resp.link){
              voltmx.application.openURL(resp.link);
              currentScope.downloadSuccessCallback();
            } else{
              currentScope.downloadErrorCallback(currentScope.xhr.response);
            }
          } else{
              currentScope.downloadErrorCallback(currentScope.xhr.response);
          }
        } 
    };

    return BusinessController;

});