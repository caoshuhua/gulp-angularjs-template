(function($, angular){
	var module = angular.module('BlurAdmin.pages.samplepage');
	module.run(['$httpMock', function($httpMock){
		var userDatas = {
			total: 200,
			rows: [
				{id: 'u-0001', username: 'u0001', name: '用户1', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0002', username: 'u0002', name: '用户2', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0003', username: 'u0003', name: '用户3', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0004', username: 'u0004', name: '用户4', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0005', username: 'u0005', name: '用户5', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0006', username: 'u0006', name: '用户6', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0007', username: 'u0007', name: '用户7', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0008', username: 'u0008', name: '用户8', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0009', username: 'u0009', name: '用户9', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0010', username: 'u0010', name: '用户10', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0011', username: 'u0011', name: '用户11', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0012', username: 'u0012', name: '用户12', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0013', username: 'u0013', name: '用户13', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0014', username: 'u0014', name: '用户14', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0015', username: 'u0015', name: '用户15', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0016', username: 'u0016', name: '用户16', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0017', username: 'u0017', name: '用户17', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0018', username: 'u0018', name: '用户18', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0019', username: 'u0019', name: '用户19', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'},
				{id: 'u-0020', username: 'u0020', name: '用户20', post: '职位', role: '普通用户', email: 'email@e.com', location: '华东地区'}
			]
		}

		$httpMock({url: '/mock/data/userlist',method: 'get',response: userDatas, responseTime: 10000});

		$httpMock({url: '/mock/data/usersave',method: 'post', responseTime: 10000, response: function(httpConfig){
			var data = httpConfig.data;
			var params = httpConfig.params;
			
		}});
	}])
})(jQuery, angular);