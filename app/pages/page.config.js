!(function(){
    'use strict';

    angular.module('BlurAdmin.pages.config', [])
    .provider('$bgoConfig', [function(){
        var that = this;
        var defaultConfig = {
            //是否显示帮助菜单
            showHelpMenus: true,
            enableMock: true
        };
        function Config(options){
            Config.options = angular.extend({}, defaultConfig, options || {});
        };

        that.Config = Config;
        Config.options = defaultConfig;
        that.$get = [function(){
            return that.Config;
        }];
    }]);
})();