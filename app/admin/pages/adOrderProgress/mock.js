(function($, angular){
	var module = angular.module('BgoAdmin.admin.adOrderProgress');
	module.run(['$httpMock', function($httpMock){
		var tag = 0;
		var brands = ['MB', 'MC', 'MooMoo', 'BM', 'FM', 'SM'];
		var shopStatus = ['已开业', '营业中'];
		var orderStatus = ['已报', ''];
		function getDatas(){
			var datalist = {total: 100, rows: []};
			for (var i = 0; i < 20; i++) {
				datalist.rows.push({
					id: (i+1),
					shopCode: 'A03446S001',
					shopName: 'MM河北唐山玉田鼓楼南街店',
					agentCode: 'A03446',
					agentName: 'MM河北玉田',
					shopStatus: shopStatus[i%2],
					openDate: '2015-12-31',
					orderStatus: orderStatus[i%2]
				});
			}
			return datalist;
		}

		$httpMock({url: '/mock/data/adOrderProgressService/list',method: 'get',response: getDatas, responseTime: 500});

	}])
})(jQuery, angular);