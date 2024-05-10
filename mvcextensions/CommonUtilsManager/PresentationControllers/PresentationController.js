define([], function() {
  
    var currentScope;
    function PresentationController() {
        voltmx.mvc.Presentation.BasePresenter.call(this);
        currentScope = this;
    }

    inheritsFrom(PresentationController, voltmx.mvc.Presentation.BasePresenter);

    PresentationController.prototype.initializePresentationController = function() {
        
    };
    /*
    * This method will set background/foreground callbacks for the application.
    */
    PresentationController.prototype.setEASAppCallBacks = function(){
      try{
        var callbacksObj = {onforeground:onAppForeground};
        voltmx.application.setApplicationCallbacks(callbacksObj);
      }catch(err){
        voltmx.print("CATCH setEASAppCallBacks : "+err);
      }

      function onAppForeground()
      {
        try{
          var commonUtilsManager = applicationManager.getCommonUtilsManager();
          if(!commonUtilsManager.isNetworkAvailable()){
            alert(applicationManager.getConfigManager().networkErrorMsg);
            refreshAppFlag = false;
            return;
          }
          var curForm = voltmx.application.getCurrentForm();
          if(voltmx.store.getItem("downloadInProgress") !== true){
            if(refreshAppFlag === true){
              return;
            }
            refreshAppFlag = true;
            currentScope.presentUserInterface(curForm.id, "refreshApp");
            if(curForm.id === "frmSplashScreen"){
              curForm.preShow.call(this);
            }
            else {
          	PREV_FORM = curForm.id;
            var AuthModule = applicationManager.getAuthModule();
            applicationManager.getConfigManager().getAppProperties(AuthModule.presentationController.appPropertiesSuccessCallback);
            }
          }
        }catch(err){
          refreshAppFlag = false;
          voltmx.print("CATCH : caught in onAppForeground " + err);
        }
      }
    };
  
  PresentationController.prototype.showAlertMessage = function(message, alertType, title, yesLabel, noLabel, alertHandler){
    var basicProperties = {
      message: message,
      alertType: alertType,
      alertTitle: title,
      yesLabel: yesLabel,
      noLabel: noLabel,
      alertHandler: alertHandler
    };
    voltmx.ui.Alert(basicProperties, {});
  };
   
    return PresentationController;
});