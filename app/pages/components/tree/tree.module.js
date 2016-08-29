/**
 * @author a.demeshko
 * created on 12.21.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.tree', [])
    .config(routeConfig)
    .config(function(){
      $.jstree.defaults.core.themes.url = true;
      $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes";
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('components.tree', {
          url: '/tree',
          templateUrl: 'app/pages/components/tree/tree.html',
          title: 'Tree',
          sidebarMeta: {
            order: 200,
          },
        }).state('components.ngtree', {
          url: '/ngtree',
          templateUrl: 'app/pages/components/tree/ext/index.html',
          title: '扩展Tree',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
