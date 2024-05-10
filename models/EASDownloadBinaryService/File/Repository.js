define([],function(){
	var BaseRepository = voltmx.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function FileRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	FileRepository.prototype = Object.create(BaseRepository.prototype);
	FileRepository.prototype.constructor = FileRepository;

	//For Operation 'getBinary' with service id 'queryBinaryFile9396'
	FileRepository.prototype.getBinary = function(params,onCompletion){
		return FileRepository.prototype.customVerb('getBinary',params, onCompletion);
	};
	
	
	return FileRepository;
})