angular.module('music.service', [])

	// 设置网页标题
	.provider('$pageTitle', function(){
		     var title = '';
			 this.setDefault = function(titleValue){
				 
			         title = titleValue;
			 };
			 
			 function pageTitle($rootScope, $window){
				     function getPageTitle(){
						    return $window.document.title;
					 }
					 function setPageTitle(){
						    var multTitle, titles;
							titles = arguments.length > 0 ? Array.prototype.slice.call(arguments) : title;
							multTitle = angular.isString(titles) ? titles : [title].concat(titles).join('-');
							$window.document.title = multTitle;
					 }
					
					 title ? $window.document.title = title : title = $window.document.title;
					 $rootScope.$on('$stateChangeSuccess', function(state, data){
						    var pageTitle = '';
							 	data && angular.isDefined(data.data) && (pageTitle = data.data.pageTitle || null);
								pageTitle ? setPageTitle(pageTitle) : setPageTitle();
					 })
					 return {
						    get: getPageTitle,
							set: setPageTitle
					 }
			 };
			 
			 this.$get = ['$rootScope', '$window', pageTitle]
	})