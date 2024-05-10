define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnLogin **/
    AS_Button_b61466e83da544de92b789ae4556f16b: function AS_Button_b61466e83da544de92b789ae4556f16b(eventobject) {
        var self = this;
        return self.onClickbtnLogin.call(this);
    },
    /** onClick defined for btnForgot **/
    AS_Button_ic9c87cb853c46259b81919fd6f05e35: function AS_Button_ic9c87cb853c46259b81919fd6f05e35(eventobject) {
        var self = this;
        return self.onClickbtnForgot.call(this);
    },
    /** onDone defined for txtPassword **/
    AS_TextField_fd9a858b2daa46a185257da2113f7994: function AS_TextField_fd9a858b2daa46a185257da2113f7994(eventobject, changedtext) {
        var self = this;
        return self.onClickbtnLogin.call(this);
    },
    /** onClick defined for flxShowPassword **/
    AS_FlexContainer_eaf1406eac9940dca6ad60fb6b885c1f: function AS_FlexContainer_eaf1406eac9940dca6ad60fb6b885c1f(eventobject) {
        var self = this;
        if (this.view.txtPassword.secureTextEntry == true) {
            this.view.txtPassword.secureTextEntry = false;
        } else {
            this.view.txtPassword.secureTextEntry = true;
        }
    },
    /** preShow defined for frmLogin **/
    AS_Form_i7ca1fcdde3b41b6b90768be994cfc7d: function AS_Form_i7ca1fcdde3b41b6b90768be994cfc7d(eventobject) {
        var self = this;
        this.view.flxMain.height = screenHeight + "dp";
        this.attachToModule(authModule);
        self.preShow.call(this);
    },
    /** postShow defined for frmLogin **/
    AS_Form_i5a92ea0b0334381b80c03fd1b065c35: function AS_Form_i5a92ea0b0334381b80c03fd1b065c35(eventobject) {
        var self = this;
        try {
            var usernameTxt = document.getElementById("frmLogin_txtUsername");
            usernameTxt.style.outline = 'none';
            var passwordTxt = document.getElementById("frmLogin_txtPassword");
            passwordTxt.style.outline = 'none';
            var btnLogin = document.getElementById("frmLogin_btnLogin");
            btnLogin.style.outline = 'none';
        } catch (err) {
            voltmx.print(err);
        }
    },
    /** onDeviceBack defined for frmLogin **/
    AS_Form_a1f1cdd2c60b493cbce2af52e79d6186: function AS_Form_a1f1cdd2c60b493cbce2af52e79d6186(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});