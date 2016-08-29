(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	 module.controller('$$avdSearchController', ['$scope', 'queryParams', function($scope, queryParams){
          $scope.queryParams = angular.copy(queryParams || {}, {});
          
          $scope.submitParams = function(){
               $scope.closeThisDialog($scope.queryParams);
          }

          $scope.cancelAvd = function(){
               $scope.closeThisDialog('cancel');
          }
     }])

     var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initToolbar = BootstrapTable.prototype.initToolbar;
      function showAvdSearchWin(that, ngContext, options){
          var ngDialog = ngContext.ngDialog;
          var $scope = ngContext.$scope;
          var avdSearchTpl = options.avdSearchTpl;
          ngDialog.open({
               template: avdSearchTpl,
               controller: '$$avdSearchController',
               width: isNaN(options.avdSearchWidth) ? undefined : parseInt(options.avdSearchWidth),
               resolve: {
                    queryParams: function(){
                         return $scope.avdQueryParams;
                    }
               }
          }).closePromise.then(function(data){
               if (data.value == 'cancel'){
                    return;
               }
               $scope.$evalAsync(function(){
                    $scope.avdQueryParams = $.extend(true, {}, data.value || {});
                    $.proxy(that.refresh, that)({query: $scope.avdQueryParams});
               })
               
          });
     }
          
     BootstrapTable.prototype.initToolbar = function(){
          _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

          if (!this.options.advancedSearch) {
            return;
          }

          //添加按钮
          var that = this;
          var btnGroup = that.$toolbar.find('>div.btn-group');
          var html = [];
          var ngContext = this.options.ngContext;
          
          if (btnGroup.length === 0){
               html.push(sprintf('<div class="columns columns-%s btn-group pull-%s" role="group">', this.options.buttonsAlign, this.options.buttonsAlign));
               html.push(sprintf('<button class="btn btn-default%s' + '" type="button" name="advancedSearch" title="%s">', that.options.iconSize === undefined ? '' : ' btn-' + that.options.iconSize, that.options.formatAdvancedSearch()));
               html.push(sprintf('<i class="%s %s"></i>', that.options.iconsPrefix, that.options.icons.advancedSearchIcon))
               html.push('</button></div>');
               that.$toolbar.prepend(html.join(''));
          } else {
               html.push(sprintf('<button class="btn btn-default%s' + '" type="button" name="advancedSearch" title="%s">', that.options.iconSize === undefined ? '' : ' btn-' + that.options.iconSize, that.options.formatAdvancedSearch()));
               html.push(sprintf('<i class="%s %s"></i>', that.options.iconsPrefix, that.options.icons.advancedSearchIcon));
               html.push('</button>');

               if (btnGroup.has(':first-child')){
                    btnGroup.find(':first-child').eq(0).before(html.join(''));
               } else {
                    btnGroup.prepend(html.join(''));
               }
          }

          this.$toolbar.find('button[name="advancedSearch"]')
               .off('click')
               .on('click', function(event){
                    showAvdSearchWin(that, ngContext, that.options);
               })
     }

})(jQuery, angular);