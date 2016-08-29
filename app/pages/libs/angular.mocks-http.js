(function(){
    angular.module('BlurAdmin.pages.libs')
	   .provider('$httpMock', [function(){
    		var Mock = function (config) {
                if (typeof config.response === 'function'){
                    var responseFn = config.response;
                    config.response = function(httpConfig){
                        return JSON.stringify(responseFn(httpConfig));
                    }
                } else {
                    config.response = JSON.stringify(config.response);
                }
                config.method = config.method.toLowerCase();

                Mock.mockedRequests[config.url] = Mock.mockedRequests[config.url] || {};
                Mock.mockedRequests[config.url][config.method.toLowerCase()] = config;
                
                return Mock;
            };

            Mock.mockedRequests = {};

    		Mock.getConfig = function (method, url) {
                try {
                    return Mock.mockedRequests[url][method.toLowerCase()];
                } catch (e) {
                    return undefined;
                }
            };

            this.mock = Mock;

            this.$get = function(){
                return Mock;
            }
        
         }]).factory('$httpMockConfig', [function(){
		return {
            defaults: {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                responseTime: 750,
                response: {},
                transformResponse: function (res) {
                    return angular.fromJson(res);
                },
                transformRequest: function (req) {
                    return angular.toJson(req);
                }
            },

            getResponseTime: function (responseTime) {
                if (responseTime instanceof Array) {
                    var min = responseTime[0];
                    var max = responseTime[1];
                    return Math.floor(Math.random() * (max - min)) + min;
                } else {
                    return responseTime;
                }
            },

            returnHeadersGetter: function (mockConfig) {
				return function (key) {
                    return mockConfig.headers[key];
                };
            }
        };

	   }]).config(['$provide', '$bgoConfigProvider', function($provide, $bgoConfigProvider){
    		$provide.decorator('$http', [
    			'$delegate',
                '$httpMock',
                '$q',
                '$timeout',
                '$httpMockConfig',
                function($delegate, $httpMock, $q, $timeout, Mock){
                	var oldDelegate = $delegate;

                	$delegate = function(httpConfig){
                		var mockConfig = $httpMock.getConfig(httpConfig.method, httpConfig.url);
                		if ($bgoConfigProvider.Config.options.enableMock === true && typeof mockConfig !== 'undefined'){
                            httpConfig = angular.merge({}, Mock.defaults, httpConfig);
                			var defer = $q.defer();
                			mockConfig = angular.extend({}, Mock.defaults, mockConfig);
                			$timeout(function () {
                                var response = mockConfig.response;
                                if (typeof response === 'function'){
                                    response = response(httpConfig);
                                }
                                var resolveObj = {
                                    data: httpConfig.transformResponse(response, Mock.returnHeadersGetter(mockConfig)),
                                    status: mockConfig.statusCode,
                                    headers: Mock.returnHeadersGetter(mockConfig),
                                    config: httpConfig,
                                    statusText: mockConfig.statusCode.toString()
                                };

                                var successCb = function () {};
                                var failureCb = function () {};

                                if (mockConfig.statusCode.toString().charAt(0) === '4' && mockConfig.statusCode.toString().charAt(0) === '5') {
                                    defer.reject(resolveObj);
                                    failureCb(resolveObj);
                                } else {
                                    defer.resolve(resolveObj);
                                    successCb(resolveObj);
                                }

                            }, Mock.getResponseTime(mockConfig.responseTime));


                            defer.promise.success = function (cb) {
                                successCb = cb;
                            };

                            defer.promise.failure = function (cb) {
                                failureCb = cb;
                            };

                            return defer.promise;
                		} else {
                			return oldDelegate.apply(this, arguments); 
                		}
    				}
                	
                	$delegate.get = function (url, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'GET';

                        return $delegate(config);
                    };

                    $delegate.delete = function (url, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'DELETE';

                        return $delegate(config);
                    };

                    $delegate.head = function (url, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'HEAD';

                        return $delegate(config);
                    };

                    $delegate.jsonp = function (url, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'JSONP';

                        return $delegate(config);
                    };

                    $delegate.post = function (url, data, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'POST';
                        config.data = data;

                        return $delegate(config);
                    };

                    $delegate.put = function (url, data, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'PUT';
                        config.data = data;

                        return $delegate(config);
                    };

                    $delegate.patch = function (url, data, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'PATCH';
                        config.data = data;

                        return $delegate(config);
                    };

                    return $delegate;
                }
    		])
	   }])
})();