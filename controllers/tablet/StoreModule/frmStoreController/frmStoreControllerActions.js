define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxLogout **/
    AS_FlexContainer_e0e7caeacfa84a5189f8b42d932803b5: function AS_FlexContainer_e0e7caeacfa84a5189f8b42d932803b5(eventobject) {
        var self = this;
        return self.onClickOfLogout.call(this);
    },
    /** onPull defined for segAppsList **/
    AS_Segment_c618bef5c3fa41ddb55558b9f44a3039: function AS_Segment_c618bef5c3fa41ddb55558b9f44a3039(eventobject) {
        var self = this;
        return self.onPullToRefresh.call(this);
    },
    /** onClick defined for btnCross **/
    AS_Button_f8589c6ffd264b7bada3fdaefb767d82: function AS_Button_f8589c6ffd264b7bada3fdaefb767d82(eventobject) {
        var self = this;
        return self.onClickOfCross.call(this);
    },
    /** onClick defined for btnGet **/
    AS_Button_e9b21bac596e4402a36243ce9a167020: function AS_Button_e9b21bac596e4402a36243ce9a167020(eventobject) {
        var self = this;
        return self.onClickOfGetBtnInAppDetails.call(this);
    },
    /** onClick defined for btnWebApp **/
    AS_Button_a31881d84d7446dc96f2cf2e8c2eea6b: function AS_Button_a31881d84d7446dc96f2cf2e8c2eea6b(eventobject) {
        var self = this;
        return self.onClickOfWebAppLaunchInAppDetails.call(this);
    },
    /** init defined for frmStore **/
    AS_Form_cf3eed26b80642bdafe79ec6fce0a126: function AS_Form_cf3eed26b80642bdafe79ec6fce0a126(eventobject) {
        var self = this;
        return self.init.call(this);
    },
    /** preShow defined for frmStore **/
    AS_Form_ae5e8b3802a6439aa4744a4c86c72771: function AS_Form_ae5e8b3802a6439aa4744a4c86c72771(eventobject) {
        var self = this;
        var storeModule = applicationManager.getStoreModule();
        this.attachToModule(storeModule);
        self.preShow.call(this);
    },
    /** postShow defined for frmStore **/
    AS_Form_e891a8e7f69249078e03d34c172ce347: function AS_Form_e891a8e7f69249078e03d34c172ce347(eventobject) {
        var self = this;
        self.postshow.call(this);
    },
    /** onDeviceBack defined for frmStore **/
    AS_Form_eec43a59b63546e6ba5879f4daeff728: function AS_Form_eec43a59b63546e6ba5879f4daeff728(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});