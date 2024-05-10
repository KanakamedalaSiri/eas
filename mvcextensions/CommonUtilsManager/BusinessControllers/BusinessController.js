define([], function() {

    var currentScope;
    function commonUtilsManager() {
        var HashTable = require("HashTable");
        this.hashTable = new HashTable();
        currentScope = this;
    }

    inheritsFrom(commonUtilsManager, voltmx.mvc.Business.Delegator);

    commonUtilsManager.prototype.initializeBusinessController = function() {

    };

    /**
     * set value in hash table by passing Key-value pair
     */
    commonUtilsManager.prototype.setCustomData = function(key, value) {
        this.hashTable.setItem(key, value);
    };

    /**
     * Get stored value from the hash table by passing Key
     */
    commonUtilsManager.prototype.getCustomData = function(key) {
        return this.hashTable.getItem(key);
    };

    /**
     * Navigate to any form by passing form name & data as arguments
     */
    commonUtilsManager.prototype.navigateTo = function(formName, data) {
        var navObj = new voltmx.mvc.Navigation(formName);
        navObj.navigate(data);
    };
  
    /**
     * Get server url from appConfig
     * @returns {String} - server url to which app is connected
     */
    commonUtilsManager.prototype.getServerUrl = function() {
        var appProp = applicationManager.getItem("APP_CONFIG");
        var finalUrl = "";
        if (!(appProp && appProp.svcDoc && appProp.svcDoc.Webapp)) {
            var serverUrl = appProp.svcDoc.reportingsvc.session;
            var temp = serverUrl.split("//");
            var Url = temp[temp.length - 1].split("/");
            finalUrl = temp[0] + "//" + Url[0];
        } else {
            var  url = appProp.svcDoc.Webapp.url;
            var tmp = url.split("//");
            var WebUrl = tmp[tmp.length - 1].split("/");
            finalUrl = tmp[0] + "//" + WebUrl[0];
           
        }
        return finalUrl;
    };

    /**
     * Get base64 string by passing rawbytes as arguments
     * @returns base64 string
     */
    commonUtilsManager.prototype.getBase64 = function(data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = "",
            tmp_arr = [];

        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++) & 0xff;
            o2 = data.charCodeAt(i++) & 0xff;
            o3 = data.charCodeAt(i++) & 0xff;

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        enc = tmp_arr.join('');

        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + '==';
                break;
            case 2:
                enc = enc.slice(0, -1) + '=';
                break;
        }

        return enc;
    };
  
    commonUtilsManager.prototype.isNetworkAvailable = function(){
      return voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
    };
    
    return commonUtilsManager;

});