(function($, angular){
	var token = 0;
	var module = angular.module('BlurAdmin.pages.form');
	module.run(['$httpMock', function($httpMock){
		$httpMock({
			url: '/mock/data/table',
			method: 'get',
			response: function(httpConfig){
				++token;
				return {total: 100, rows: [
					{id: 'table_id_01', column1: 'column1' + token, column2: 'column2', column3: 'column3'},
					{id: 'table_id_02', column1: 'column1' + token, column2: 'column2', column3: 'column3'},
					{id: 'table_id_03', column1: 'column1' + token, column2: 'column2', column3: 'column3'},
					{id: 'table_id_04', column1: 'column1' + token, column2: 'column2', column3: 'column3'},
					{id: 'table_id_05', column1: 'column1' + token, column2: 'column2', column3: 'column3'},
					{id: 'table_id_06', column1: 'column1' + token, column2: 'column2', column3: 'column3'},
					{id: 'table_id_07', column1: 'column1' + token, column2: 'column2', column3: 'column3'},
					{id: 'table_id_08', column1: 'column1' + token, column2: 'column2', column3: 'column3'},
					{id: 'table_id_09', column1: 'column1' + token, column2: 'column2', column3: 'column3'}
				]};
			}
		});
		$httpMock({
			url: '/mock/data/table/text',
			method: 'get',
			response: function(httpConfig){
				var params = httpConfig.params;
				var ids = params.ids || [];
				if (typeof ids === 'string'){
					ids = ids.split(',');
				}
				var datas = [];
				for (var i=0; i<ids.length; i++){
					if (ids[i] == ''){
						continue;
					}
					datas.push({id: ids[i], text: '选项' + (token)});
				}
				return datas;
			}
		});
		$httpMock({
			url: '/mock/data/tree',
			method: 'get',
			response: function(httpConfig){
				var rows = [];
				for (var i=0; i<5; i++){
					++token;
					rows.push({id: 'tree_id_' + (token) ,text: '节点' + token, isParent: ((token % 10) < 6), children: ((token % 10) < 6)});
				}
				return rows;
			}
		})

		$httpMock({
			url: '/mock/data/select',
			method: 'get',
			response: function(httpConfig){
				var options = [];
				for (var i=0; i<12; i++){
					++token;
					options.push({value: 'select_id_' + (token) ,label: 'option' + token});
				}
				return options;
			}
		})

		 
		$httpMock({
			responseTime: 5000,
			url: '/mock/data/autocompele',
			method: 'get',
			response: function(httpConfig){
				var params = httpConfig.params || {};
				var term = params.term || '';
				var res = [];
				for (var i = 0; i < 15; i++) {
					res.push({value: 'MB-KIDS00' + (i+1), label: term + '-' + 'label'});
				}
				return res;
			}
		})

	}]);
})(jQuery, angular);