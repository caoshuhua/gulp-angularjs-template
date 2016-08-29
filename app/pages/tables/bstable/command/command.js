(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	module.component('tableCellCommandExampleComponent', {
		templateUrl: 'app/pages/tables/bstable/command/command.html',
		controller: ['$scope', '$compile', 'ngAlert', function($scope, $compile, ngAlert){
			$scope.tableOptions = {
				options: {
					columns: [ 
						{},
						{
							formatter: function(index, row){
								var html = [
									'<div class="btn-group" role="group">',
									'<a href="javascript:void(0)" data-toggle="dropdown" class="btn btn-default dropdown-toggle">',
									'Dropdown',
									'<span class="caret"></span>',
									'</a>',
									'<ul class="dropdown-menu">',
										'<li>',
											'<a class="cell-command" data-record-id="'+ row.id +'" href="#">command1</a>',
										'</li>',
										'<li>',
											'<a class="cell-command" data-record-id="'+ row.id +'" href="#">command2</a>',
										'</li>',
										'<li>',
											'<a class="cell-command" data-record-id="'+ row.id +'" href="#">command3</a>',
										'</li>',
										'<li>',
											'<a class="cell-command" data-record-id="'+ row.id +'" href="#">command4</a>',
										'</li>',
									'</ul>',
									'</div>'
								];
								return html.join('');
							}

						},
						{
							formatter: function(index, row){
								var html = [
									'<a href="javascript:void(0)"',
									' class="cell-command"',
									' data-record-id="'+ row.id +'"',
									' data-record-index="'+ index +'"',
									' >',
									'<i class="fa fa-leaf"></i>command',
									'</a>'
								];
								return html.join('');
							}
						}
					]
				}

			};
			$scope.jstabledata = {total: 100, rows: [
				{id: '100000001',name: '用户1',role: '测试角色1'},
				{id: '100000002',name: '用户2',role: '测试角色2'}
			]}

			$scope.doWhenCellCommand = function(params){
				ngAlert.info('cell command:' + JSON.stringify(params));
			}
		}]
	})
})(jQuery, angular);