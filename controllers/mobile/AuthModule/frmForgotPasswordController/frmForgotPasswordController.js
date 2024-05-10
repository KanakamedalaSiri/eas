define({
  
   /**
     * Invoked on click of Back Button.
     */
    onClickOfBackBtn: function() {
        this.presenter.showLoginForm();
    },
     
    /**
     * Updates UI with provided data
     * @param {json/string} formdata - Refresh App Details
     */
  	updateUI: function(formdata) {
      	if(formdata === "refreshApp"){
          refreshAppFlag = true;
          this.view.flxLoader.isVisible = true;
          return;
        }
    },
  
    /**
     * Forgot Password form pre show method.
     */
    onFormPreShow: function() {
        //#ifdef iphone
        this.view.statusBarStyle  = constants.STATUS_BAR_STYLE_LIGHT_CONTENT;
        this.view.skin="sknFrmBG00A0DD";
        //#endif
        this.view.flxEmailAlert.isVisible = false;
        this.view.flxForgotPassword.isVisible = true;
        this.view.flxHeader.isVisible = true;
        this.view.txtBoxEmail.text = "";
        this.view.txtBoxEmail.setFocus(false);
      	this.view.flxLoader.isVisible = false;
      	refreshAppFlag = false;
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
        if (this.validateEmail()) {
          	var CommonUtilsManager = applicationManager.getCommonUtilsManager();
        	if(!CommonUtilsManager.isNetworkAvailable()){
           		alert(applicationManager.getConfigManager().networkErrorMsg);
          		return;
      		  }
            voltmx.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
            this.httpclient = new voltmx.net.HttpRequest();
            //#ifdef iphone
            	this.httpclient.backgroundTransfer = true;
            //#endif
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
    },

    /**
     * Forgot password Callback method.
     * @callback forgotPasswordCallback
     */
    forgotPasswordCallback: function() {
        try {
            voltmx.application.dismissLoadingScreen();
            if (this.httpclient.readyState == 4) {
                var responseContent = this.httpclient.response;
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
        //#ifdef iphone
        this.view.skin="slForm";
        this.view.statusBarStyle  = constants.STATUS_BAR_STYLE_DEFAULT;
        //#endif
      	message = message.replace(/(\r\n|\n|\r)/gm, " ");
        this.view.lblMessage.text = message;
        this.view.flxHeader.isVisible = false;
        this.view.flxEmailAlert.isVisible = true;
        this.view.forceLayout();
        this.view.flxForgotPassword.isVisible = false;
    },
  
   /**
     * on Device Back event
     * @callback onDeviceBack
     */
    onDeviceBack : function(){
     voltmx.print("on device back");
    }
});