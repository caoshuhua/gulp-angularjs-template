/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function ($, angular) {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('pageTop', ['$timeout', 'MyMenuService', pageTop]);

  /** @ngInject */
  function pageTop($timeout, MyMenuService) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      link: function(scope, el){
        scope.searchInputText = undefined;
        
        MyMenuService.getMyMenus().$promise.then(function(data){
          scope.sysMenuList = getFuncMenus(data);
          function getFuncMenus(data){
              var res = [];
              data = data || [];
              if (data.length === 0){
                return res;
              }

              if (!angular.isArray(data)){
                data = [data];
              }

              for (var i=0; i<data.length; i++){
                if (!data[i].subMenu && data[i].title && data[i].stateRef){
                  res.push({text: data[i].title, stateRef: data[i].stateRef, fixedHref: data[i].fixedHref});
                } else {
                  res = [].concat(res, getFuncMenus(data[i].subMenu));
                }
              }

              return res;
          }
        })
      }
    };
  }

})(jQuery, angular);