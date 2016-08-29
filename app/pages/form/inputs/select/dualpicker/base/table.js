(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.controller('baseDuallistTableConTroller', 
		['$scope', 
		'$element',
		'selectOptions', 
		'selectionNodes',
		'$templateCache',
		'$compile',
		'ngAlert',
		'ngConfirm',
		'InputDsService',
		'$timeout',
		function($scope, $element, selectOptions, selectionNodes, $templateCache, $compile, ngAlert, ngConfirm, inputDsService, $timeout){
			var that = this;
			//select list
			$scope.selectedStyle = {};
			$scope.selectedList = undefined;
			$scope.inverseSelectedList = undefined;

			//chosen
			$scope.chosenDatas = {};
			$scope.chosenOptions = {options: {}};
			$scope.selecteChosenDatas = undefined;
			$scope.chosenAvdSearchParams = undefined;
			//chosen数据加载
			$scope.queryChosenDatas = function(params){
				$scope.chosenDatas = inputDsService.tableDatas($.extend(true, {}, params.queryParams.query || {}));
			}

			initOptions();
			initTableOptions(); //初始化表格数据

			function initOptions(){
				$scope.selectedStyle.height = selectOptions.pickerHeight;

				//初始化选择数据
				if (selectOptions.textNgResource){
					selectOptions.textNgResource({ids: selectionNodes})
						.$promise.then(function(datas){
							$scope.selectedList = datas;
						}, function(){
							$scope.selectedList = [];
						});
				}
			}

			function initTableOptions(){
				var chosenOptions = $scope.chosenOptions;
				var stateColumn = {};

				if (selectOptions.singleSelect){//如果单选
					stateColumn.radio = true;
				} else {
					stateColumn.checkbox = true;
				}
				chosenOptions.options.columns = [stateColumn];
				chosenOptions.options.height = selectOptions.pickerHeight;
				chosenOptions.options.singleSelect = selectOptions.singleSelect;
				chosenOptions.options.avdSearchTpl = 'app/pages/form/inputs/select/dualpicker/base/table-search.html';
				chosenOptions.options.idField = selectOptions.idField;
				chosenOptions.options.textField = selectOptions.textField;
				chosenOptions.options.onResetView = onResetTableView;
			}

			//选择数据
			$scope.doSelect = function(){
				var chosenDatas = $scope.selecteChosenDatas;
				if (!chosenDatas || chosenDatas.length === 0){
					ngAlert.error('请'+ (selectOptions.singleSelect ? '选择一条' : '至少选择一条') +'数据');
					return;
				}

				if (selectOptions.singleSelect){
					$scope.selectedList = [{id: chosenDatas[0][selectOptions.idField], text: chosenDatas[0][selectOptions.textField]}];
					updateSelectOptions();
					return;
				} else {
					var newSelectedDatas = [];
					var selectedList = $scope.selectedList || [];
					angular.forEach(chosenDatas || [], function(v){
						for (var i = 0; i < selectedList.length; i++) {
							if (selectedList[i].id == v[selectOptions.idField]){
								return;
							}
						}
						newSelectedDatas.push({id: v[selectOptions.idField], text: v[selectOptions.textField]});
					})

					if (newSelectedDatas.length > 0){
						$scope.selectedList = [].concat(selectedList, newSelectedDatas);
					}
				}
			}

			function onResetTableView(){
				$timeout.cancel(onResetTableView.promise);
				onResetTableView.promise = $timeout(function(){
					if ($scope.tableReference){
						var _selectListKeys = $scope.selectedList || [];
						for (var i = 0; i < _selectListKeys.length; i++) {
							var record = $scope.tableReference.bootstrapTable('getRowByUniqueId', _selectListKeys[i].id);
							if (record){
								$scope.tableReference.bootstrapTable('checkByRecord', true, record);
							}
						}
					}
					
				}, 100);
			}
			//删除数据
			$scope.doDelete = function(){
				var deletesList = $scope.inverseSelectedList;
				if (!deletesList || deletesList.length === 0){
					ngAlert.error('请选择你要删除的数据');
					return;
				}
				ngConfirm('确认要删除吗?').then(function(res){
					if (res.value){
						var _d = [];
						angular.forEach($scope.selectedList || [], function(v){
							for (var i = 0; i < deletesList.length; i++) {
								if (deletesList[i] == v.id){
									return;
								}
							}
							_d.push(v);
						})

						$scope.selectedList = _d;
						$scope.inverseSelectedList = [];
						if ($scope.tableReference){
							for (var i = 0; i < deletesList.length; i++) {
								var record = $scope.tableReference.bootstrapTable('getRowByUniqueId', deletesList[i]);
								if (record){
									$scope.tableReference.bootstrapTable('checkByRecord', false, record);
								}
							}
						}
					}
			    })
			}
	}]);
})(jQuery, angular);