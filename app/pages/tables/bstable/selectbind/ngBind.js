(function($, angular){
	function updateSelectedForBind(that){
	    var ngContext = that.options.ngContext;
	    var $timeout = ngContext.$timeout;
	    $timeout.cancel(that.$el.bindtimer);
	    that.$el.bindtimer = $timeout(function(){
	      ngContext.$scope.selectedBind = that.$el.bootstrapTable('getAllSelections');
	    }, 1);
  }

  var BootstrapTable = $.fn.bootstrapTable.Constructor,
    _init = BootstrapTable.prototype.init;
    
  BootstrapTable.prototype.init = function(){
    if (!this.options.selectedBindEnable){
      _init.apply(this, Array.prototype.slice.apply(arguments));
      return;
    }
    var that = this,
        _onCheck = that.options.onCheck || angular.noop,
        _onUncheck = that.options.onUncheck || angular.noop,
        $scope = that.options.ngContext.$scope;

        that.options.onCheck = 
          that.options.onUncheck = 
          that.options.onCheckAll = 
          that.options.onUncheckAll = function(row){
          if (!$scope.$root.$$phase){
            $scope.$root.$apply(function(){
              updateSelectedForBind(that);
            });
          } else {
              updateSelectedForBind(that);
          }
          
          if (row[that.header.stateField]){
            _onCheck.apply(this, Array.prototype.slice.apply(arguments));
          } else {
            _onUncheck.apply(this, Array.prototype.slice.apply(arguments));
          }
        }

      that.$el.on('post-body.bs.table page-change.bs.table', function(){
        var $scope = that.options.ngContext.$scope;
          if (!$scope.$root.$$phase){
            $scope.$root.$apply(function(){
              updateSelectedForBind(that);
            });
          } else {
              updateSelectedForBind(that);
          }
      })

      _init.apply(this, Array.prototype.slice.apply(arguments));
  }
	
})(jQuery, angular);