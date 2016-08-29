/**
 * Bootstrap Table Chinese translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';
    var sprintf = $.fn.bootstrapTable.utils.sprintf;
    $.fn.bootstrapTable.locales['zh-CN'] = {
        formatLoadingMessage: function () {
            return '正在努力地加载数据中，请稍候……';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '每页 ' + pageNumber + ' 条记录';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '第 ' + pageFrom + ' 到 ' + pageTo + ' 条，共 ' + totalRows + ' 条';
        },
        formatSearch: function () {
            return '搜索';
        },
        formatNoMatches: function () {
            return '没有找到匹配的记录';
        },
        formatPaginationSwitch: function () {
            return '隐藏/显示分页';
        },
        formatRefresh: function () {
            return '刷新';
        },
        formatToggle: function () {
            return '切换';
        },
        formatColumns: function () {
            return '列';
        },

        formatDetailPagination: function (totalRows) {
            return sprintf('共计 %s 行', totalRows);
        },
       
        formatAllRows: function () {
            return '全部';
        },
        formatAdvancedSearch: function() {
            return '高级查询';
        },
        formatAdvancedCloseButton: function() {
            return "关闭";
        },
        formatAdvancedSearchButton: function() {
            return "查询";
        },
        formatExport: function(){
            return "导出";
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

})(jQuery);