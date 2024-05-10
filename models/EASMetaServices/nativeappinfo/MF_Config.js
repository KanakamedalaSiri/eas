define([],function(){
	var mappings = {
		"System_FabricAppId" : "System_FabricAppId",
		"CreatedBy" : "CreatedBy",
		"LastUpdatedBy" : "LastUpdatedBy",
		"CreatedDateTime" : "CreatedDateTime",
		"LastUpdatedDateTime" : "LastUpdatedDateTime",
		"SoftDeleteFlag" : "SoftDeleteFlag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"System_FabricAppId" : "string",
		"CreatedBy" : "string",
		"LastUpdatedBy" : "string",
		"CreatedDateTime" : "date",
		"LastUpdatedDateTime" : "date",
		"SoftDeleteFlag" : "boolean",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"System_FabricAppId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "EASMetaServices",
		tableName : "nativeappinfo"
	};
	Object.freeze(config);
	
	return config;
})
