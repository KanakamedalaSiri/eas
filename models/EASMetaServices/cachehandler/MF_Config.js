define([],function(){
	var mappings = {
		"cache_key" : "cache_key",
		"cache_value" : "cache_value",
		"id" : "id",
		"CreatedBy" : "CreatedBy",
		"LastUpdatedBy" : "LastUpdatedBy",
		"CreatedDateTime" : "CreatedDateTime",
		"LastUpdatedDateTime" : "LastUpdatedDateTime",
		"SoftDeleteFlag" : "SoftDeleteFlag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"cache_key" : "string",
		"cache_value" : "string",
		"id" : "number",
		"CreatedBy" : "string",
		"LastUpdatedBy" : "string",
		"CreatedDateTime" : "date",
		"LastUpdatedDateTime" : "date",
		"SoftDeleteFlag" : "boolean",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "EASMetaServices",
		tableName : "cachehandler"
	};
	Object.freeze(config);
	
	return config;
})
