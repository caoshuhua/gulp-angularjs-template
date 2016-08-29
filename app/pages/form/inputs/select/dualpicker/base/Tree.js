(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.controller('baseDuallistTreeConTroller', 
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
			$scope.chosenStyle = {overflow: 'auto'};
			$scope.chosenDatas = undefined;
			$scope.chosenOptions = {options: {}};
			$scope.selecteChosenDatas = undefined;
			$scope.chosenDatasource = inputDsService.tree;
			
			initOptions();
			initTreeOptions(); //初始化表格数据

			function initOptions(){
				$scope.selectedStyle.height = selectOptions.pickerHeight;
				$scope.chosenStyle.height = selectOptions.pickerHeight;
				//初始化选择数据
				if (selectOptions.textNgResource){
					selectOptions.textNgResource({ids: selectionNodes})
						.$promise.then(function(datas){
							$scope.selectedList = datas;
							$scope.onTreeReDraw();
						}, function(){
							$scope.selectedList = [];
							$scope.onTreeReDraw();
						});
				}
			}

			function initTreeOptions(){
				if (selectOptions.singleSelect){//如果单选
					$scope.chosenOptions.options.multiple = false;
				} else {
					$scope.chosenOptions.options.multiple = true;
				}
				$scope.chosenOptions.options.containParentNode = selectOptions.containParentNode;
			}

			//当tree完成渲染之后
			$scope.onTreeReDraw = function(nodes){
				if ($scope.treeReference){
					if (!selectOptions.singleSelect){
				 		$scope.treeReference.jstree('uncheck_all', true);
						$scope.treeReference.jstree('check_node', $scope.selectedList || [], null ,true);
					} else {
				 		$scope.treeReference.jstree('select_node', $scope.selectedList || [], true);
				 	}
				}
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
						$scope.onTreeReDraw();
					}
			    })
			}
	}]);
	
})(jQuery, angular);