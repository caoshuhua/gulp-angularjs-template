(function($, angular){
	$.extend($.fn.bootstrapTable.defaults, {
       parentField: 'pid',
       clickableNodeNames: false
    });

    var dataTTId = 'data-tt-id',
        dataTTParentId = 'data-tt-parent-id'


    var getParentRowId = function (that, id) {
        var parentRows = that.$body.find('tr').not('[' + 'data-tt-parent-id]');

        for (var i = 0; i < parentRows.length; i++) {
            if (i === id) {
                return $(parentRows[i]).attr('data-tt-id');
            }
        }

        return undefined;
    };
    
    function rowAttr(row, index){
        var parentField = this.parentField || 'pid';
        var idField = this.idField || 'id';
        var res = {};
        res[dataTTId] = row[this.idField];
        if (row[parentField] && $.trim(row[parentField]) != ''){
            res[dataTTParentId] = row[parentField]
        }
        return res;
    }

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initData = BootstrapTable.prototype.initData;

    BootstrapTable.prototype.init = function(){
        var that = this;
        if (!this.options.sortName) {
            if (this.options.treeView){
                this.options.rowAttributes = rowAttr;
                this.$el.on('post-body.bs.table', function () {
                that.$el.treetable({
                    expandable: true,
                    clickableNodeNames: that.options.clickableNodeNames
                }, true);
            })
            }
        }

        _init.apply(this, Array.prototype.slice.apply(arguments));
    }

    BootstrapTable.prototype.expandAll = function () {
        this.$el.treetable('expandAll');
    };

    BootstrapTable.prototype.collapseAll = function () {
        this.$el.treetable('collapseAll');
    };

    BootstrapTable.prototype.expandNode = function (id) {
        id = getParentRowId(this, id);
        if (id !== undefined) {
            this.$el.treetable('expandNode', id);
        }
    };
	
})(jQuery, angular);