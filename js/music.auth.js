// 操作认证类
angular.module('music.auth', ['restangular', 'LocalStorage', 'ipCookie', 'music.config','music.tools'])

.factory('$httpApi', ['$http', '$q', '$timeout', '$filter', '$config', '$rootScope', '$injector', '$toaster', function($http, $q, $timeout, $filter, $config, $rootScope, $injector, $toaster){
		
				var transformRequest = {
						transformRequest: getUserData,
						headers: {
								"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
								Apiclient: "MXPlay"
						}
				}
				
		        function getUserData(options){
					    var userData = {}
						if($rootScope.locals.userData){
							     var data = $rootScope.locals.userData;
								     userData.nick = data.nick;
									 userData.leaver = data.leaver
						}
						options = angular.extend({}, userData, options);
						return jQuery.param(options)
				}
				function authStatus(response, defer, config){
				        // 登录时 code为0即表示密码验证通过. 可以跳转到其它页面
				        if(response.data.code == 0){
							   return defer.resolve($q.fullResponse ? response : response.data);
						}
						if(response.data.code == '103004'){
						       var auth = $injector.get('authService');
							   $toaster.warning('登录超时,请重新登录...');
							   auth.removeAuthData();
							   window.postFlag = true;	
						}
						$config.debug && $toaster.info(response.data.message + '错误码：'+ response.data.code);
						return defer.reject(response)
				}
				
		        return {
				        get: function(){
							
						},
						post: function(url, data, options){
							  var defer = $q.defer();
							  var config = angular.extend({}, transformRequest, options);
							      window.postFlag ? console.log('postFlag....'):
								  $http.post($filter('apiUrlPrefix')(url), data, config)
								  .then(function(data){
									  
									      authStatus(data, defer, config)
								  }, function(data){
									  
									      authStatus(data, defer, config)
								  })
							  return defer.promise;
						}
				}
	}])
	
		
	.factory('authService', ['$q', 'Restangular', 'localStorageService', 'ipCookie', '$config', '$httpApi', '$state', '$timeout', '$rootScope', '$locale', function($q, Restangular, localStorageService, ipCookie, $config, $httpApi, $state, $timeout, $rootScope, $locale){
		     var auth = {},
			     session = {
					    isAuth: false,
						token: null,
						userData: null 
				 },
				 cookie = {
					    path: '/',
						expires: 0 
				 };
				
			 
			 function login(data){
				    var defer = $q.defer();
					cookie.expires = data.remember ? 365 : 0
					$httpApi.post($config.api.account.login, data)
					.then(function(data){
						
						    saveAuthData(data);
							return defer.resolve(data);
					}, function(data){
						
						    return defer.reject(data);
					})
					return defer.promise;
			 };
			 function logout(){
				    $httpApi.post($config.api.account.logout, {})
					.then(function(){
						     ipCookie.remove('authorization', cookie)
					}, function(){
						     ipCookie.remove('authorization', cookie)
						
					});
					isAuth = false;
					$state.go('access.signin');
			 };
			 function saveAuthData(data){
				    ipCookie('authorization', data.data, cookie);
					session.isAuth = true,
					session.userData = data.data
			 }
			 function fillAuthData(){
				    var authData = ipCookie('authorization');
					authData && (session.userData = authData, session.isAuth = true, session.userRole={});
					return session
			 };
			 function removeAuthData(){
				    ipCookie.remove('authorization', cookie);
					session.isAuth = false;
					$state.go('access.signin')
			 } 
		     function saveRegistration(custom){
				     Restangular.one('auth/register').customPost(custom)
					 .then(function(data){
						       saveAuthData(data);
							   return data;
					 })
			 };
			 return {
				     login: login,
					 logout: logout,
					 fillAuthData: fillAuthData,
					 saveRegistration: saveRegistration,
					 removeAuthData: removeAuthData
			 }
	}])
	
		
	.factory('AuthInterceptorService', ['$q', '$toaster', '$config', '$injector', 'ipCookie', function($q, $toaster, $config, $injector, ipCookie){
		
			 function request(intercept){
				    intercept.headers = intercept.headers || {};
					var authData = ipCookie('authorization');
					authData && (intercept.headers.Authorization = authData.token, intercept.headers.Apiclient = 'MXPlay');
					return intercept;
			 }
			 function responseError(data){
				    var tipInfo = function(){
					        if($config.debug){
							       var dialog = $injector.get('$dialogs');
								   //dialog.alert(data.data);	
							       $toaster.warning('地址有误..已被拦截')
							}else{
							       $toaster.info('网络异常...请重试')	
							}
					}
					data.status != 200 && tipInfo();
					$q.reject(data)
			 }
			 return {
				    request: request,
				    responseError: responseError
			 }
	}])
	