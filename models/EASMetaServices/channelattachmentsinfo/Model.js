define([],function(){
	var BaseModel = voltmx.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "channelattachmentsinfo", "objectService" : "EASMetaServices"};
	
	var setterFunctions = {
		System_ChannelAttachmentsId : function(val, state){
			context["field"]  = "System_ChannelAttachmentsId";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelAttachmentsId"] : null);
			state['System_ChannelAttachmentsId'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_ChannelReference : function(val, state){
			context["field"]  = "System_ChannelReference";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelReference"] : null);
			state['System_ChannelReference'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_AttachmentType : function(val, state){
			context["field"]  = "System_AttachmentType";
			context["metadata"] = (objectMetadata ? objectMetadata["System_AttachmentType"] : null);
			state['System_AttachmentType'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_AttachmentName : function(val, state){
			context["field"]  = "System_AttachmentName";
			context["metadata"] = (objectMetadata ? objectMetadata["System_AttachmentName"] : null);
			state['System_AttachmentName'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_DownloadLink : function(val, state){
			context["field"]  = "System_DownloadLink";
			context["metadata"] = (objectMetadata ? objectMetadata["System_DownloadLink"] : null);
			state['System_DownloadLink'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		System_UploadState : function(val, state){
			context["field"]  = "System_UploadState";
			context["metadata"] = (objectMetadata ? objectMetadata["System_UploadState"] : null);
			state['System_UploadState'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
	function channelattachmentsinfo(defaultValues){
		var privateState = {};
			context["field"]  = "System_ChannelAttachmentsId";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelAttachmentsId"] : null);
			privateState.System_ChannelAttachmentsId = defaultValues?(defaultValues["System_ChannelAttachmentsId"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_ChannelAttachmentsId"], context):null):null;
			context["field"]  = "System_ChannelReference";
			context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelReference"] : null);
			privateState.System_ChannelReference = defaultValues?(defaultValues["System_ChannelReference"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_ChannelReference"], context):null):null;
			context["field"]  = "System_AttachmentType";
			context["metadata"] = (objectMetadata ? objectMetadata["System_AttachmentType"] : null);
			privateState.System_AttachmentType = defaultValues?(defaultValues["System_AttachmentType"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_AttachmentType"], context):null):null;
			context["field"]  = "System_AttachmentName";
			context["metadata"] = (objectMetadata ? objectMetadata["System_AttachmentName"] : null);
			privateState.System_AttachmentName = defaultValues?(defaultValues["System_AttachmentName"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_AttachmentName"], context):null):null;
			context["field"]  = "System_DownloadLink";
			context["metadata"] = (objectMetadata ? objectMetadata["System_DownloadLink"] : null);
			privateState.System_DownloadLink = defaultValues?(defaultValues["System_DownloadLink"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_DownloadLink"], context):null):null;
			context["field"]  = "System_UploadState";
			context["metadata"] = (objectMetadata ? objectMetadata["System_UploadState"] : null);
			privateState.System_UploadState = defaultValues?(defaultValues["System_UploadState"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["System_UploadState"], context):null):null;
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
				"System_ChannelAttachmentsId" : {
					get : function(){
						context["field"]  = "System_ChannelAttachmentsId";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelAttachmentsId"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_ChannelAttachmentsId, context);},
					set : function(val){
						setterFunctions['System_ChannelAttachmentsId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_ChannelReference" : {
					get : function(){
						context["field"]  = "System_ChannelReference";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_ChannelReference"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_ChannelReference, context);},
					set : function(val){
						setterFunctions['System_ChannelReference'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_AttachmentType" : {
					get : function(){
						context["field"]  = "System_AttachmentType";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_AttachmentType"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_AttachmentType, context);},
					set : function(val){
						setterFunctions['System_AttachmentType'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_AttachmentName" : {
					get : function(){
						context["field"]  = "System_AttachmentName";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_AttachmentName"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_AttachmentName, context);},
					set : function(val){
						setterFunctions['System_AttachmentName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_DownloadLink" : {
					get : function(){
						context["field"]  = "System_DownloadLink";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_DownloadLink"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_DownloadLink, context);},
					set : function(val){
						setterFunctions['System_DownloadLink'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"System_UploadState" : {
					get : function(){
						context["field"]  = "System_UploadState";
			        	context["metadata"] = (objectMetadata ? objectMetadata["System_UploadState"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.System_UploadState, context);},
					set : function(val){
						setterFunctions['System_UploadState'].call(this,val,privateState);
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
									privateState.System_ChannelAttachmentsId = value?(value["System_ChannelAttachmentsId"]?value["System_ChannelAttachmentsId"]:null):null;
					privateState.System_ChannelReference = value?(value["System_ChannelReference"]?value["System_ChannelReference"]:null):null;
					privateState.System_AttachmentType = value?(value["System_AttachmentType"]?value["System_AttachmentType"]:null):null;
					privateState.System_AttachmentName = value?(value["System_AttachmentName"]?value["System_AttachmentName"]:null):null;
					privateState.System_DownloadLink = value?(value["System_DownloadLink"]?value["System_DownloadLink"]:null):null;
					privateState.System_UploadState = value?(value["System_UploadState"]?value["System_UploadState"]:null):null;
					privateState.CreatedBy = value?(value["CreatedBy"]?value["CreatedBy"]:null):null;
					privateState.LastUpdatedBy = value?(value["LastUpdatedBy"]?value["LastUpdatedBy"]:null):null;
					privateState.CreatedDateTime = value?(value["CreatedDateTime"]?value["CreatedDateTime"]:null):null;
					privateState.LastUpdatedDateTime = value?(value["LastUpdatedDateTime"]?value["LastUpdatedDateTime"]:null):null;
					privateState.SoftDeleteFlag = value?(value["SoftDeleteFlag"]?value["SoftDeleteFlag"]:null):null;
			};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(channelattachmentsinfo);
	
	//Create new class level validator object
	BaseModel.Validator.call(channelattachmentsinfo);
	
	var registerValidatorBackup = channelattachmentsinfo.registerValidator;
	
	channelattachmentsinfo.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( channelattachmentsinfo.isValid(this, propName, val) ){
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
	];
	
	channelattachmentsinfo.relations = relations;
	
	channelattachmentsinfo.prototype.isValid = function(){
		return channelattachmentsinfo.isValid(this);
	};
	
	channelattachmentsinfo.prototype.objModelName = "channelattachmentsinfo";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	channelattachmentsinfo.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		voltmx.mvc.util.ProcessorUtils.getMetadataForObject("EASMetaServices", "channelattachmentsinfo", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	channelattachmentsinfo.clone = function(objectToClone) {
		var clonedObj = new channelattachmentsinfo();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return channelattachmentsinfo;
});