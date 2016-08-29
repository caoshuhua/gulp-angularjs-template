(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.busy', [])
      .config(['$stateProvider', routeConfig]);
  
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.busy', {
          url: '/busy',
          templateUrl: 'app/pages/ui/busy/index.html',
          title: '加载等待',
          sidebarMeta: {
            order: 500,
          }
        });
  }

})();
