define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTextChange defined for txtUsername **/
    AS_TextField_e1880054da284459a23a991d27528cf1: function AS_TextField_e1880054da284459a23a991d27528cf1(eventobject, changedtext) {
        var self = this;
        return self.setFocusSkins.call(this, eventobject, 'sknTxtBxUsernameFocus', 'sknTxtBxPlaceHolderNative');
    },
    /** onBeginEditing defined for txtUsername **/
    AS_TextField_c5d81ccd2c254415b259f6493d360233: function AS_TextField_c5d81ccd2c254415b259f6493d360233(eventobject, changedtext) {
        var self = this;
        return self.setFocusSkins.call(this, eventobject, 'sknTxtBxUsernameFocus', 'sknTxtBxPlaceHolderNative');
    },
    /** onClick defined for btnLogin **/
    AS_Button_affbbdc0768d4ad6b138416645ad11f3: function AS_Button_affbbdc0768d4ad6b138416645ad11f3(eventobject) {
        var self = this;
        return self.onClickbtnLogin.call(this);
    },
    /** onClick defined for btnForgot **/
    AS_Button_f5e9f4fff2a74195b87a5e0762ddae7a: function AS_Button_f5e9f4fff2a74195b87a5e0762ddae7a(eventobject) {
        var self = this;
        return self.onClickbtnForgot.call(this);
    },
    /** onTextChange defined for txtPassword **/
    AS_TextField_ic8a7b10bfd44971bf672eca1237379a: function AS_TextField_ic8a7b10bfd44971bf672eca1237379a(eventobject, changedtext) {
        var self = this;
        return self.setFocusSkins.call(this, eventobject, 'sknTxtBxUsernameFocus', 'sknTxtBxPlaceHolderNative');
    },
    /** onDone defined for txtPassword **/
    AS_TextField_hb899df47d40417588019b03e788721a: function AS_TextField_hb899df47d40417588019b03e788721a(eventobject, changedtext) {
        var self = this;
        return self.onClickbtnLogin.call(this);
    },
    /** onBeginEditing defined for txtPassword **/
    AS_TextField_i5c6eeb51a744961a93325ee70329598: function AS_TextField_i5c6eeb51a744961a93325ee70329598(eventobject, changedtext) {
        var self = this;
        return self.setFocusSkins.call(this, eventobject, 'sknTxtBxUsernameFocus', 'sknTxtBxPlaceHolderNative');
    },
    /** onClick defined for flxShowPassword **/
    AS_FlexContainer_if494e20bd234c73921c8ae9257120cd: function AS_FlexContainer_if494e20bd234c73921c8ae9257120cd(eventobject) {
        var self = this;
        if (this.view.txtPassword.secureTextEntry == true) {
            this.view.txtPassword.secureTextEntry = false;
        } else {
            this.view.txtPassword.secureTextEntry = true;
        }
    },
    /** preShow defined for frmLogin **/
    AS_Form_h37aafb29b324c72ada08aa6b7853e5d: function AS_Form_h37aafb29b324c72ada08aa6b7853e5d(eventobject) {
        var self = this;
        this.attachToModule(authModule);
        self.preShow.call(this);
    },
    /** onDeviceBack defined for frmLogin **/
    AS_Form_j9489b391bb248f8a7706d6eea4868ea: function AS_Form_j9489b391bb248f8a7706d6eea4868ea(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});