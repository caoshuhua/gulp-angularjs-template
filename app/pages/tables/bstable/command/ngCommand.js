(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init;

     BootstrapTable.prototype.init = function(){
          var that = this;
          if (this.options.commandEnable){
               var timer;
               var bindFn = function(event, $timeout, $scope){
                    var fn;
                    if (!$scope[event]){
                         return undefined;
                    }
                    fn = $scope[event];
                    return function(){
                         var args = [].slice.call(arguments, 0);
                         var params = {};
                         if (event == 'onClickRow'){
                              params.row = args[0];
                         }

                         if (event == 'onDblClickRow'){
                              params.row = args[0];
                         }

                         if (event == 'onClickCell'){
                              params.row = args[2];
                              params.field = args[0];
                              params.value = args[1];
                         }

                         if (event == 'onDblClickCell'){
                              params.row = args[2];
                              params.field = args[0];
                              params.value = args[1];
                         }

                         if (event == 'onCellCommand'){
                              var evt = args[0];
                              var $elm = $(evt.target);
                              if ($elm.is('a')){
                                   evt.preventDefault();
                              }
                              evt.stopImmediatePropagation();
                              params = $.extend(true, {}, $elm.data());
                          }

                          if (event == 'onServerSearch'){
                              params.queryParams = args[0];
                          }

                         if (timer){return;}
                         timer = $timeout(function(){
                              if (!timer){return; }
                              $scope.$evalAsync(function(){
                                   fn({params: params});
                              })
                              timer = null;
                         }, 1);
                    }
               };
              
              if (this.options.ngContext){
                    var ngContext = this.options.ngContext;
                    var $scope = ngContext.$scope;
                    var $timeout = ngContext.$timeout;

                    this.options.onClickRow = bindFn('onClickRow', $timeout, $scope);
                    this.options.onDblClickRow = bindFn('onDblClickRow', $timeout, $scope);
                    this.options.onClickCell = bindFn('onClickCell', $timeout, $scope);
                    this.options.onDblClickCell = bindFn('onDblClickCell', $timeout, $scope);
                    this.options.onServerSearch = bindFn('onServerSearch', $timeout, $scope);
                }

               this.$el.on('post-body.bs.table', function(){
                    that.$body.find('> tr[data-index] > td .cell-command')
                         .off('click dblclick')
                         .on('click', bindFn('onCellCommand', $timeout, $scope));
               })

          }
          
          _init.apply(this, Array.prototype.slice.apply(arguments));
     }

})(jQuery, angular);