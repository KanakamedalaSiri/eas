define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxBack **/
    AS_FlexContainer_c13d8df46da84c64b563e6f37c790940: function AS_FlexContainer_c13d8df46da84c64b563e6f37c790940(eventobject) {
        var self = this;
        return self.onClickOfBackBtn.call(this);
    },
    /** onClick defined for flxLogout **/
    AS_FlexContainer_f6e8a30ae5824c8397c37784ef0573dc: function AS_FlexContainer_f6e8a30ae5824c8397c37784ef0573dc(eventobject) {
        var self = this;
        PREV_FORM = "";
        self.onClickOfLogout.call(this);
    },
    /** preShow defined for frmHelpScreen **/
    AS_Form_g89584b914924268811cfd0d9010a0f5: function AS_Form_g89584b914924268811cfd0d9010a0f5(eventobject) {
        var self = this;
        var storeModule = applicationManager.getStoreModule();
        this.attachToModule(storeModule);
        this.view.flxLoader.isVisible = false;
        self.showLogout.call(this);
    }
});