define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for flxBack **/
    AS_FlexContainer_e7f1205ca7be4cb4959c749e68f2fab4: function AS_FlexContainer_e7f1205ca7be4cb4959c749e68f2fab4(eventobject, x, y) {
        var self = this;
        return self.onClickOfBackBtn.call(this);
    },
    /** onTextChange defined for txtBoxEmail **/
    AS_TextField_cbfaed8b9cb24900b95f820bfd52e3af: function AS_TextField_cbfaed8b9cb24900b95f820bfd52e3af(eventobject, changedtext) {
        var self = this;
        return self.setFocusSkins.call(this, eventobject, 'sknTxtBxUsernameFocus', 'sknTxtBxPlaceHolderNative');
    },
    /** onBeginEditing defined for txtBoxEmail **/
    AS_TextField_j1ea44923910431ca737a3a4388f6dcb: function AS_TextField_j1ea44923910431ca737a3a4388f6dcb(eventobject, changedtext) {
        var self = this;
        return self.setFocusSkins.call(this, eventobject, 'sknTxtBxUsernameFocus', 'sknTxtBxPlaceHolderNative');
    },
    /** onClick defined for btnSubmit **/
    AS_Button_gf9158c4126f487b976fe77f6bc19d3d: function AS_Button_gf9158c4126f487b976fe77f6bc19d3d(eventobject) {
        var self = this;
        return self.onClickOfSubmitBtn.call(this);
    },
    /** onClick defined for btnOk **/
    AS_Button_ce7d26797735459381fd6918b0f3ce36: function AS_Button_ce7d26797735459381fd6918b0f3ce36(eventobject) {
        var self = this;
        return self.onClickOfOkBtn.call(this);
    },
    /** preShow defined for frmForgotPassword **/
    AS_Form_h096b613e6b04df19513507a48c46102: function AS_Form_h096b613e6b04df19513507a48c46102(eventobject) {
        var self = this;
        this.attachToModule(authModule);
        self.onFormPreShow.call(this);
    },
    /** onDeviceBack defined for frmForgotPassword **/
    AS_Form_j86209ed274048cc825691f8484deec4: function AS_Form_j86209ed274048cc825691f8484deec4(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});