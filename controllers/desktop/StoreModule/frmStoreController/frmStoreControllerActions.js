define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxLogout **/
    AS_FlexContainer_gd7a8e5bb4794d5f9a687dbe6c91217f: function AS_FlexContainer_gd7a8e5bb4794d5f9a687dbe6c91217f(eventobject) {
        var self = this;
        applicationManager.removeItem("USER_CRED");
        PREV_FORM = "";
        self.onClickOfLogout.call(this);
    },
    /** onRowClick defined for segAppsList **/
    AS_Segment_a5a234c94df044249c8ff3c1e2bebe3b: function AS_Segment_a5a234c94df044249c8ff3c1e2bebe3b(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.onRowClickOfSegAppsList.call(this, null, null);
    },
    /** init defined for frmStore **/
    AS_Form_h565abe3a4b44b7e88e6364eb0a8d47c: function AS_Form_h565abe3a4b44b7e88e6364eb0a8d47c(eventobject) {
        var self = this;
        return self.init.call(this);
    },
    /** preShow defined for frmStore **/
    AS_Form_i446fc229f9449e3a1b3a46eef492501: function AS_Form_i446fc229f9449e3a1b3a46eef492501(eventobject) {
        var self = this;
        var storeModule = applicationManager.getStoreModule();
        this.attachToModule(storeModule);
        this.view.flxAppsList.height = (screenHeight - 50) + "dp";
    },
    /** postShow defined for frmStore **/
    AS_Form_a5cb525d203b4ebf9e58321e8ffd7261: function AS_Form_a5cb525d203b4ebf9e58321e8ffd7261(eventobject) {
        var self = this;
        return self.postshow.call(this);
    },
    /** onDeviceBack defined for frmStore **/
    AS_Form_b3700e3cb45e4a52972bafca06315e8d: function AS_Form_b3700e3cb45e4a52972bafca06315e8d(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});