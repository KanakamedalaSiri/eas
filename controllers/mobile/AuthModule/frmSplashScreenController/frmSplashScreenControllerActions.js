define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** init defined for frmSplashScreen **/
    AS_Form_c62adf0378274a60802667689d571c3f: function AS_Form_c62adf0378274a60802667689d571c3f(eventobject) {
        var self = this;
        var commonUtilsManagerPresenter = applicationManager.getCommonUtilsManagerPresenter();
        commonUtilsManagerPresenter.presentationController.setEASAppCallBacks();
        refreshAppFlag = true;
        isPullToRefresh = false;
    },
    /** preShow defined for frmSplashScreen **/
    AS_Form_c06561018c6b455094579e2083050047: function AS_Form_c06561018c6b455094579e2083050047(eventobject) {
        var self = this;
        this.attachToModule(authModule);
        screenHeight = Math.max(voltmx.os.deviceInfo().screenHeight, voltmx.os.deviceInfo().screenWidth);
        self.preShow.call(this);
    },
    /** onDeviceMenu defined for frmSplashScreen **/
    AS_Form_bae3e860b66a48cb88159ad42f72f708: function AS_Form_bae3e860b66a48cb88159ad42f72f708(eventobject) {
        var self = this;
        voltmx.print("on device back");
    },
    /** onDeviceBack defined for frmSplashScreen **/
    AS_Form_c8d7d1d8bf424183805e0127d80b90e9: function AS_Form_c8d7d1d8bf424183805e0127d80b90e9(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});