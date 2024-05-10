define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnLogin **/
    AS_Button_f7c7200186044ac08c2077a5327267ff: function AS_Button_f7c7200186044ac08c2077a5327267ff(eventobject) {
        var self = this;
        return self.onClickbtnLogin.call(this);
    },
    /** onClick defined for btnForgot **/
    AS_Button_iae81fceb05445c3a09c4fc8e5bc4df4: function AS_Button_iae81fceb05445c3a09c4fc8e5bc4df4(eventobject) {
        var self = this;
        return self.onClickbtnForgot.call(this);
    },
    /** onDone defined for txtPassword **/
    AS_TextField_c5066c322c774c6597f2120af0a9a4cc: function AS_TextField_c5066c322c774c6597f2120af0a9a4cc(eventobject, changedtext) {
        var self = this;
        return self.onClickbtnLogin.call(this);
    },
    /** onClick defined for flxShowPassword **/
    AS_FlexContainer_g70f0d7795ee4925bccca1c95eaccb3b: function AS_FlexContainer_g70f0d7795ee4925bccca1c95eaccb3b(eventobject) {
        var self = this;
        if (this.view.txtPassword.secureTextEntry == true) {
            this.view.txtPassword.secureTextEntry = false;
        } else {
            this.view.txtPassword.secureTextEntry = true;
        }
    },
    /** preShow defined for frmLogin **/
    AS_Form_dec69c2358774ce5962f153d6c07d1e8: function AS_Form_dec69c2358774ce5962f153d6c07d1e8(eventobject) {
        var self = this;
        //this.view.flxMain.height = screenHeight +"dp";
        this.attachToModule(authModule);
        self.preShow.call(this);
    },
    /** onDeviceBack defined for frmLogin **/
    AS_Form_f7b2fa94470542039e4e031e495f91a0: function AS_Form_f7b2fa94470542039e4e031e495f91a0(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});