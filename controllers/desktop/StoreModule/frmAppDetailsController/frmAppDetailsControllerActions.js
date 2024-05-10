define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for flxBack **/
    AS_FlexContainer_fe0bbeb4e9b3489c970ec54728b7b491: function AS_FlexContainer_fe0bbeb4e9b3489c970ec54728b7b491(eventobject, x, y) {
        var self = this;
        return self.onClickOfBackBtn.call(this);
    },
    /** onClick defined for flxLogout **/
    AS_FlexContainer_defa3357e3aa46998a887863a5183049: function AS_FlexContainer_defa3357e3aa46998a887863a5183049(eventobject) {
        var self = this;
        applicationManager.removeItem("USER_CRED");
        PREV_FORM = "";
        self.onClickOfLogout.call(this);
    },
    /** onClick defined for btnGet **/
    AS_Button_f12566c4b92e4c61ab6e11062108e3b8: function AS_Button_f12566c4b92e4c61ab6e11062108e3b8(eventobject) {
        var self = this;
        return self.onClickOfGetBtnInAppDetails.call(this);
    },
    /** onClick defined for btnWebApp **/
    AS_Button_a214032c1a6f44d5afff2afe6bbd3634: function AS_Button_a214032c1a6f44d5afff2afe6bbd3634(eventobject) {
        var self = this;
        return self.launchWebAppInAppDetails.call(this);
    },
    /** preShow defined for frmAppDetails **/
    AS_Form_c246138098cd454da15dede0446d966d: function AS_Form_c246138098cd454da15dede0446d966d(eventobject) {
        var self = this;
        var storeModule = applicationManager.getStoreModule();
        this.attachToModule(storeModule);
        if (voltmx.os.deviceInfo().screenHeight < 550) {
            this.view.imgAppIcon.width = "100dp";
            this.view.imgAppIcon.height = "100dp";
        }
        this.view.flxMain.height = (screenHeight - 50) + "dp";
    },
    /** postShow defined for frmAppDetails **/
    AS_Form_d20b577b056f411589a2ccc7babad18f: function AS_Form_d20b577b056f411589a2ccc7babad18f(eventobject) {
        var self = this;
        return self.postshow.call(this);
    }
});