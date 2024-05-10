define({
    AS_AppEvents_c6d41054fb684d1586b49d84dbda58e1: function AS_AppEvents_c6d41054fb684d1586b49d84dbda58e1(eventobject) {
        var self = this;
        if (eventobject && eventobject.launchmode == 3) {
            //#ifdef ipad
            voltmx.store.setItem("disablefrmLoginPreShow", false);
            //#endif
            handleDeeplinkCallback(eventobject);
        }
    },
    AS_AppEvents_a493bb8c04334ab8ae3dd73f8a52f8e3: function AS_AppEvents_a493bb8c04334ab8ae3dd73f8a52f8e3(eventobject) {
        var self = this;
        voltmx.print("post app init");
        voltmx.application.setApplicationBehaviors({
            "hideDefaultLoadingIndicator": true
        });
    },
    AS_AppEvents_f90a39940d47471187cbb7f265123db1: function AS_AppEvents_f90a39940d47471187cbb7f265123db1(eventobject) {
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