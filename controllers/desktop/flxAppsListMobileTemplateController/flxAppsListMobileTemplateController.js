define({ 

 //Type your controller code here 
  onViewCreated : function(){
    if(voltmx.os.deviceInfo().screenHeight < 550){
      this.view.flxOuter.imgAppIcon.width = "60dp";
      this.view.flxOuter.imgAppIcon.height = "60dp";
    }
  }

 });