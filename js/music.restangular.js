// Loading
angular.module('music.rest', ['restangular', 'music.config'])

	 .config(['RestangularProvider', '$httpProvider', '$config', '$pageTitleProvider', function(RestangularProvider, httpProvider, config, pageTitleProvider){
		 
		     RestangularProvider.setBaseUrl(config.host.api)
			 !function authIntercept(){
				     httpProvider.interceptors.push('authInterceptorService') ;
					 pageTitleProvider.setDefault = 'MXPlay';
			 }()
	 }])
	 
	 
	 
	 
	 .run(['$rootScope', "$state", "$stateParams", '$pageTitle', '$config', '$injector', '$toaster', '$locale', 'Restangular', 'authService', 'toasterConfig', function($rootScope, $state, $stateParams, $pageTitle, $config, $injector, $toaster, $locale, Restangular, authService, toasterConfig){
		 
		    $rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			$rootScope.$config = $config;
			$rootScope.toasterOptions = {
                "position-class": "toast-top-center",
                "time-out": 40e3
            }
			$pageTitle.set()
			
			!function fillAuthData(){
			       $rootScope.$on('$stateChangeStart', function(){
					   
				   });
				   $rootScope.locals = authService.fillAuthData()	
			}()
			
		    //console.log()
	 }])
	 