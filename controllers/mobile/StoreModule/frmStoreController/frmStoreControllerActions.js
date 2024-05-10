define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxLogout **/
    AS_FlexContainer_dceff1507c6c4e0c8d16cf96b412ceb5: function AS_FlexContainer_dceff1507c6c4e0c8d16cf96b412ceb5(eventobject) {
        var self = this;
        PREV_FORM = "";
        self.onClickOfLogout.call(this);
    },
    /** onRowClick defined for segAppsList **/
    AS_Segment_hab51f1c4c514371987a751846b97f25: function AS_Segment_hab51f1c4c514371987a751846b97f25(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.onRowClickOfSegAppsList.call(this);
    },
    /** onPull defined for segAppsList **/
    AS_Segment_c80d82aaa0344d43bb1bb0cb40a6ddb6: function AS_Segment_c80d82aaa0344d43bb1bb0cb40a6ddb6(eventobject) {
        var self = this;
        return self.onPullToRefresh.call(this);
    },
    /** init defined for frmStore **/
    AS_Form_c2c2ae6f25304bd584c6db30865a27d6: function AS_Form_c2c2ae6f25304bd584c6db30865a27d6(eventobject) {
        var self = this;
        return self.init.call(this);
    },
    /** preShow defined for frmStore **/
    AS_Form_idd8d467c9be429e9582469e729d2e76: function AS_Form_idd8d467c9be429e9582469e729d2e76(eventobject) {
        var self = this;
        var storeModule = applicationManager.getStoreModule();
        this.attachToModule(storeModule);
    },
    /** postShow defined for frmStore **/
    AS_Form_ad1615526b164b63a5af62a9b7d6a084: function AS_Form_ad1615526b164b63a5af62a9b7d6a084(eventobject) {
        var self = this;
        return self.postshow.call(this);
    },
    /** onDeviceBack defined for frmStore **/
    AS_Form_e0bfbd09bb9d4e158b9d8a5cfcf557af: function AS_Form_e0bfbd09bb9d4e158b9d8a5cfcf557af(eventobject) {
        var self = this;
        voltmx.print("on device back");
    }
});