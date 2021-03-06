(function($, angular){
	var module = angular.module('BlurAdmin.pages.libs');
	module.factory('ngTableOptions', [function(){
		return {
			locale: 'zh-CN',
			classes: 'table table-hover table-condensed',
			sidePagination: 'server',
			clickToSelect: false,
			pagination: true,
			undefinedText: '',
			dataField: 'rows',
			method: 'get',
			contentType: 'application/json',
        	dataType: 'json',
        	cache: false,
			pageSize: 10,
	        search: false,
	        searchOnEnterKey: true,
	        strictSearch: false,
	        searchAlign: 'right',
			showHeader: true,
	        showFooter: false,
	        showColumns: true,
	        showPaginationSwitch: false,
	        showRefresh: true,
	        height: undefined,
	        showToggle: false,
	        showExport: false,
	        buttonsAlign: 'right',
			uniqueId: 'id',
	        idField: 'id',
			singleSelect: true,
	        onServerSearch: angular.noop(),
	        onlyInfoPagination: false,
	        showPaginationInfo: false,
	        tableReference: undefined,
	        icons: {
	            paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
	            paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
	            refresh: 'glyphicon-refresh icon-refresh',
	            toggle: 'glyphicon-list-alt icon-list-alt',
	            columns: 'glyphicon-th icon-th',
	            detailOpen: 'glyphicon-plus icon-plus',
	            detailClose: 'glyphicon-minus icon-minus',
	            export: 'glyphicon-export  icon-share',
	            advancedSearchIcon: 'glyphicon glyphicon-search'
        	},
        	exportTypes: ['csv', 'excel'],
        	groupBy: false,
        	groupByField: ['group'],
        	groupBySumGroup: false,
        	commandEnable: true,
        	advancedSearch: false,
        	commandMethodPrefix: '',
        	onServerSearch: angular.noop(),
        	avdSearchWidth: undefined,
        	selectedBindEnable: false,
        	rowGroup: undefined
	    }
	}]);
})(jQuery, angular);