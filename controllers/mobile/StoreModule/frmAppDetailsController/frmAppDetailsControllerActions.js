define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for flxBack **/
    AS_FlexContainer_i514e731c53344f6ada206072678cd88: function AS_FlexContainer_i514e731c53344f6ada206072678cd88(eventobject, x, y) {
        var self = this;
        return self.onClickOfBackBtn.call(this);
    },
    /** onClick defined for flxLogout **/
    AS_FlexContainer_f2d31b75290d493aa4476132568461cf: function AS_FlexContainer_f2d31b75290d493aa4476132568461cf(eventobject) {
        var self = this;
        PREV_FORM = "";
        self.onClickOfLogout.call(this);
    },
    /** onClick defined for btnGet **/
    AS_Button_c4a0ee5e3bf043dab794651646f38a3a: function AS_Button_c4a0ee5e3bf043dab794651646f38a3a(eventobject) {
        var self = this;
        return self.onClickOfGetBtnInAppDetails.call(this);
    },
    /** onClick defined for btnWebApp **/
    AS_Button_e10ad91b8d984c5693ab966fe6529ea3: function AS_Button_e10ad91b8d984c5693ab966fe6529ea3(eventobject) {
        var self = this;
        return self.onClickOfLaunchWebAppInAppDetails.call(this);
    },
    /** preShow defined for frmAppDetails **/
    AS_Form_ca18dcae1b0a4c56a13a369283e8d6e8: function AS_Form_ca18dcae1b0a4c56a13a369283e8d6e8(eventobject) {
        var self = this;
        var storeModule = applicationManager.getStoreModule();
        this.attachToModule(storeModule);
    },
    /** postShow defined for frmAppDetails **/
    AS_Form_ef2d3080ae8b4272a9e31c5b6e0535c8: function AS_Form_ef2d3080ae8b4272a9e31c5b6e0535c8(eventobject) {
        var self = this;
        return self.postshow.call(this);
    },
    /** onDeviceBack defined for frmAppDetails **/
    AS_Form_id8e647d051e432497539dce2665532e: function AS_Form_id8e647d051e432497539dce2665532e(eventobject) {
        var self = this;
        return self.onDeviceBack.call(this);
    }
});