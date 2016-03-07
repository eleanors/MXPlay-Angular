// Loading
angular.module('music.tools', ['toaster'])

.factory('$toaster', ['toaster', function(toaster){
			 return {
					 success: function(title, timeout, bodyOutputType, clickHandler){
							toaster.pop('success', '', title, timeout)
					 },
					 error: function(title, timeout, bodyOutputType, clickHandler){
							toaster.pop('error', '', title, timeout)
					 },
					 info: function(title, timeout, bodyOutputType, clickHandler){
							toaster.pop('info', '', title, timeout)
					 },
					 wait: function(title, timeout, bodyOutputType, clickHandler){
							toaster.pop('wait', '', title, timeout)
					 },
					 warning: function(title, timeout, bodyOutputType, clickHandler){
							toaster.pop('warning', '', title, timeout)
					 },
					 clear: function(){
							toaster.clear(); 
					 }
			 }
}])


.provider('dialogs', function(){
			this.$get = [function(){
				   return {
						   alert: function(){},
						   notify: function(){}   
				   }
			}]
})

.factory('$dialogs', ['dialogs', function(dialogs){
			return {
				   alert: function(){
					   
				   },
				   confim: function(){
					   
				   },
				   wait: function(){
					   
				   },
				   create: function(){
					   
				   }
			}
}])