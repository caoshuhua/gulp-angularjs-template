/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  function BaSidebarCtrl($scope, baSidebarService, MyMenuService, $timeout) {
    //获取后台远程菜单
    MyMenuService.getMyMenus().$promise.then(function(data){
        $scope.menuItems = baSidebarService.getMenuItems();
        for (var i = 0; i < data.length; i++) {
          $scope.menuItems.push(data[i]);
        }
        $scope.defaultSidebarState = $scope.menuItems[0].stateRef;
    })

    $scope.hoverItem = function ($event) {
      $scope.showHoverElem = true;
      $scope.hoverElemHeight =  $event.currentTarget.clientHeight;
      var menuTopValue = 66;
      $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
    };

    $scope.$on('$stateChangeSuccess', function () {
      if (baSidebarService.canSidebarBeHidden()) {
        baSidebarService.setMenuCollapsed(true);
      }
    });
  }
})();