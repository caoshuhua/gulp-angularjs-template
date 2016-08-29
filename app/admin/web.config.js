/**
 * Web框架应用基础配置服务(相当于我们经常熟悉的web.xml)
 * @param  {[type]} $       [description]
 * @param  {[type]} angular [description]
 * @return {[type]}         [description]
 */
(function($, angular){
	var module = angular.module('BgoAdmin.admin');

	module.factory('httpExceptionInvoker', ['$injector', function($injector){
		return {
			responseError: function(response){
				$injector.invoke(['webConfig', function(webConfig){
					webConfig.invorkHttpExceptions(response);
				}]);
			}
		}
	}])

	module.provider('webConfig', ['$httpProvider', function($httpProvider){
		var httpExceptions = [];
		var title;
		var logo;
		var footer;
		var loginouturl;

		var requestParams;

		var webInit;
		var webInitParams;

		if ($httpProvider.interceptors.indexOf('httpExceptionInvoker') === -1){
			$httpProvider.interceptors.push('httpExceptionInvoker');
		}
		
		/**
		 * 添加异常处理函数: httpException = {fn: ?, self: ?, resolve: ?}
		 * @param  {Function} fn  inject expression
		 * @param  {[type]}   self  指定function invork Context
		 * @param  {[type]}   resolve inject expression params
		 */
		this.addHttpException = function(httpException){
			if (!httpException || !httpException.fn){
				return;
			}
			httpExceptions.push(httpException);
		}

		/**
		 * 系统信息设置
		 * @param  {[type]} _title  标题
		 * @param  {[type]} _logo   Logo
		 * @param  {[type]} _footer footer描述
		 */
		this.setSystem = function(_title, _logo, _footer){
			title = _title;
			logo = _logo;
			footer = _footer;
		}

		/**
		 * 设置退出url地址
		 * @param {[type]} _loginouturl 
		 */
		this.setLoginouturl = function(_loginouturl){
			loginouturl = _loginouturl;
		}

		/**
		 * 设置 Web初始化函数
		 * @param {[type]} webInit inject expression
		 */
		this.setInit = function(_webInit){
			webInit = _webInit;
		}

		//实例化webConfig 服务
		this.$get = ['$rootScope', '$state', '$location', '$stateParams', '$injector', '$q', function($rootScope, $state, $location, $stateParams, $injector, $q){
			var instance = {};

			instance.getTitle = function(){return title};
			instance.getLogo = function(){return logo};
			instance.getFooter = function(){return footer};

			//执行异常
			instance.invorkHttpExceptions = function(response){
				angular.forEach(httpExceptions, function(v){
					if (!v.fn){
						return;
					}
					var locals = {};
					//初始化参数, 必须是{}对象
					if (v.resolve && !angular.isString(v.resolve) && !angular.isArray(v.resolve)){
						var values = v.resolve;
						var item;
						for (var key in values){
							item = values[key];
							if (!item){
								continue;
							}
							try {
								locals[key] = angular.isString(item) ? $injector.get(item) : $injector.invoke(item, null, null, key);
							} catch(e){
								locals[key] = item;
							}
							
						}
					}

					locals.httpResponse = response;
					
					$q.all(locals).then(function(_locals){
						$injector.invoke(v.fn, v.scope, _locals);
					});
				})
			}

			//设置待传递的业务参数
			instance.requestParams = function(params){
				if (arguments.length > 0){
					var p = requestParams;
					requestParams = undefined;
					return p;
				}
				requestParams = params;
			}

			function detectUIRouter() {
                try {
                    angular.module('ui.router');
                    return true;
                } catch(err) {
                    return false;
                }
            }

            function getRouterLocationEventName() {
                if(detectUIRouter()) {
                    return '$stateChangeSuccess';
                }
                return '$locationChangeSuccess';
            }

			$rootScope.$on(getRouterLocationEventName(), function () {
                requestParams = undefined;
            });

			//获取参数
            instance.getParams = function(){
            	var res = {
            		requestParams: this.requestParams() || {}, //业务参数
            		search: $location.$$search || {}, //UrlParam:QueryString
            		stateParams: $stateParams, //router param
            		$state: $state //router state object
				};
           	}

           	/**
           	 * web 初始化: 例如菜单、权限信息、用户信息
           	 */
           	instance.init = function(){
           		var deferred = $q.defer();
           		var resolves = {};
           		if (webInitParams){
           			return webInitParams;
           		}
           		angular.forEach(webInit, function(value, key){ //promise
           			var res = undefined;
           			try{
           				res = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
           			}catch(e){
           				res = value;
           			}
           			if (res.$promise){
           				res = res.$promise;
           			} else if (res.promise){
           				res = res.promise;
           			}
           			resolves[key] = res
           		})

           		$q.all(resolves).then(function(result){
           			deferred.resolve(result);
           		})
           		webInitParams = deferred.promise;
           		return webInitParams;
			}

			return instance;
		}];
	}]);

})(jQuery, angular);