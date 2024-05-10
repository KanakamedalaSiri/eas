define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for flxBack **/
    AS_FlexContainer_cb4a82283a0845f4bd6eb68984f6c665: function AS_FlexContainer_cb4a82283a0845f4bd6eb68984f6c665(eventobject, x, y) {
        var self = this;
        return self.onClickOfBackBtn.call(this);
    },
    /** onClick defined for btnSubmit **/
    AS_Button_bd77923d9f404f4eafd6a94db8e04956: function AS_Button_bd77923d9f404f4eafd6a94db8e04956(eventobject) {
        var self = this;
        return self.onClickOfSubmitBtn.call(this);
    },
    /** onClick defined for btnOk **/
    AS_Button_c59e84a9388c492e8ded289a1fb5dc6b: function AS_Button_c59e84a9388c492e8ded289a1fb5dc6b(eventobject) {
        var self = this;
        return self.onClickOfOkBtn.call(this);
    },
    /** preShow defined for frmForgotPassword **/
    AS_Form_j7430a72952147cfaea480674708b7f6: function AS_Form_j7430a72952147cfaea480674708b7f6(eventobject) {
        var self = this;
        this.attachToModule(authModule);
        this.view.flxForgotPassword.height = (screenHeight - 55) + "dp";
        this.view.flxEmailAlert.height = screenHeight + "dp";
        self.onFormPreShow.call(this);
    },
    /** postShow defined for frmForgotPassword **/
    AS_Form_c832eb6de3614ad787f3049520b119b8: function AS_Form_c832eb6de3614ad787f3049520b119b8(eventobject) {
        var self = this;
        try {
            var txtBoxEmail = document.getElementById("frmForgotPassword_txtBoxEmail");
            txtBoxEmail.style.outline = 'none';
        } catch (err) {
            voltmx.print(err);
        }
    }
});