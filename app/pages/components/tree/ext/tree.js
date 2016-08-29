(function($, angular){
	var module = angular.module('BlurAdmin.pages.components');
	module.component('treeExampleComponent', {
		templateUrl: 'app/pages/components/tree/ext/tree.html',
		controller: ['$scope', 'ngAlert', function($scope, ngAlert){
			$scope.treeOptions = {};
			$scope.selectionTreeDatas = [{ "id": "ajson5", "text": "节点5" }];
			$scope.selectionTreeDatas1 = [{ "id": "ajson10", "text": "节点10" }, { "id": "ajson5", "text": "节点5" }];
			$scope.selectionTreeDatas2 = [{ "id": "ajson10", "text": "节点10" }, { "id": "ajson5", "text": "节点5" }];;
			$scope.selectionNodes = function(node){
				ngAlert.info('你选择的节点:' + node.text);
			}
			
			$scope.treeData = [
				{ id : 'ajson1', parent : '#', text : '节点1'},
	            { id : 'ajson2', parent : '#', text : '节点2' },
	            { id : 'ajson3', parent : 'ajson2', text : '节点3'},
	            { id : 'ajson4', parent : 'ajson2', text : '节点4'},
	            { id : 'ajson5', parent : 'ajson3', text : '节点5'},
	            { id : 'ajson6', parent : 'ajson3', text : '节点6'},
	            { id : 'ajson7', parent : 'ajson6', text : '节点7'},
	            { id : 'ajson8', parent : 'ajson6', text : '节点8'},
	            { id : 'ajson9', parent : 'ajson6', text : '节点9'},
	            { id : 'ajson10', parent : '#', text : '节点10'},
	            { id : 'ajson11', parent : '#', text : '节点11'},
	            { id : 'ajson12', parent : '#', text : '节点12'},
	            { id : 'ajson13', parent : '#', text : '节点13'},
	            { id : 'ajson14', parent : '#', text : '节点14'}
			]
		}]
	})

})(jQuery, angular);