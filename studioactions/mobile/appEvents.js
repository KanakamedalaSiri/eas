define({
    AS_AppEvents_e66700b22ff443b59684fe043536492e: function AS_AppEvents_e66700b22ff443b59684fe043536492e(eventobject) {
        var self = this;
        // console.log('eventObject: ' + eventobject);
        //if(eventobject.launchparams.formID == "frmStore"){
        //    var storeModule = applicationManager.getStoreModule();
        //    storeModule.presentationController.getEnterpriseAppsList();
        //    return "frmStore";
        //}
        // return eventobject.launchparams.formID;
        if (eventobject && eventobject.launchmode == 3) {
            //#ifdef iphone
            voltmx.store.setItem("disablefrmLoginPreShow", false);
            //#endif
            handleDeeplinkCallback(eventobject);
        }
    },
    AS_AppEvents_fc31685e02ba42b28cb688e316b05d03: function AS_AppEvents_fc31685e02ba42b28cb688e316b05d03(eventobject) {
        var self = this;
        voltmx.print("post app init");
        voltmx.application.setApplicationBehaviors({
            "hideDefaultLoadingIndicator": true
        });
    },
    AS_AppEvents_c215b0f1efd842cab871e00535a25599: function AS_AppEvents_c215b0f1efd842cab871e00535a25599(eventobject) {
        var self = this;
        var appManager = require('ApplicationManager');
        applicationManager = appManager.getApplicationManager();
        authModule = applicationManager.getAuthModule();
        PREV_FORM = null;
        voltmx.store.setItem("disablefrmLoginPreShow", false);
        var CommonUtilsManager = applicationManager.getCommonUtilsManagerPresenter();
        CommonUtilsManager.presentationController.setEASAppCallBacks();
    }
});