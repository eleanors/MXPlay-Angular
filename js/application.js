

     angular.module('Music', ['restangular', 'music.state', 'music.auth', 'music.nav', 'music.tools', 'music.config', 'music.filter', 'music.directive', 'music.service', 'music.controller', 'music.access'])
	 
	 
	 angular.module('Music')
	 .controller('layoutCtrl', ['$scope', '$state', function($scope, $state){
		      $scope.logout = function(){
				      // 调用退出方法并跳转至登录页
				      $state.go('access.signin')
			  }
	 }])
	 
	 .controller('ViewDetailCtrl', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular){
		 
					  
		      if($stateParams.goodsId){
				  
					  Restangular.one('music', $stateParams.goodsId + '.json')
					  .get().then(function(data){
						  
					  }, function(){
						  
					  })
			  }
		 
		      //console.log($scope, $stateParams)
	 }])
	 
	 .controller('signupCtrl', ['$scope', '$state', 'authService', function($scope, $state, authService){
		      $scope.$on('$destroy', function(){
				  
			  })
			  
			  $scope.signup = function(){
			  }
	 }])
	 
	 // Header
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('common/layout/header.html', '<div class="navbar navbar-inverse navbar-fixed-top"><div class="container-fluid">'+
		   		   '<div class="navbar-header">'+
						   '<a ui-sref="app.home" class="navbar-brand">MXPlay</a>'+
						   '<div class="btn navbar-toggle" data-toggle="collapse" data-target="#navbarList" aria-controls="navbarList">'+
								   '<span class="sr-only">切换显示</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>'+
						   '</div>'+
				   '</div>'+
				   
				   '<div id="navbarList" class="navbar-collapse collapse">'+
				           '<top-nav></top-nav>'+
						   '<ul class="nav navbar-nav navbar-right"><li><a ui-sref="access.signin" ng-click="">登录</a></li><li><a ui-sref="access.signup" ng-click="">注册</a></li><li class="active"><a href="javascript:;" ng-click="logout()">退出</a></li></ul>'+
				   '</div>'+
		    '</div></div>') 
	 }])
	 
	 // Signin Ang Signup
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('access.html', '<div class="navbar navbar-inverse navbar-fixed-top">'+
		          '<div class="container">'+
						   '<div class="navbar-header">'+
								   '<a ui-sref="app.home" class="navbar-brand">MXPlay</a>'+
								   '<div class="btn navbar-toggle" data-toggle="collapse" data-target="#navbarList" aria-controls="navbarList">'+
										   '<span class="sr-only">切换显示</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>'+
								   '</div>'+
						   '</div>'+
						   '<div id="navbarList" class="navbar-collapse collapse"><ul class="nav navbar-nav"><li><a ui-sref="app.home">发现音乐</a></li><li><a ui-sref="#">最新上架</a></li></ul></div>'+
				  '</div></div>') 
	 }])
	 

	 
	 
	 // Footer
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('common/layout/footer.html', '<footer class="footer"><div class="container"><p class="text-muted text-right">copy right 2016~2040...</p></div></footer>') 
	 }])
	 
	 // Home
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('MXPlay/layout/home.html', '<section class="contrainer-fluid" ng-controller="layoutCtrl">'+
		   
		           '<header class="" data-ng-include="\'common/layout/header.html\'"></header>'+
				   '<section data-ui-view="mainer">'+
				            '<aside id="nav" class="col-sm-3 col-md-2 sidebar" onload="loadPage()"><left-nav></left-nav></aside>'+
							'<section id="content" class="col-sm-9 col-md-10 col-sm-offset-3 col-md-offset-2 main" data-ui-view ng-show="nav_done"></section>'+
				   '</section>'+
				   '<footer class="footer"><div class="container"><p class="text-muted text-right">copy right 2016~2040...</p></div></footer>'+
		           '</section>') 
	 }])
	 
	 
	 
	 // 我的音乐
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('site/mymusic.html', '<div class="container">'+
		      
		           '<h4>我的音乐.....</h4><div class="jumbtron text-center">'+
				   
				        '<h3>主页</h3>'+
				        '<p>暂无内容...</p>'+
				   
				   '</div>'+
		   '</div>') 
	 }])
	 // 排行榜
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('site/ranking.html', '<div class="container">'+
		      
		           '<h4>排行榜.....</h4><div class="jumbtron text-center">'+
				   
				        '<h3>主页</h3>'+
				        '<p>暂无内容...</p>'+
				   
				   '</div>'+
		   '</div>') 
	 }])
	 // 社区
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('site/communite.html', '<div class="container">'+
		      
		           '<h4>社区.....</h4><div class="jumbtron text-center">'+
				   
				        '<h3>主页</h3>'+
				        '<p>暂无内容...</p>'+
				   
				   '</div>'+
		   '</div>') 
	 }])
	 
	 
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('home/music/default.html', '<div>这里是主界面....</div>') 
	 }])
	 
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('home/music/listview.html', '<div>音乐列表页...'+
		   
		           '<a ui-sref="app.music.detail({goodsId:100})">想你的夜</a>'+
		   '</div>') 
	 }])
	 
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('home/music/category.html', '<div>音乐分类页...</div>') 
	 }])
	 
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('home/music/recommend.html', '<div>音乐推荐页...</div>') 
	 }]) 
	 
	 
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('home/ablum/listview.html', '<div>专辑列表页...</div>') 
	 }])
	 
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('home/ablum/category.html', '<div>专辑分类页...</div>') 
	 }])
	 
	 angular.module('Music').run(['$templateCache', function($templateCache){
		   $templateCache.put('home/ablum/recommend.html', '<div>专辑推荐页...</div>') 
	 }])
	 