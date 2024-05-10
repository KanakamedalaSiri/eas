define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for flxBack **/
    AS_FlexContainer_ffe2b6531e1a43a3bb231cc1be70211f: function AS_FlexContainer_ffe2b6531e1a43a3bb231cc1be70211f(eventobject, x, y) {
        var self = this;
        return self.onClickOfBackBtn.call(this);
    },
    /** onClick defined for btnSubmit **/
    AS_Button_ie3ce877c981404f8ad5a68d2ac2238a: function AS_Button_ie3ce877c981404f8ad5a68d2ac2238a(eventobject) {
        var self = this;
        return self.onClickOfSubmitBtn.call(this);
    },
    /** onClick defined for btnOk **/
    AS_Button_f888db35900f47a0b619ab49d78600ed: function AS_Button_f888db35900f47a0b619ab49d78600ed(eventobject) {
        var self = this;
        return self.onClickOfOkBtn.call(this);
    },
    /** preShow defined for frmForgotPassword **/
    AS_Form_a54ced0dfe9241e3af28c398b6e9fc09: function AS_Form_a54ced0dfe9241e3af28c398b6e9fc09(eventobject) {
        var self = this;
        this.attachToModule(authModule);
        this.view.flxForgotPassword.height = (screenHeight - 55) + "dp";
        this.view.flxEmailAlert.height = screenHeight + "dp";
        self.onFormPreShow.call(this);
    },
    /** postShow defined for frmForgotPassword **/
    AS_Form_g6ed3b2dbeb349d182c13d03e7b0a7ce: function AS_Form_g6ed3b2dbeb349d182c13d03e7b0a7ce(eventobject) {
        var self = this;
        try {
            var txtBoxEmail = document.getElementById("frmForgotPassword_txtBoxEmail");
            txtBoxEmail.style.outline = 'none';
        } catch (err) {
            voltmx.print(err);
        }
    },
    /** onDeviceBack defined for frmForgotPassword **/
    AS_Form_c8fa200c3bed4201a336181dd33d8503: function AS_Form_c8fa200c3bed4201a336181dd33d8503(eventobject) {
        var self = this;
        return self.onDeviceBack.call(this);
    }
});