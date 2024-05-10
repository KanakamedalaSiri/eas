define([],function(){
	var BaseModel = voltmx.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "nativeappchannelsinfo", "objectService" : "EASMetaServices"};
	
	var setterFunctions = {
		System_NativeChannelsInfoId : function(val, state){
			context["field"]  = "System_NativeChannelsInfoId";
			context["metadata"] = (objectMetadata ? objectMetadata["System_NativeChannelsInfoId"] : null);
			state['System_NativeChannelsInfoId'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_FabricAppId : function(val, state){
			context["field"]  = "System_FabricAppId";
			context["metadata"] = (objectMetadata ? objectMetadata["System_FabricAppId"] : null);
			state['System_FabricAppId'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_ChannelId : function(val, state){
			context["field"]  = "System_ChannelId";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelId"] : null);
			state['System_ChannelId'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_AppVersion : function(val, state){
			context["field"]  = "System_AppVersion";
			context["metadata"] = (objectMetadata ? objectMetadata["System_AppVersion"] : null);
			state['System_AppVersion'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_FabricAppName : function(val, state){
			context["field"]  = "System_FabricAppName";
			context["metadata"] = (objectMetadata ? objectMetadata["System_FabricAppName"] : null);
			state['System_FabricAppName'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_ChannelAppDescription : function(val, state){
			context["field"]  = "System_ChannelAppDescription";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelAppDescription"] : null);
			state['System_ChannelAppDescription'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_ChannelName : function(val, state){
			context["field"]  = "System_ChannelName";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelName"] : null);
			state['System_ChannelName'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		CreatedBy : function(val, state){
			context["field"]  = "CreatedBy";
			context["metadata"] = (objectMetadata ? objectMetadata["CreatedBy"] : null);
			state['CreatedBy'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		LastUpdatedBy : function(val, state){
			context["field"]  = "LastUpdatedBy";
			context["metadata"] = (objectMetadata ? objectMetadata["LastUpdatedBy"] : null);
			state['LastUpdatedBy'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		CreatedDateTime : function(val, state){
			context["field"]  = "CreatedDateTime";
			context["metadata"] = (objectMetadata ? objectMetadata["CreatedDateTime"] : null);
			state['CreatedDateTime'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		LastUpdatedDateTime : function(val, state){
			context["field"]  = "LastUpdatedDateTime";
			context["metadata"] = (objectMetadata ? objectMetadata["LastUpdatedDateTime"] : null);
			state['LastUpdatedDateTime'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		SoftDeleteFlag : function(val, state){
			context["field"]  = "SoftDeleteFlag";
			context["metadata"] = (objectMetadata ? objectMetadata["SoftDeleteFlag"] : null);
			state['SoftDeleteFlag'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
	};
	
	
	//Create the Model Class
	function nativeappchannelsinfo(defaultValues){
		var privateState = {};
			context["field"]  = "System_NativeChannelsInfoId";
			context["metadata"] = (objectMetadata ? objectMetadata["System_NativeChannelsInfoId"] : null);
			privateState.System_NativeChannelsInfoId = defaultValues?(defaultValues["System_NativeChannelsInfoId"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_NativeChannelsInfoId"], context):null):null;
			context["field"]  = "System_FabricAppId";
			context["metadata"] = (objectMetadata ? objectMetadata["System_FabricAppId"] : null);
			privateState.System_FabricAppId = defaultValues?(defaultValues["System_FabricAppId"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_FabricAppId"], context):null):null;
			context["field"]  = "System_ChannelId";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelId"] : null);
			privateState.System_ChannelId = defaultValues?(defaultValues["System_ChannelId"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_ChannelId"], context):null):null;
			context["field"]  = "System_AppVersion";
			context["metadata"] = (objectMetadata ? objectMetadata["System_AppVersion"] : null);
			privateState.System_AppVersion = defaultValues?(defaultValues["System_AppVersion"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_AppVersion"], context):null):null;
			context["field"]  = "System_FabricAppName";
			context["metadata"] = (objectMetadata ? objectMetadata["System_FabricAppName"] : null);
			privateState.System_FabricAppName = defaultValues?(defaultValues["System_FabricAppName"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_FabricAppName"], context):null):null;
			context["field"]  = "System_ChannelAppDescription";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelAppDescription"] : null);
			privateState.System_ChannelAppDescription = defaultValues?(defaultValues["System_ChannelAppDescription"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_ChannelAppDescription"], context):null):null;
			context["field"]  = "System_ChannelName";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelName"] : null);
			privateState.System_ChannelName = defaultValues?(defaultValues["System_ChannelName"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_ChannelName"], context):null):null;
			context["field"]  = "CreatedBy";
			context["metadata"] = (objectMetadata ? objectMetadata["CreatedBy"] : null);
			privateState.CreatedBy = defaultValues?(defaultValues["CreatedBy"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreatedBy"], context):null):null;
			context["field"]  = "LastUpdatedBy";
			context["metadata"] = (objectMetadata ? objectMetadata["LastUpdatedBy"] : null);
			privateState.LastUpdatedBy = defaultValues?(defaultValues["LastUpdatedBy"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LastUpdatedBy"], context):null):null;
			context["field"]  = "CreatedDateTime";
			context["metadata"] = (objectMetadata ? objectMetadata["CreatedDateTime"] : null);
			privateState.CreatedDateTime = defaultValues?(defaultValues["CreatedDateTime"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreatedDateTime"], context):null):null;
			context["field"]  = "LastUpdatedDateTime";
			context["metadata"] = (objectMetadata ? objectMetadata["LastUpdatedDateTime"] : null);
			privateState.LastUpdatedDateTime = defaultValues?(defaultValues["LastUpdatedDateTime"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LastUpdatedDateTime"], context):null):null;
			context["field"]  = "SoftDeleteFlag";
			context["metadata"] = (objectMetadata ? objectMetadata["SoftDeleteFlag"] : null);
			privateState.SoftDeleteFlag = defaultValues?(defaultValues["SoftDeleteFlag"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SoftDeleteFlag"], context):null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"System_NativeChannelsInfoId" : {
					get : function(){
						context["field"]  = "System_NativeChannelsInfoId";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_NativeChannelsInfoId"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_NativeChannelsInfoId, context);},
					set : function(val){
						setterFunctions['System_NativeChannelsInfoId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_FabricAppId" : {
					get : function(){
						context["field"]  = "System_FabricAppId";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_FabricAppId"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_FabricAppId, context);},
					set : function(val){
						setterFunctions['System_FabricAppId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_ChannelId" : {
					get : function(){
						context["field"]  = "System_ChannelId";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelId"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_ChannelId, context);},
					set : function(val){
						setterFunctions['System_ChannelId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_AppVersion" : {
					get : function(){
						context["field"]  = "System_AppVersion";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_AppVersion"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_AppVersion, context);},
					set : function(val){
						setterFunctions['System_AppVersion'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_FabricAppName" : {
					get : function(){
						context["field"]  = "System_FabricAppName";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_FabricAppName"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_FabricAppName, context);},
					set : function(val){
						setterFunctions['System_FabricAppName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_ChannelAppDescription" : {
					get : function(){
						context["field"]  = "System_ChannelAppDescription";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelAppDescription"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_ChannelAppDescription, context);},
					set : function(val){
						setterFunctions['System_ChannelAppDescription'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_ChannelName" : {
					get : function(){
						context["field"]  = "System_ChannelName";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelName"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_ChannelName, context);},
					set : function(val){
						setterFunctions['System_ChannelName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CreatedBy" : {
					get : function(){
						context["field"]  = "CreatedBy";
			        	context["metadata"] = (objectMetadata ? objectMetadata["CreatedBy"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CreatedBy, context);},
					set : function(val){
						setterFunctions['CreatedBy'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LastUpdatedBy" : {
					get : function(){
						context["field"]  = "LastUpdatedBy";
			        	context["metadata"] = (objectMetadata ? objectMetadata["LastUpdatedBy"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.LastUpdatedBy, context);},
					set : function(val){
						setterFunctions['LastUpdatedBy'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CreatedDateTime" : {
					get : function(){
						context["field"]  = "CreatedDateTime";
			        	context["metadata"] = (objectMetadata ? objectMetadata["CreatedDateTime"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CreatedDateTime, context);},
					set : function(val){
						setterFunctions['CreatedDateTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LastUpdatedDateTime" : {
					get : function(){
						context["field"]  = "LastUpdatedDateTime";
			        	context["metadata"] = (objectMetadata ? objectMetadata["LastUpdatedDateTime"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.LastUpdatedDateTime, context);},
					set : function(val){
						setterFunctions['LastUpdatedDateTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"SoftDeleteFlag" : {
					get : function(){
						context["field"]  = "SoftDeleteFlag";
			        	context["metadata"] = (objectMetadata ? objectMetadata["SoftDeleteFlag"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SoftDeleteFlag, context);},
					set : function(val){
						setterFunctions['SoftDeleteFlag'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});
			
			//converts model object to json object.
			this.toJsonInternal = function() {
				return Object.assign({}, privateState);
			};

			//overwrites object state with provided json value in argument.
			this.fromJsonInternal = function(value) {
									privateState.System_NativeChannelsInfoId = value?(value["System_NativeChannelsInfoId"]?value["System_NativeChannelsInfoId"]:null):null;
					privateState.System_FabricAppId = value?(value["System_FabricAppId"]?value["System_FabricAppId"]:null):null;
					privateState.System_ChannelId = value?(value["System_ChannelId"]?value["System_ChannelId"]:null):null;
					privateState.System_AppVersion = value?(value["System_AppVersion"]?value["System_AppVersion"]:null):null;
					privateState.System_FabricAppName = value?(value["System_FabricAppName"]?value["System_FabricAppName"]:null):null;
					privateState.System_ChannelAppDescription = value?(value["System_ChannelAppDescription"]?value["System_ChannelAppDescription"]:null):null;
					privateState.System_ChannelName = value?(value["System_ChannelName"]?value["System_ChannelName"]:null):null;
					privateState.CreatedBy = value?(value["CreatedBy"]?value["CreatedBy"]:null):null;
					privateState.LastUpdatedBy = value?(value["LastUpdatedBy"]?value["LastUpdatedBy"]:null):null;
					privateState.CreatedDateTime = value?(value["CreatedDateTime"]?value["CreatedDateTime"]:null):null;
					privateState.LastUpdatedDateTime = value?(value["LastUpdatedDateTime"]?value["LastUpdatedDateTime"]:null):null;
					privateState.SoftDeleteFlag = value?(value["SoftDeleteFlag"]?value["SoftDeleteFlag"]:null):null;
			};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(nativeappchannelsinfo);
	
	//Create new class level validator object
	BaseModel.Validator.call(nativeappchannelsinfo);
	
	var registerValidatorBackup = nativeappchannelsinfo.registerValidator;
	
	nativeappchannelsinfo.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( nativeappchannelsinfo.isValid(this, propName, val) ){
					return setterBackup.apply(null, arguments);
				}else{
					throw Error("Validation failed for "+ propName +" : "+val);
				}
			}
			setterFunctions[arguments[0]].changed = true;
		}
		return registerValidatorBackup.apply(null, arguments);
	}
	
	//Extending Model for custom operations
	
	var relations = [
				{
					name : "nativeappchannelsinfo_channelattachmentsinfo",
					targetObject : "channelattachmentsinfo",
					type : "OneToMany",
					cascade : "false",
					relationFields : [
						{
							sourceField : "System_NativeChannelsInfoId",
							targetField : "System_ChannelReference"
						},
					]
				},
	];
	
	nativeappchannelsinfo.relations = relations;
	
	nativeappchannelsinfo.prototype.isValid = function(){
		return nativeappchannelsinfo.isValid(this);
	};
	
	nativeappchannelsinfo.prototype.objModelName = "nativeappchannelsinfo";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	nativeappchannelsinfo.registerProcessors = function(options, successCallback, failureCallback) {
	
		if(!options) {
			options = {};
		}
			
		if(options && ((options["preProcessor"] && typeof(options["preProcessor"]) === "function") || !options["preProcessor"])) {
			preProcessorCallback = options["preProcessor"];
		}
		
		if(options && ((options["postProcessor"] && typeof(options["postProcessor"]) === "function") || !options["postProcessor"])){
			postProcessorCallback = options["postProcessor"];
		}
		
		function metaDataSuccess(res) {
			objectMetadata = voltmx.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
			successCallback();
		}
		
		function metaDataFailure(err) {
			failureCallback(err);
		}
		
		voltmx.mvc.util.ProcessorUtils.getMetadataForObject("EASMetaServices", "nativeappchannelsinfo", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	nativeappchannelsinfo.clone = function(objectToClone) {
		var clonedObj = new nativeappchannelsinfo();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return nativeappchannelsinfo;
});