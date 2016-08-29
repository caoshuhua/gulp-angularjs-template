(function($, angular){
	var module = angular.module('BgoAdmin.admin');
	module.run(['$httpMock', function($httpMock){
		//供货方信息
		$httpMock({url: '/mock/data/futuresContractMagService/ghfquery',method: 'get', responseTime: 500, response: function(httpConfig){
			var params = httpConfig.params || {};
			var term = params.term || '';
			var res = [];
			var code;
			var name;
			var tag;
			if ($.trim(term) == ''){
				return res;
			}

			for (var i = 0; i < 10; i++) {
				tag = (i + 1);
				code = 'GHF-0' + tag;
				name = code + ' ' + term + '名称'
				res.push({value: 'GHF-0' + (i+1), label: name});
			}
			return res;
		}});

		//发货仓库名称
		$httpMock({url: '/mock/data/futuresContractMagService/fhshquery',method: 'get', responseTime: 500, response: function(httpConfig){
			var params = httpConfig.params || {};
			var term = params.term || '';
			var res = [];
			var code;
			var name;
			var tag;
			if ($.trim(term) == ''){
				return res;
			}

			for (var i = 0; i < 10; i++) {
				tag = (i + 1);
				code = 'FH-SH-0' + tag;
				name = code + ' ' + term + '仓库名称'
				res.push({value: 'GHF-0' + (i+1), label: name});
			}
			return res;
		}});

	}])
})(jQuery, angular);