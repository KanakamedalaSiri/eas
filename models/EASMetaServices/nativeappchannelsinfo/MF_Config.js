define([],function(){
	var mappings = {
		"System_NativeChannelsInfoId" : "System_NativeChannelsInfoId",
		"System_FabricAppId" : "System_FabricAppId",
		"System_ChannelId" : "System_ChannelId",
		"System_AppVersion" : "System_AppVersion",
		"System_FabricAppName" : "System_FabricAppName",
		"System_ChannelAppDescription" : "System_ChannelAppDescription",
		"System_ChannelName" : "System_ChannelName",
		"CreatedBy" : "CreatedBy",
		"LastUpdatedBy" : "LastUpdatedBy",
		"CreatedDateTime" : "CreatedDateTime",
		"LastUpdatedDateTime" : "LastUpdatedDateTime",
		"SoftDeleteFlag" : "SoftDeleteFlag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"System_NativeChannelsInfoId" : "number",
		"System_FabricAppId" : "string",
		"System_ChannelId" : "string",
		"System_AppVersion" : "string",
		"System_FabricAppName" : "string",
		"System_ChannelAppDescription" : "string",
		"System_ChannelName" : "string",
		"CreatedBy" : "string",
		"LastUpdatedBy" : "string",
		"CreatedDateTime" : "date",
		"LastUpdatedDateTime" : "date",
		"SoftDeleteFlag" : "boolean",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"System_NativeChannelsInfoId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "EASMetaServices",
		tableName : "nativeappchannelsinfo"
	};
	Object.freeze(config);
	
	return config;
})
