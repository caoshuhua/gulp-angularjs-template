(function($, angular){
	var module = angular.module('BgoAdmin.admin.futuresContractMag');
	module.run(['$httpMock', function($httpMock){
		var tag = 0;
		var brands = ['MB', 'MC', 'MooMoo', 'BM', 'FM', 'SM'];
		var progress = ['处理中', '未处理', '已处理'];
		function getDatas(){
			var datalist = {total: 100, rows: []};
			for (var i = 0; i < 20; i++) {
				datalist.rows.push({
					id: 'order00-' + (i+1),
					supplyerInfo: {name: '某某供货方公司', code: 'mb-00' + (++tag)},
					billDate: '20160802',
					brand: brands[i%6] + ':2016年7月第01批上市',
					progress: progress[i%3],
					buyerInfo: {name: '某某购货方公司', code: 'mb-00' + (++tag)},
					deliverAdress: {address: '上海市浦东新区康桥东路700号', name: 'A区仓库', code: '008'},
					deliverDate: {date: '20161102'},
					totals:{total: 10 + (++tag)}
				});
			}
			return datalist;
		}

		$httpMock({url: '/mock/data/futuresContractMagService/list',method: 'get',response: getDatas, responseTime: 500});

	}])
})(jQuery, angular);