// 路由状态类
angular.module('music.state', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
			
            $urlRouterProvider.otherwise(function($injector, $location){
					 return 'app/home'
			});
		           
		    $stateProvider
			        .state('/', {
						    url: '/',
							abstract: true
					})
			        .state('app', {
                            url: '/app',
							abstract: true,
							controller: ['$rootScope', '$scope', function($rootScope, $scope){console.log($scope)
								   //$scope.loadPage = function(){
									  
								          $rootScope.nav_done = true
								  // }
							}],
							templateUrl: 'MXPlay/layout/home.html'
					})
			        // 发现音乐
			        .state('app.home', {
                            url: '/home',
							data: {
							      pageTitle: '发现音乐'
							},
							controller: ['$rootScope', '$scope', function($rootScope, $scope){
								
							}],
							templateUrl: 'home/music/default.html'
					})
					
					// 登录页
					.state('access', {
						    url: '/access',
							abstract: true,
                			template: "<div ui-view></div>"
					})
					.state('access.signin', {
						    url: '/signin',
                			controller: "signinCtrl",
							data: {
									pageTitle: "登录"
							},
							templateUrl: 'access/signin.html'
					})
					.state('access.signup', {
						    url: '/signup',
							data: {
									pageTitle: "注册"
							},
							controller: 'signupCtrl',
							templateUrl: 'access/signup.html'
					})
					
		            // 音乐管理页
					.state('app.music', {
                            url: '/music',
							abstract: true,
                			template: "<div ui-view></div>"
					})
			        .state('app.music.view', {
                            url: '/view',
							templateUrl: 'home/music/default.html'
					})
					.state('app.music.list', {
                            url: '/listview',
							templateUrl: 'home/music/listview.html'
					})
			        .state('app.music.category', {
                            url: '/category',
							templateUrl: 'home/music/category.html'
					})
			        .state('app.music.recommend', {
                            url: '/recommend',
							templateUrl: 'home/music/recommend.html'
					})
			        .state('app.music.detail', {
                            url: '/detail/{goodsId:int}',
							controller: 'ViewDetailCtrl',
							templateUrl: 'home/music/recommend.html'
					})
					
					// 专辑管理页
					.state('app.ablum', {
                            url: '/ablum',
							abstract: true,
                			template: '<div ui-view></div>'
					})
			        .state('app.ablum.listview', {
                            url: '/listview',
							templateUrl: 'home/ablum/listview.html'
					})
			        .state('app.ablum.category', {
                            url: '/category',
							templateUrl: 'home/ablum/category.html'
					})
			        .state('app.ablum.recommend', {
                            url: '/recommend/{articleId:int}',
							templateUrl: 'home/ablum/recommend.html'
					})
					
					.state('app.mymusic', {
						    url: '/mymusic',
							data: {
							      pageTitle: '我的音乐'
							},
							views: {
								    'mainer@app': { templateUrl: 'site/mymusic.html'}
							}
					}).state('app.ranking', {
						    url: '/ranking',
							data: {
							      pageTitle: '音乐排行榜'
							},
							views: {
								    'mainer@app': { templateUrl: 'site/ranking.html'}
							}
					}).state('app.communite', {
						    url: '/communite',
							data: {
							      pageTitle: '社区'
							},
							views: {
								    'mainer@app': { templateUrl: 'site/communite.html'}
							}
					})
	 }]);