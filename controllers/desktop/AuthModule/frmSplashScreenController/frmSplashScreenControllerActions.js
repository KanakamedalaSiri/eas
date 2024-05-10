define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for frmSplashScreen **/
    AS_Form_i1030b246ef0470d8e8327ca2acc53cc: function AS_Form_i1030b246ef0470d8e8327ca2acc53cc(eventobject) {
        var self = this;
        this.attachToModule(authModule);
        var config = applicationManager.getConfigManager();
        if (config.platformName === "desktop") {
            screenHeight = voltmx.os.deviceInfo().screenHeight;
        } else {
            screenHeight = Math.max(voltmx.os.deviceInfo().screenHeight, voltmx.os.deviceInfo().screenWidth);
        }
        self.preShow.call(this);
    },
    /** onDeviceBack defined for frmSplashScreen **/
    AS_Form_c8c11ce5b58e4a1c955316fcee32b897: function AS_Form_c8c11ce5b58e4a1c955316fcee32b897(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});