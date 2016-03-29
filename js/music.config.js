// Loading
angular.module('music.config', ['music.service'])

	 
	 
.constant('$config', {
       	host: {
		       domain: 'localhost',
			   www: window.location.host + '/api/',
			   static: 'static.localhost',
			   api: '/api/'	
		},
		site: {
		       name: 'MXPlay'	
		},
		api: {
			   account: {
				      login: 'access/signin',
					  sendCode: 'access/sendCode',
					  checkMobile: 'access/checkMobile',
					  checkThirdLogin: 'access/checkThirdLogin',
					  logout: 'access/signup'   
			   },
		       music: {
			          list: 'music/list',
					  category: 'music/category',
					  recommend: 'music/recommend'
			   },
		       ablum: {
			          list: 'ablum/list',
					  category: 'ablum/category',
					  recommend: 'ablum/recommend'
			   }
		},
		debug: false
})
 
 .run(['$rootScope', "$state", "$stateParams", '$pageTitle', '$config', '$injector', '$toaster', '$locale', 'Restangular', 'authService', function($rootScope, $state, $stateParams, $pageTitle, $config, $injector, $toaster, $locale, Restangular, authService){
	 
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.$config = $config;
		$rootScope.toasterOptions = {
			'position-class': 'toast-top-center',
			'time-out': 4e3,
			'limit': 1
		}
	    $rootScope.$on('$stateChangeStart', function(){
		   
	    });
	    $rootScope.locals = authService.fillAuthData()	
		
		//console.log()
 }])
 
.config(['RestangularProvider', '$config', function(RestangularProvider, config){
	
	    RestangularProvider.setBaseUrl(config.host.api)
}])

.config(['RestangularProvider', '$httpProvider', '$pageTitleProvider', '$config', function(RestangularProvider, httpProvider, pageTitleProvider, config){
	 
		 RestangularProvider.setBaseUrl(config.host.api);
		 
		 httpProvider.interceptors.push('AuthInterceptorService');
		 pageTitleProvider.setDefault('MXPlay');
		 
 }])












