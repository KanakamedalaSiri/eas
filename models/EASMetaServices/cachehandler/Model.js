define([],function(){
	var BaseModel = voltmx.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "cachehandler", "objectService" : "EASMetaServices"};
	
	var setterFunctions = {
		cache_key : function(val, state){
			context["field"]  = "cache_key";
			context["metadata"] = (objectMetadata ? objectMetadata["cache_key"] : null);
			state['cache_key'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		cache_value : function(val, state){
			context["field"]  = "cache_value";
			context["metadata"] = (objectMetadata ? objectMetadata["cache_value"] : null);
			state['cache_value'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		id : function(val, state){
			context["field"]  = "id";
			context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
			state['id'] = voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
	function cachehandler(defaultValues){
		var privateState = {};
			context["field"]  = "cache_key";
			context["metadata"] = (objectMetadata ? objectMetadata["cache_key"] : null);
			privateState.cache_key = defaultValues?(defaultValues["cache_key"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cache_key"], context):null):null;
			context["field"]  = "cache_value";
			context["metadata"] = (objectMetadata ? objectMetadata["cache_value"] : null);
			privateState.cache_value = defaultValues?(defaultValues["cache_value"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cache_value"], context):null):null;
			context["field"]  = "id";
			context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
			privateState.id = defaultValues?(defaultValues["id"]?voltmx.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context):null):null;
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
				"cache_key" : {
					get : function(){
						context["field"]  = "cache_key";
			        	context["metadata"] = (objectMetadata ? objectMetadata["cache_key"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cache_key, context);},
					set : function(val){
						setterFunctions['cache_key'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"cache_value" : {
					get : function(){
						context["field"]  = "cache_value";
			        	context["metadata"] = (objectMetadata ? objectMetadata["cache_value"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cache_value, context);},
					set : function(val){
						setterFunctions['cache_value'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){
						context["field"]  = "id";
			        	context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
						return voltmx.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);},
					set : function(val){
						setterFunctions['id'].call(this,val,privateState);
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
									privateState.cache_key = value?(value["cache_key"]?value["cache_key"]:null):null;
					privateState.cache_value = value?(value["cache_value"]?value["cache_value"]:null):null;
					privateState.id = value?(value["id"]?value["id"]:null):null;
					privateState.CreatedBy = value?(value["CreatedBy"]?value["CreatedBy"]:null):null;
					privateState.LastUpdatedBy = value?(value["LastUpdatedBy"]?value["LastUpdatedBy"]:null):null;
					privateState.CreatedDateTime = value?(value["CreatedDateTime"]?value["CreatedDateTime"]:null):null;
					privateState.LastUpdatedDateTime = value?(value["LastUpdatedDateTime"]?value["LastUpdatedDateTime"]:null):null;
					privateState.SoftDeleteFlag = value?(value["SoftDeleteFlag"]?value["SoftDeleteFlag"]:null):null;
			};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(cachehandler);
	
	//Create new class level validator object
	BaseModel.Validator.call(cachehandler);
	
	var registerValidatorBackup = cachehandler.registerValidator;
	
	cachehandler.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( cachehandler.isValid(this, propName, val) ){
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
	
	cachehandler.relations = relations;
	
	cachehandler.prototype.isValid = function(){
		return cachehandler.isValid(this);
	};
	
	cachehandler.prototype.objModelName = "cachehandler";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	cachehandler.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		voltmx.mvc.util.ProcessorUtils.getMetadataForObject("EASMetaServices", "cachehandler", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	cachehandler.clone = function(objectToClone) {
		var clonedObj = new cachehandler();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return cachehandler;
});