// 登录注册类
angular.module('music.access', ['ipCookie', 'music.auth', 'music.service', 'music.tools', 'music.config'])

.factory('accessService', ['$http', '$q', '$config', '$dialogs', function($http, $q, $config, $dialogs){
		    return {
			       restPasswordDialog: function(){
					   
				   },
				   sendCode: function(){
					   
				   },
				   restPassword: function(){
					   
				   }
			}
}])
	
.controller('signinCtrl', ['$scope', '$rootScope', '$httpApi', '$config', '$state', '$toaster', 'authService', 'accessService', 'ipCookie', function($scope, $rootScope, $httpApi, $config, $state, $toaster, authService, accessService, ipCookie){
		 window.postFlag = false;
		 $scope.$on('$destroy', function(){
				 $rootScope.loginPage = false; 
		 })
		 $scope.restPassword = function(){
			 
		 };
		 $scope.psdisabled = true;
		 $scope.$watch('loginData.mobile', function(value){
					if(value && value.length == 11){
						
							$scope.mobileLoading = true,
							$httpApi.post($config.api.account.checkMobile, {
									mobile: value,
									is_seed: true	
							})
							.then(function(reponse){
									$scope.mobileLoading = false;
									if(angular.isDefined(reponse.password)){
											 $scope.psdisabled = false;
											 $scope.accountData = reponse;
									}else{
											 $toaster.info('没有找到该用户....');
											 $scope.psdisabled = true
									}
							 }, 
							 function(){
									$toaster.info('没有找到该用户....');
									$scope.psdisabled = true;
							 }).finally(function() {
									t.mobileLoading = false;
							 })
					} 
		 })
		 $scope.eventformvalidate = {
				  submitHandler : function(){
						 $scope.$apply(function(){
								 $scope.loginloading = true;
								 var loginPageInfo = {
										 mobile: $('#mobile').val(),
										 password: $('#password').val(),
										 remember: $scope.loginData.remember || false
								 },
								 loginValidateInfo = angular.extend({}, loginPageInfo, {
										 mode: 'login',
										 encrypted_password: $scope.accountData.password
								 });
								 //console.log(loginValidateInfo)
								 authService.login(loginValidateInfo)
								 .then(function(){
										
									    $toaster.info('登录成功....');
										$state.go('app.music.view');
								 }, function(){
										
										$toaster.info('账号或密码有误....')
								 })
								 .then(function(){
										$scope.loginloading = false; 
								 })								 
						 })  
				  }
		 }
}])

.controller('signupCtrl', ['$scope', '$rootScope', '$state', '$toaster', 'authService', 'httpErrorFilter', function($scope, $rootScope, $state, $toaster, authService, httpErrorFilter){console.log(66);
	   $rootScope.loginPage = true;
	   $scope.$on('$destroy', function(){
		      $rootScope.loginPage = true;
	   });
	   $scope.signup = function(){
		      $scope.signuploading = true;
			  authService.saveRegistration()
			  .then(function(){
				     $state.go('app.home')
			  }, function(data){
				     httpErrorFilter(data, function(){
						    $toaster.info('注册有误...') 
					 })
			  }).then(function(){
		      		 $scope.signuploading = false;
			  })   
	   }
}]);


!function(Music){
	  try{
		  
			 Music = angular.module('music.access');
	  }catch(e){
			 Music = angular.module('music.access', [])
	  }
	  
	  Music.run(['$templateCache', function($templateCache){
			 $templateCache.put('access/signin.html', '<header class="header" data-ng-include="\'access.html\'"></header>'+
					'<div class="container" style="margin-top:30px;">'+
					        '<div class="col-md-8 hidden-xs"></div>'+
					        '<div class="col-md-4">'+
							'<div class="panel panel-default"><div class="panel-heading"><h4>登录</h4></div><div class="panel-body">'+
							'<form class="panel-body form-horizontal" form-validator="" formvalidatorconfig="eventformvalidate" method="post">'+
								   ' <div class="form-group form-user">'+
											'<label class="control-label">手机号码：</label>'+
											'<span class="login-ico login-user"></span>'+
											'<input type="text" placeholder="" id="mobile" class="form-control input-lg" data-rule-required="true" name="mobile" ng-model="loginData.mobile">'+
											'<p ng-show="mobileLoading">验证中...</p>'+
									'</div>'+
									'<div class="form-group form-lock">'+
											'<label class="control-label">密码：</label>'+
											'<span class="login-ico login-lock"></span>'+
											'<input type="password" placeholder="" class="form-control input-lg" data-rule-required="true" ng-disabled="psdisabled" name="password" id="password" ng-model="loginData.password"></div>'+
								   '<div class="checkbox">'+
											'<label>'+
													'<input type="checkbox" ng-model="loginData.remember">记住我的帐号</label>'+
									'</div>'+
									'<button type="submit" class="btn btn-primary submit-btn" btn-loading="loginloading" loading-text="登录中..." ng-disabled="psdisabled">登录</button>'+
							'</form></div></div></div></div>'+
							
							'<div toast-container data-ng-include="\'common/layout/footer.html\'"></div>')
	  }])
}();




!function(Music){
	  try{
			 Music = angular.module('music.access')
	  }catch(e){
		  
			 Music = angular.module('music.access', [])
	  }
	  
	  Music.run(['$templateCache', function($templateCache){
			 $templateCache.put('access/signup.html', '<header class="header" data-ng-include="\'access.html\'"></header>'+
					'<div class="container" style="margin-top:30px;">'+
					        '<div class="col-md-8 hidden-xs"></div>'+
					        '<div class="col-md-4">'+
							'<div class="panel panel-default"><div class="panel-heading"><strong>注册</strong></div><div class="panel-body">'+
							'<form class="panel-body" ng-submit="signup()">'+
                                '<div class="form-group">'+
                                        '<label class="control-label">邮箱</label>'+
                                        '<input type="email" class="form-control input-lg" ng-model="entity.email"></div>'+
                                '<div class="form-group">'+
                                        '<label class="control-label">密码</label>'+
                                        '<input type="password" class="form-control input-lg" ng-model="entity.password"></div>'+
                                '<div class="form-group">'+
                                        '<label class="control-label">确认密码</label>'+
                                        '<input type="password" class="form-control input-lg" ng-model="entity.confirmPassword"></div>'+
                                '<div class="checkbox">'+
                                        '<label>'+
                                                '<input type="checkbox" checked="checked"> 我已阅读并接受'+
                                                '<a href="javascript:;">MXPlay</a>'+
                                        '</label>'+
                                '</div>'+
                                '<button type="submit" class="btn btn-primary" btn-loading="signuploading" loading-text="注册中...">注册</button>'+
                                '<div class="line line-dashed"></div>'+
                                '<p class="text-muted text-center">'+
                                        '<small>已有注册账号, 可直接登录?</small>'+
                                '</p>'+
                                '<a href="javasrcript:;" ui-sref="access.signin" class="btn btn-default btn-block">登录</a>'+
                            '</form>'+
						    '</div></div></div></div>'+
							
							'<div toast-container data-ng-include="\'common/layout/footer.html\'"></div>')
	  }])
}();