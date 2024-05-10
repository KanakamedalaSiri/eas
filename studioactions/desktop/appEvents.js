define({
    AS_AppEvents_fa941076c64d4abaaa1f33a041a92621: function AS_AppEvents_fa941076c64d4abaaa1f33a041a92621(eventobject) {
        var self = this;
        if (eventobject.launchparams && eventobject.launchparams.formID) {
            PREV_FORM = eventobject.launchparams.formID;
        }
    },
    AS_AppEvents_e31266436d474d98b1e3cc328015c1a3: function AS_AppEvents_e31266436d474d98b1e3cc328015c1a3(eventobject) {
        var self = this;
        var appManager = require('ApplicationManager');
        applicationManager = appManager.getApplicationManager();
        authModule = applicationManager.getAuthModule();
        applicationManager.getConfigManager().setPlatformID();
        PREV_FORM = "";
    }
});