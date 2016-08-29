(function($, angular){
	var module = angular.module('BgoAdmin.admin.futuresContractMag');
	module.controller('FuturesContractMagController', 
		['$scope',
		'futuresContractMagService',
		'ngAlert',
		'ngDialog',
		function($scope, service, ngAlert, ngDialog){
			//定义model
			$scope.tableDatas = undefined;
			$scope.tableOptions = {
				options: {
					columns: [
						{},
						{formatter: supplyerInfoFormatter},
						{},{},{},
						{formatter: buyerInfoFormatter},
						{formatter: deliverAdressFormatter},
						{formatter: deliverDateFormatter},
						{formatter: totalsFormatter}
					]
				}
			};

			//定义搜索界面model
			$scope.queryParams = {};
			$scope.uiStartDateoptions = {};
			$scope.uiEndDateoptions = {};

			//定义Methods
			$scope.queryUsers = function(params){
				console.log('-------queryParams: ' + JSON.stringify(params || {}));
				$scope.tableDatas = service.query();
			}

			$scope.addUser = function(){
				ngDialog.open({
					controller: angular.noop,
					width: 1100,
					templateUrl: 'app/admin/pages/futuresContractMag/add/index.html'
				});
			}

			$scope.aaaa = function(){

				console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
			}

			function supplyerInfoFormatter(v, row){
				var html = [];
				html.push(
					'<div class="card-views cart-views-xs">',
						'<div class="card-view" style="text-align: left;">',
							'<span class="title" >',
							'单据编号:',
							'</span>',
							'<span class="value">',
							v.code,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'供货方编码:',
							'</span>',
							'<span class="value">',
							v.code,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'供货方名称:',
							'</span>',
							'<span class="value">',
							v.name,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'发货仓库编码:',
							'</span>',
							'<span class="value">',
							v.code,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'发货仓库名称:',
							'</span>',
							'<span class="value">',
							v.name,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'<a type="button" class="btn btn-primary btn-xs cell-command" data-row-id="'+ row.id +'">合同跟踪</a>',
							'</span>',
						'</div>',
					'</div>'
				)

				return html.join('');
			}
		
			function buyerInfoFormatter(v, row){
				var html = [];
				html.push(
					'<div class="card-views cart-views-xs">',
						'<div class="card-view" style="text-align: left;">',
							'<span class="title" >',
							'片区:',
							'</span>',
							'<span class="value">',
							v.code,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'单位:',
							'</span>',
							'<span class="value">',
							v.name,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'购货方编码:',
							'</span>',
							'<span class="value">',
							v.code,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'购货方名称:',
							'</span>',
							'<span class="value">',
							v.name,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'虚拟仓编码:',
							'</span>',
							'<span class="value">',
							v.code,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'虚拟仓名称:',
							'</span>',
							'<span class="value">',
							v.name,
							'</span>',
						'</div>',
					
					'</div>'
				)

				return html.join('');
			}

			function totalsFormatter(v){
				var html = [];
				html.push(
					'<div class="card-views cart-views-xs">',
						'<div class="card-view" style="text-align: left;">',
							'<span class="title" >',
							'合同总量/总额:',
							'</span>',
							'<span class="value">',
							v.total,
							'/1000万',
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'发货数量/金额:',
							'</span>',
							'<span class="value">',
							v.total,
							'/1000万',
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'收货数量/金额:',
							'</span>',
							'<span class="value">',
							v.total,
							'/1000万',
							'</span>',
						'</div>',
					'</div>'
				)

				return html.join('');
			}

			function deliverDateFormatter(v){
				var html = [];
				html.push(
					'<div class="card-views cart-views-xs">',
						'<div class="card-view" style="text-align: left;">',
							'<span class="title" >',
							'货期:',
							'</span>',
							'<span class="value">',
							v.date,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'首批:',
							'</span>',
							'<span class="value">',
							v.date,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'最后:',
							'</span>',
							'<span class="value">',
							v.date,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'上市:',
							'</span>',
							'<span class="value">',
							v.date,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'签订:',
							'</span>',
							'<span class="value">',
							v.date,
							'</span>',
						'</div>',
					'</div>'
				)

				return html.join('');

			}

			function deliverAdressFormatter(v){
				var html = [];
				html.push(
					'<div class="card-views cart-views-xs">',
						'<div class="card-view" style="text-align: left;">',
							'<span class="title" >',
							'订货门店编码',
							'</span>',
							'<span class="value">',
							v.code,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'订货门店名称:',
							'</span>',
							'<span class="value">',
							v.name,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'接受仓库编码:',
							'</span>',
							'<span class="value">',
							v.code,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'接受仓库名称:',
							'</span>',
							'<span class="value">',
							v.name,
							'</span>',
						'</div>',

						'<div class="card-view" style="text-align: left;">',
							'<span class="title">',
							'送货地址:',
							'</span>',
							'<span class="value">',
							v.address,
							'</span>',
						'</div>',
					'</div>'
				)

				return html.join('');

			}
	}])

})(jQuery, angular);