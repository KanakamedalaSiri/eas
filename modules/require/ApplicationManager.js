define(function() {
    var currentScope;
    function ApplicationManager() {
        this.applicationManagerInstance = null;
        currentScope = this;
    }

    ApplicationManager.getApplicationManager = function() {
        if (!this.applicationManagerInstance)
            this.applicationManagerInstance = new ApplicationManager();
        return this.applicationManagerInstance;
    };
  
  /**
    * This method loads config Manager business controller.
    */
    ApplicationManager.prototype.getConfigManager = function() {
        return voltmx.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ConfigManager').businessController;
    };
  
  /**
    * This method loads Auth Module.
    */
    ApplicationManager.prototype.getAuthModule = function() {
        return voltmx.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AuthModule');
    };
  /**
    * This method loads Store Module.
    */
    ApplicationManager.prototype.getStoreModule = function() {
        return voltmx.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('StoreModule');
    };
  
  /**
    * This method loads CommonUtilsManager Business Controller.
    */
    ApplicationManager.prototype.getCommonUtilsManager = function() {
        return voltmx.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CommonUtilsManager').businessController;
    };
  
  /**
    * This method loads CommonUtilsManager module.
    */
  	ApplicationManager.prototype.getCommonUtilsManagerPresenter = function() {
        return voltmx.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CommonUtilsManager');
    };
  /**
    * This method is used to store the key value pairs in data store.
    */
    ApplicationManager.prototype.setItem = function(key, value){
      if(value !== null && value !== undefined){
        if(voltmx.os.deviceInfo().name == "thinclient"){
          voltmx.ds.save(value, key, {dsmode: "cookie",secure: "true"});
        } else {
          voltmx.store.setItem(key, value);
        }
      }
    };
  /**
    * This method is used to get the value for specificed key from data store.
    * @param{String}Key
    */
    ApplicationManager.prototype.getItem = function(key){
        if(voltmx.os.deviceInfo().name == "thinclient"){
           return voltmx.ds.read(key);
        } else{
           return voltmx.store.getItem(key);
        }
    };
  /**
    * This method is used to remove the key value pairs from data store.
    * @param{String} Key
    */
    ApplicationManager.prototype.removeItem = function(key){
        if(voltmx.os.deviceInfo().name == "thinclient"){
          voltmx.ds.remove(key, {dsmode: "cookie",secure: "true"});
        } else{
          voltmx.store.removeItem(key);
        }
      
    };
    
    return ApplicationManager;
});