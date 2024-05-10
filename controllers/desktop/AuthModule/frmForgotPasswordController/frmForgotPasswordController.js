define({
  
   /**
     * Invoked on click of Back Button.
     */
    onClickOfBackBtn: function() {
        this.presenter.showLoginForm();
    },
   /**
     * Forgot Password form pre show method.
     */
    onFormPreShow: function() {
        //this.view.flxForgotPassword.height = voltmx.os.deviceInfo().screenHeight + "dp";
        this.view.flxEmailAlert.isVisible = false;
        this.view.flxForgotPassword.isVisible = true;
        this.view.flxHeader.isVisible = true;
        this.view.txtBoxEmail.text = "";
        this.view.txtBoxEmail.setFocus(false);
        this.view.flxForgotPassword.doLayout = function(model) {
            voltmx.application.getCurrentForm().flxForgotPassword.height = model.frame.height;
        };
      	var config = applicationManager.getConfigManager();
      	if(config.platformName === "desktop"){
        this.view.flxBack.isVisible=false;
        }
      else{
        this.view.flxBack.isVisible=true;
      }
    },
   /**
     * Invoked on click of OK button in success alert popup.
     */
    onClickOfOkBtn: function() {
        this.presenter.showLoginForm();
    },
  /**
    * Serializes object into query string in encoded format. 
    */
    serialize: function(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    },
   /**
     * This method invokes forgot password API. 
     */
    onClickOfSubmitBtn: function() {
        var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        if(!CommonUtilsManager.isNetworkAvailable()){
          var error = {
            "message": applicationManager.getConfigManager().networkErrorMsg,
          };
          this.presenter.showNetworkError(error);
        }
        else{
            if (this.validateEmail()) {
                voltmx.application.showLoadingScreen("sknLoader", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
                this.httpclient = new voltmx.net.HttpRequest();
                var configManager = applicationManager.getConfigManager();
                this.httpclient.open(constants.HTTP_METHOD_POST, configManager.forgot_password_url);
                this.httpclient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.httpclient.setRequestHeader("X-Voltmx-RequestId","junk");
                var postdata = {
                    "userid": this.view.txtBoxEmail.text,
                    "provider": applicationManager.getItem("IDENTITY_PROV")
                };
                this.httpclient.onReadyStateChange = this.forgotPasswordCallback;
                this.httpclient.send(this.serialize(postdata));
            } else {
                alert("Please provide email address.");
            }
        }
    },
   /**
     * Forgot password Callback method.
     * @callback forgotPasswordCallback
     */
    forgotPasswordCallback: function() {
        try {
            voltmx.application.dismissLoadingScreen();
            if (this.httpclient.readyState == 4) {
                var responseContent = JSON.parse(this.httpclient.response);
                this.showEmailALert(responseContent.message);
            }
        } catch (err) {
            voltmx.print("exception is :: " + err);
            voltmx.application.dismissLoadingScreen();
        }
    },
   /**
     * Validates user inputs
     */
    validateEmail: function() {
        var email = this.view.txtBoxEmail.text;
        if (email === "" || email === undefined || email === null)
            return false;
        return true;
    },
   /**
     * Shows successfully email sent alert popup.
     * @param {String} message - success message
     */
    showEmailALert: function(message) {
        this.view.lblMessage.text = message;
        this.view.flxHeader.isVisible = false;
        this.view.flxEmailAlert.isVisible = true;
        this.view.forceLayout();
        this.view.flxForgotPassword.isVisible = false;
    },
    /**
     * This function will be called when we want to refresh the UI with the latest data.
     */
    updateUI: function(formdata) {
        if (formdata !== undefined && formdata.isError) {
            if (formdata.data.message && formdata.data.message !== null && formdata.data.message !== undefined) {
            alert(formdata.data.message);
          }
        }
    }
});