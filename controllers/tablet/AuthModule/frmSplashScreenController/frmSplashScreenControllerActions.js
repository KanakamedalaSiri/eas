define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** init defined for frmSplashScreen **/
    AS_Form_e9593192ae0b40d6bfb4e5d7befd236e: function AS_Form_e9593192ae0b40d6bfb4e5d7befd236e(eventobject) {
        var self = this;
        var CommonUtilsManager = applicationManager.getCommonUtilsManagerPresenter();
        CommonUtilsManager.presentationController.setEASAppCallBacks();
        refreshAppFlag = true;
        isPullToRefresh = false;
    },
    /** preShow defined for frmSplashScreen **/
    AS_Form_i5c40212430b4c508af9b26bfb05c517: function AS_Form_i5c40212430b4c508af9b26bfb05c517(eventobject) {
        var self = this;
        this.attachToModule(authModule);
        self.preShow.call(this);
    },
    /** onDeviceBack defined for frmSplashScreen **/
    AS_Form_c058b03b5cf54378850c952de63c9f74: function AS_Form_c058b03b5cf54378850c952de63c9f74(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});