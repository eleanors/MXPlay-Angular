// 左侧导航菜单
angular.module('music.nav', [])
.controller('LeftCtrl', ['$scope', function($scope){
		$scope.menu = [{
			   title: '音乐主界面',
			   href: 'app.music.view',
			   icon: ''
		},{
			   title: '音乐列表',
			   href: 'app.music.list',
			   icon: '',
			   submenu: [{
					  title: '最新榜单',
					  href: 'app.music.list'
			   },{
					  title: '最新榜单',
					  href: 'app.music.list'
			   }]
		},{
			   title: '音乐分类',
			   href: 'app.music.category',
			   icon: ''
		},{
			   title: '音乐推荐',
			   href: 'app.music.recommend',
			   icon: ''
		},{
			   title: '专辑列表',
			   href: 'app.ablum.listview',
			   icon: ''
		},{
			   title: '专辑分类',
			   href: 'app.ablum.category',
			   icon: ''
		},{
			   title: '专辑推荐',
			   href: 'app.ablum.recommend',
			   icon: ''
		}]
}])
.directive('topNav', function(){
		return {
			   restrict: 'EA',
			   replace: true,
			   templateUrl: 'compnents/navbar/topnav.html',
			   link: function(scope, element, attrs){
				   
				       element.on('click', 'li', function(){
						      angular.element(this).addClass('active').siblings().removeClass('active')
					   })
			   }
		}
})
.directive('leftNav', function(){
		return {
			   restrict: 'EA',
			   replace: true,
			   scope: true,
			   controller: 'LeftCtrl',
			   templateUrl: 'compnents/navbar/navar.html'
		}
})
.directive('navItem', [function(){
		return {
			   restrict: 'EA',
			   link: function(scope, element, attrs){
				   
					  element.on('click', function(event){
							 var currentElem = $(event.target);
							 currentElem.is('a') || (currentElem = currentElem.closest('a'));
							 var parentElem = currentElem.parent().siblings('.active');
							 parentElem && parentElem.find('a').toggleClass('active') &&
							 parentElem.toggleClass('active').find('ul:visible').slideUp(500);
							 currentElem.hasClass('active') && currentElem.next().slideUp(500) ||
							 currentElem.next().slideDown(500);
							 currentElem.toggleClass('active').parent().toggleClass('active');
							 currentElem.next().is('ul') && event.preventDefault();
							 
							// console.log(currentElem)
					  })
			   }
		}
}])
 
     
angular.module('music.nav').run(['$templateCache', function($templateCache){
	   $templateCache.put('compnents/navbar/navar.html', '<ul class="nav nav-sidebar">'+
	   
			 '<li ng-repeat="item in menu" ng-class="{active:$index==0}" ui-sref-active="active" ><a ui-sref="{{item.href}}" nav-item>{{item.title}}</a>'+
			 
					  '<ul class="nav nav-submenu" ng-if="item.submenu">'+
					  
							  '<li ng-repeat="submenu in item.submenu"><a ui-sref="{{item.href}}">{{submenu.title}}</a></li>'+
					  '</ul>'+
			 '</li></ul>'
	   ) 
}]) 

    
angular.module('music.nav').run(['$templateCache', function($templateCache){
	   $templateCache.put('compnents/navbar/topnav.html', '<ul class="nav navbar-nav" ><li class="active"><a ui-sref="app.home">发现音乐</a></li><li><a ui-sref="app.mymusic">我的音乐</a></li><li><a ui-sref="app.ranking">排行榜</a></li><li><a ui-sref="app.communite">社区</a></li></ul>'
	   ) 
}])