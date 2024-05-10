define([], function() {

  
    function BusinessController() {

        voltmx.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(BusinessController, voltmx.mvc.Business.Delegator);

    BusinessController.prototype.initializeBusinessController = function() {

    };

    BusinessController.prototype.execute = function(command) {

        voltmx.mvc.Business.Controller.prototype.execute.call(this, command);

    };
	  /*
    *	This method handles login according to business logic
    */
    BusinessController.prototype.login = function(params,successCallback, errorCallback) {
      try{
        var konyClient = voltmx.sdk.getCurrentInstance();
        this.authClient = konyClient.getIdentityService(applicationManager.getItem("IDENTITY_PROV"));
        this.authClient.login(params, successCallback, errorCallback);
      }catch(err){
        voltmx.print("In catch : "+err);
        errorCallback(err);
      }

    };
	  /*
    	This method handles logout according to business logic
    */
    BusinessController.prototype.logout = function(params,successCallback, errorCallback) {
      try{
        var konyClient = voltmx.sdk.getCurrentInstance();
        this.authClient = konyClient.getIdentityService(applicationManager.getItem("IDENTITY_PROV"));
        this.authClient.logout(successCallback, errorCallback,params);
      }catch(err){
        voltmx.print("In catch : "+err);
        successCallback();
      }
    };

    return BusinessController;

});