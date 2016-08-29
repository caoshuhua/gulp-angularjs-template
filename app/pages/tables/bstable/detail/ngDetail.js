(function($, angular){
	function detailFormatter(index, row, $element){
		var ngContext = this.ngContext;
		var tpl = this.detailTpl;
		var plain = this.detailTplPlain || false;
		var $scope = ngContext.$scope;
		var $compile = ngContext.$compile;
          var $timeout = ngContext.$timeout;
		var $templateCache = ngContext.$templateCache;
		var html;
		var $el;
		var newScope;
		if (plain === true){
			html = tpl;
		} else {
			html = $templateCache.get(tpl);
			html = !html ? '' : html; 
		}

		$el = angular.element(html);
		if (!row._$scope_){
			row._$scope_ = $scope.$new();
			row._$scope_.$tab_row_Record = row;
			row._$scope_.$tab_row_index = index;
		}

          //row._$scope_.debugText = 'debug'
//   		row._$scope_.debugText = 'debug'
//   		var detailEl = $compile($el)(row._$scope_);
//   		row._$scope_.$digest();
//        $element.append(detailEl);
//        
		
          $element.append($el);
          row._timer_ = $timeout(function(){
               $compile($element)(row._$scope_);
          }, 1, false);
          return '';
	}

	function whenCollapseRow(index, row){
          var ngContext = this.ngContext;
          var $timeout = ngContext.$timeout;
           $timeout.cancel(row._timer_);
		if (row._$scope_ && !row._$scope_.$$destroyed){
			row._$scope_.$destroy();
		}
          row._$scope_ = undefined;
		delete row._$scope_;
		return true;
	}

     
     var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initData = BootstrapTable.prototype.initData;

     BootstrapTable.prototype.init = function(){
     	if (this.options.detailView){
     		if (this.options.ngContext && this.options.detailTpl && $.trim(this.options.detailTpl) != ''){
	     		this.options.detailFormatter = detailFormatter;
	     		this.options.onCollapseRow = whenCollapseRow;
     		}
     	}
     	_init.apply(this, Array.prototype.slice.apply(arguments));
     }

     BootstrapTable.prototype.initData = function(){
     	if (this.options.detailView && $.trim(this.options.detailTpl) != ''){
	     		angular.forEach(this.options.data || [], function(v){
	     		if (!v._$scope_ || v._$scope_.$$destroyed){
	     			return;
	     		}
	     		v._$scope_.$destroy();
	     		v._$scope = undefined;
				delete v._$scope;
			})
     	}
     	
     	_initData.apply(this, Array.prototype.slice.apply(arguments));
     }
	
})(jQuery, angular);