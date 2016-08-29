(function($, angular){
	var module = angular.module('BgoAdmin.admin.futuresContractMag');
	module.controller('FuturesContractAddController', 
		['$scope',
		'futuresContractMagService',
		'ngAlert',
		'$StateParams111',
		"$stateParams",
		function($scope, service, ngAlert, $StateParams111, $stateParams){
			
			var aaaaaaaaaaa = $StateParams111._getUrlParams();
			var aaaaaaaaaaaaaa = $StateParams111._getState();
			var aaaaaaaddddddaaaa = $StateParams111._getParams();
			
			//初始化表单基本信息
			 $scope.socialProfiles = [
			      {
			        name: '执行数量',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '1000000'
			    },
			     {
			        name: '执行金额',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '1000000'
			    },
			    {
			        name: '发货数量',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '1000000'
			    },{
			        name: '发货金额',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '1000000'
			    },{
			        name: '收货数量',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '1000000'
			    },{
			        name: '收货金额',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '1000000'
			    },{
			        name: '制单人',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '王秀夫'
			    },{
			        name: '制单时间',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '2016-08-03 16:08'
			    },{
			        name: '审批人',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '王聪'
			    },{
			        name: '审批时间',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '2016-08-03 16:08'
			    },{
			        name: '撤销人',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '王秀夫'
			    },{
			        name: '撤销时间',
			        href: 'https://www.facebook.com/akveo/',
			        icon: 'socicon-facebook',
			        value: '2016-08-03 16:08'
			    }
			 ];

			 $scope.qrcodeurl = 'http://10.100.20.178:3000/erweima.png';

			//定义model
			$scope.orderInfo = {};

			$scope.closeDialog = function(){
				$scope.$parent.closeThisDialog();
			}

			$scope.doSave = function(){
				console.log('[debuge]doSave argument:' + JSON.stringify($scope.orderInfo));
				ngAlert.info('操作成功');
			}
	}])

})(jQuery, angular);