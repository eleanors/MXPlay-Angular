// Loading
angular.module('music.filter', [])

.filter('apiUrlPrefix', ['$config', function($config){
		     return function(param){
				    return 'http://' + $config.host.www + param + '.json'
			 }
}])

.filter('httpErrorFilter', [function(){
	
        return function(value, callback){
			   _.indexOf([401, 404, 500, 502], value.status) == -1 && callback();
		}
}])