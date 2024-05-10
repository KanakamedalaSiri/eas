define([],function(){
	var mappings = {
		"System_ChannelAttachmentsId" : "System_ChannelAttachmentsId",
		"System_ChannelReference" : "System_ChannelReference",
		"System_AttachmentType" : "System_AttachmentType",
		"System_AttachmentName" : "System_AttachmentName",
		"System_DownloadLink" : "System_DownloadLink",
		"System_UploadState" : "System_UploadState",
		"CreatedBy" : "CreatedBy",
		"LastUpdatedBy" : "LastUpdatedBy",
		"CreatedDateTime" : "CreatedDateTime",
		"LastUpdatedDateTime" : "LastUpdatedDateTime",
		"SoftDeleteFlag" : "SoftDeleteFlag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"System_ChannelAttachmentsId" : "number",
		"System_ChannelReference" : "number",
		"System_AttachmentType" : "string",
		"System_AttachmentName" : "string",
		"System_DownloadLink" : "string",
		"System_UploadState" : "string",
		"CreatedBy" : "string",
		"LastUpdatedBy" : "string",
		"CreatedDateTime" : "date",
		"LastUpdatedDateTime" : "date",
		"SoftDeleteFlag" : "boolean",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"System_ChannelAttachmentsId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "EASMetaServices",
		tableName : "channelattachmentsinfo"
	};
	Object.freeze(config);
	
	return config;
})
