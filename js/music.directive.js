// Loading
angular.module('music.directive', [])

.directive('formValidator', ['$timeout', function($timeout){
		 return {
				restruct: 'A',
				scope: {
					   formvalidatorconfig: '=',
					   formvalidatorapi: '='
				},
				link: function(scope, element, attrs){
					   scope.$watch('formvalidatorconfig', function(value){
							   var initialize = {
									 
									  errorClass: 'help-block error',
									  
									  submitHandler: function(){}   
							   },
							   data = jQuery.extend(true, initialize, value);
							   element.validate(data)
					   }, true)
					   scope.formvalidatorapi && (
							   scope.formvalidatorapi = {
									   validate : function(){
											  element.validate().form;
									   },
									   valid: function(){
											  return element.valid()
									   }											   
							   }
					   )
				}
		 }
}])
	
.directive('btnLoading', function(){
         return {
			     restruct: 'AE',
				 scope: {
					   loadingText: '@',
					   btnLoading: '=',
					   ifDisabled: '=?' 
				 },
				 link: function(scope, element, attrs){
					   var text = element.html();
					   scope.$watch('btnLoading', function(value){
						        if(angular.isUndefined(value)) return;
								if(scope.ifDisabled = angular.isUndefined(scope.ifDisabled)){
									
									   return true;
								}else{
									 
									   if(scope.ifDisabled){
										      element.prop('disabled', value);
									   }else if(scope.loadingText=='@'){
										      scope.loadingText = '<i></i>';
									   }else{
										      element.html(value ? scope.loadingText || 'loading...' : text)   
									   }
								}
					   })
				 }
		 }
})	
	
.directive('loadingContainer', ['$rootScope', '$parse', function($rootScope, $parse){
	     return {
			    restruct: 'AE',
				scope: false,
				link: function(scope, element, attrs){
					  var mask = $parse(attrs.overly || 'true')(scope);
					  var loading = angular.element('<div class="loading"></div>');
					  loading.css({
						     width: '100%',
							 height: '100%',
							 background: '#0af',
							 opacity: 0.6,
							 position: 'absolute',
							 left: 0,
							 top: 0
					  })
					  mask && (element.append(loading), element.addClass('loading-container'));
					  scope.$watch(attrs.loadingContainer, function(value){
						     //mask && loading.toggleClass('ng-hide', !value) 
							 $rootScope.loading_done = !value 
					  })
				}
		 }
}])