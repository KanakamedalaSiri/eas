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
        this.view.flxEmailAlert.isVisible = false;
        this.view.flxForgotPassword.isVisible = true;
        this.view.flxHeader.isVisible = true;
        this.view.txtBoxEmail.text = "";
        this.view.txtBoxEmail.setFocus(false);
      	this.view.flxLoader.isVisible = false;
      	refreshAppFlag = false;
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
          	
            this.view.flxLoader.isVisible = true;
			refreshAppFlag = true;
          	this.httpclient = new voltmx.net.HttpRequest();
            //#ifdef ipad
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
            this.view.flxLoader.isVisible = false;
          	refreshAppFlag = false;
            if (this.httpclient.readyState == 4) {
                var responseContent = this.httpclient.response;
                this.showEmailALert(responseContent.message);
            }
        } catch (err) {
            voltmx.print("exception is :: " + err);
            this.view.flxLoader.isVisible = false;
            refreshAppFlag = false;
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
  
    /*
     * This method sets focus skin for given widget
     * @param{String,String,String}Widget,focusskin,place holder skin.
     */
  	setFocusSkins: function(widget, focusSkin, placeHolderSkin){
       var text = widget.text;
       if( text === null || text.length === 0)     
  			widget.focusSkin = placeHolderSkin;
        else if(widget.focusSkin !== focusSkin)
          widget.focusSkin = focusSkin;
        
    },
});