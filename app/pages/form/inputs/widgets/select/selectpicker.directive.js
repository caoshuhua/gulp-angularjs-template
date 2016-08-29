/**
 * @author v.lugovksy
 * @author xiufu.wang
 *    增强了数据源的绑定功能,支持异步后台获取
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .directive('selectpicker', ['$parse', selectpicker]);

  /** @ngInject */
  function selectpicker($parse) {
    var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
    return {
      restrict: 'A',
      require: '?ngOptions',
      priority: 1500, // make priority bigger than ngOptions and ngRepeat
      link: {
        pre: function(scope, elem, attrs) {
          if (attrs.title){
            elem.append('<option data-hidden="true" disabled value="">' + (attrs.title || 'Select something') + '</option>');
          } else {
            elem.append('<option data-hidden="true" disabled value=""></option>');
          }
        },
        post: function(scope, elem, attrs) {
          var optionsExp = attrs.ngOptions;
          if (optionsExp){
              var match = optionsExp.match(NG_OPTIONS_REGEXP);
              var valuesFn = $parse(match[8]);
              var getWatchables = $parse(valuesFn, function(optionValues) {
                    var res = [];
                    if (angular.isArray(optionValues)){
                      angular.forEach(optionValues, function(v){
                        var o = {};
                        for (var r in v){
                          if (v.hasOwnProperty(r) && r.indexOf('$') === -1){
                            o[r] = v[r];
                          }
                        }
                        res.push(o);
                      })
                    }
                    return res;
                });

              scope.$watch(getWatchables, refresh, true);
          }

          function refresh() {
            elem.selectpicker('refresh');
          }

          if (attrs.ngModel) {
            scope.$watch(attrs.ngModel, refresh);
          }

          if (attrs.ngDisabled) {
            scope.$watch(attrs.ngDisabled, refresh);
          }

          elem.selectpicker({ dropupAuto: false, hideDisabled: true });
        }
      }
    };
  }

})();