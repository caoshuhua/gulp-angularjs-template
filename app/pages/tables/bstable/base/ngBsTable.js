(function($, angular){
  var module = angular.module('BlurAdmin.pages.tables');
	module.directive('bsTableControl', 
      ['$optionParse', 
      'ngTableOptions', 
      '$compile', 
      '$parse', 
      '$templateCache', 
      '$compile',
      '$timeout',
      'ngDialog',
      function ($optionParse, 
        ngTableOptions, 
        $compile, 
        $parse, 
        $templateCache,
        $compile,
        $timeout,
        ngDialog) {
        var CONTAINER_SELECTOR = '.bootstrap-table';
        var SCROLLABLE_SELECTOR = '.fixed-table-body';
        var SEARCH_SELECTOR = '.search input';
        var bsTables = {};

        function getBsTable (el) {
          var result;
          $.each(bsTables, function (id, bsTable) {
            if (!bsTable.$el.closest(CONTAINER_SELECTOR).has(el).length) return;
            result = bsTable;
            return true;
          });
          return result;
        }

        $(window).resize(function () {
          $.each(bsTables, function (id, bsTable) {
            bsTable.$el.bootstrapTable('resetView');
          });
        });

        function onScroll () {
          var bsTable = this;
          var state = bsTable.$s.bsTableControl.state;
          bsTable.$s.$applyAsync(function () {
            state.scroll = bsTable.$el.bootstrapTable('getScrollPosition');
          });
        }

        $(document)
          .on('post-header.bs.table', CONTAINER_SELECTOR+' table', function (evt) { // bootstrap-table calls .off('scroll') in initHeader so reattach here
            var bsTable = getBsTable(evt.target);
            if (!bsTable) return;
            bsTable.$el
              .closest(CONTAINER_SELECTOR)
              .find(SCROLLABLE_SELECTOR)
              .on('scroll', onScroll.bind(bsTable));
          })
          .on('sort.bs.table', CONTAINER_SELECTOR+' table', function (evt, sortName, sortOrder) {
            var bsTable = getBsTable(evt.target);
            if (!bsTable) return;
            var state = bsTable.$s.bsTableControl.state;
            bsTable.$s.$applyAsync(function () {
              state.sortName = sortName;
              state.sortOrder = sortOrder;
            });
          })
          .on('page-change.bs.table', CONTAINER_SELECTOR+' table', function (evt, pageNumber, pageSize) {
            var bsTable = getBsTable(evt.target);
            if (!bsTable) return;
            var state = bsTable.$s.bsTableControl.state;
            bsTable.$s.$applyAsync(function () {
              state.pageNumber = pageNumber;
              state.pageSize = pageSize;
            });
          })
          .on('search.bs.table', CONTAINER_SELECTOR+' table', function (evt, searchText) {
            var bsTable = getBsTable(evt.target);
            if (!bsTable) return;
            var state = bsTable.$s.bsTableControl.state;
            bsTable.$s.$applyAsync(function () {
              state.searchText = searchText;
            });
          })
          .on('focus blur', CONTAINER_SELECTOR+' '+SEARCH_SELECTOR, function (evt) {
            var bsTable = getBsTable(evt.target);
            if (!bsTable) return;
            var state = bsTable.$s.bsTableControl.state;
            bsTable.$s.$applyAsync(function () {
              state.searchHasFocus = $(evt.target).is(':focus');
            });
          });

        return {
          restrict: 'EA',
          require: ['ngModel'],
          priority: 100,
          scope: {
            bsTableControl: '=',
            avdQueryParams: '=avdQueryParamsBind',
            selectedBind: '=selectedBind',
            tableData: '=ngModel',
            onClickRow: '&',
            onDblClickRow: '&',
            onClickCell: '&',
            onDblClickCell: '&',
            onCellCommand: '&',
            onServerSearch: '&'
          },
          link: function ($s, $el, $attr, $ctrl) {
            var bsTable = bsTables[$s.$id] = {$s: $s, $el: $el};
            var config;
            $s.instantiated = false;
            var firstRender = true;
              
            //table-reference
            if ($attr.tableReference){
              $s.$parent[$attr.tableReference] = $el;
            }
            
            //watch 配置
            $s.$watch('bsTableControl.options', function (options) {
              if (!options) options = $s.bsTableControl.options = {};
              var state = $s.bsTableControl.state || {};

              if ($s.instantiated) $el.bootstrapTable('destroy');
              $el.bootstrapTable(getOptions(options));
              $s.instantiated = true;

              //第一次渲染时
              if (firstRender && $ctrl[0].$modelValue && $ctrl[0].$modelValue.$promise){
                $timeout(function(){
                  $ctrl[0].$render();
                }, 1, true)
              }

              firstRender = false;

              if ('scroll' in state) $el.bootstrapTable('scrollTo', state.scroll);
              if ('searchHasFocus' in state) $el.closest(CONTAINER_SELECTOR).find(SEARCH_SELECTOR).focus(); // $el gets detached so have to recompute whole chain
            }, true);

            //激活状态事件函数
            $s.$watch('bsTableControl.state', function (state) {
              if (!state) state = $s.bsTableControl.state = {};
              $el.trigger('directive-updated.bs.table', [state]);
            }, true);

            //销毁
            $s.$on('$destroy', function () {
              delete bsTables[$s.$id];
            });

            //监控数据
            $ctrl[0].$render = function(){ 
              if ($s.instantiated){
                var newData = $ctrl[0].$modelValue;
                if (newData && typeof newData.$promise !== 'undefined'){
                    newData.$promise.then(function(data){
                      $el.bootstrapTable('load', data || emptyData());
                    }, function(){ //load error
                      $el.bootstrapTable('load', emptyData());
                    })
                } else {
                  $el.bootstrapTable('load', newData || emptyData());
                }
              }
            }

            function getOptions(options){
                if (!options){
                  options = $scope.bsTableControl.options || {};
                }
                config = $.extend(true, {}, ngTableOptions, $optionParse($attr, ngTableOptions), options, ($s.bsTableControl.state || {}));
                var data = $s.tableData;
                if (config.pagination == true){
                  config.totalRows = (data && data.total ? data.total : 0 );
                  config.data = (data && data.rows ? data.rows : []);
                } else {
                  config.data = (data && data.rows ? data.rows : (data || []));
                }

                var ngContext = {};
                ngContext.$scope = $s;$compile;
                ngContext.$compile = $compile;
                ngContext.$parse = $parse;
                ngContext.$templateCache = $templateCache;
                ngContext.$timeout = $timeout;
                ngContext.ngDialog = ngDialog;
                config.ngContext = ngContext;
                return config;
            }

            function emptyData(){
              if (!config){
                getOptions();
              }
              if(config.pagination == true){
                return {total: 0, rows: []};
              } else {
                return [];
              }
            }
          }
      };
    }])

})(jQuery, angular);