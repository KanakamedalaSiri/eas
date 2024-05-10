define([],function(){
	var repoMapping = {
		channelattachmentsinfo  : {
			model : "EASMetaServices/channelattachmentsinfo/Model",
			config : "EASMetaServices/channelattachmentsinfo/MF_Config",
			repository : "",
		},
		nativeappchannelsinfo  : {
			model : "EASMetaServices/nativeappchannelsinfo/Model",
			config : "EASMetaServices/nativeappchannelsinfo/MF_Config",
			repository : "",
		},
		cachehandler  : {
			model : "EASMetaServices/cachehandler/Model",
			config : "EASMetaServices/cachehandler/MF_Config",
			repository : "",
		},
		nativeappinfo  : {
			model : "EASMetaServices/nativeappinfo/Model",
			config : "EASMetaServices/nativeappinfo/MF_Config",
			repository : "",
		},
		File  : {
			model : "EASDownloadBinaryService/File/Model",
			config : "EASDownloadBinaryService/File/MF_Config",
			repository : "EASDownloadBinaryService/File/Repository",
		},
	};
	
	return repoMapping;
})