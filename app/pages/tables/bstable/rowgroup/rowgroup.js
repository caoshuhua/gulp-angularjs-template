(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	module.component('tableRowGroupExampleComponent', {
		templateUrl: 'app/pages/tables/bstable/rowgroup/rowgroup.html',
		controller: ['$scope', 'ngAlert', function($scope, ngAlert){
			$scope.tableOptions = {};
			$scope.tableDatas;
			$scope.tableSelectedData = undefined;
			var mockDatas = {
				total: 100,
				rows: [] 
			}

			var now = new Date().getTime();
			for (var i=0; i<20; i++){
				var item = {};

				item.id = now + '-' + (i+1);
				item.brand = 'MB_Brand' + (i + 1);
				item.types = [
					{
						type: 1,
						title: '基础数据表',
						size1: {
							state: 1,
							updateUser: 'xiufu.wang',
							updateDate: '20160721'

						},
						size2: {
							state: 1,
							updateUser: 'xiufu.wang',
							updateDate: '20160721'

						}
					},
					{
						type: 2,
						title: '图片信息',
						size1: {
							state: 1,
							updateUser: 'xiufu.wang',
							updateDate: '20160721'
						},
						size2: {
							state: 1,
							updateUser: 'xiufu.wang',
							updateDate: '20160721'

						}
					}
				]

				if ((i % 2) == 1){

					item.types.push({
						type: 2,
						title: '图片信息ext',
						size1: {
							state: 1,
							updateUser: 'xiufu.wang----',
							updateDate: '20160721'
						},
						size2: {
							state: 1,
							updateUser: 'xiufu.wangxxx',
							updateDate: '20160721'

						}
					});
				}

				mockDatas.rows.push(item);
			}

			$scope.tableDatas = mockDatas;
		}]
	})
})(jQuery, angular);