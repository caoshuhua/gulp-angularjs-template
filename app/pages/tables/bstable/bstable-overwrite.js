(function($, angular){
	var BootstrapTable = $.fn.bootstrapTable.Constructor,
          _events = BootstrapTable.EVENTS,
          calculateObjectValue = $.fn.bootstrapTable.utils.calculateObjectValue;
     /**
      * 扩展server-search.bs.table 事件
      */
     _events['server-search.bs.table'] = 'onServerSearch';

     /**
      * 重写initServer方法 忽略client加载
      * @param  {[type]} silent [description]
      * @param  {[type]} query  [description]
      * @return {[type]}        [description]
      */
     BootstrapTable.prototype.initServer = function(silent, query){
          var that = this;
          
          var that = this,
          data = {},
          params = {
               searchText: this.searchText,
               sortName: this.options.sortName,
               sortOrder: this.options.sortOrder
          };

          if(this.options.pagination) {
               params.pageSize = this.options.pageSize === this.options.formatAllRows() ?
               this.options.totalRows : this.options.pageSize;
               params.pageNumber = this.options.pageNumber;
          }

          if (this.options.queryParamsType === 'limit') {
               params = {
                    search: params.searchText,
                    sort: params.sortName,
                    order: params.sortOrder
               };
               if (this.options.pagination) {
                    params.limit = this.options.pageSize === this.options.formatAllRows() ?
                    this.options.totalRows : this.options.pageSize;
                    params.offset = this.options.pageSize === this.options.formatAllRows() ?
                    0 : this.options.pageSize * (this.options.pageNumber - 1);
               }
          }

          if (!($.isEmptyObject(this.filterColumnsPartial))) {
               params['filter'] = JSON.stringify(this.filterColumnsPartial, null);
          }

          data = calculateObjectValue(this.options, this.options.queryParams, [params], data);

          var ngContext = that.options.ngContext;
          if (ngContext){
               $.extend(data, query || {}, ngContext.$scope.avdQueryParams || {});
          } else {
               $.extend(data, query || {});
          }
          
          // false to stop request
          if (data === false) {
               return;
          }

          that.trigger('server-search', {query: data});
     }

     /**
      * 重写refresh方法 忽略Url配置
      * @param  {[type]} params [description]
      * @return {[type]}        [description]
      */
     BootstrapTable.prototype.refresh = function(params){
          this.options.pageNumber = 1;
          this.initServer(false, params && params.query)
     }

     /**
      * 重新onSort方法，统一仅支持Client Sort
      * @param  {[type]} event [description]
      * @return {[type]}       [description]
      */
     BootstrapTable.prototype.onSort = function (event) {
          var $this = event.type === "keypress" ? $(event.currentTarget) : $(event.currentTarget).parent(),
          $this_ = this.$header.find('th').eq($this.index());

          this.$header.add(this.$header_).find('span.order').remove();

          if (this.options.sortName === $this.data('field')) {
               this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
          } else {
               this.options.sortName = $this.data('field');
               this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc';
          }
          this.trigger('sort', this.options.sortName, this.options.sortOrder);

          $this.add($this_).data('order', this.options.sortOrder);

          // Assign the correct sortable arrow
          this.getCaret();
          this.initSort();
          this.initBody();
     }

    $.fn.bootstrapTable.methods.push('checkByRecord');
    BootstrapTable.prototype.checkByRecord = function (checked, record) {
    var options = this.options;
    var idField = options.idField || 'id';
        if (!record || !record.hasOwnProperty(idField) || !record[idField]) {
            return;
        }

        var that = this,
            rows = [];
        $.each(options.data, function (index, row) {
            if (row[idField] == record[idField]){
               var $el = that.$selectItem.filter(':enabled')
                    .filter('[data-index="'+ index +'"]').prop('checked', checked);
                row[that.header.stateField] = checked;
                rows.push(row);
                that.trigger(checked ? 'check' : 'uncheck', row, $el);
            }
        });
        this.updateSelected();
        this.trigger(checked ? 'check-some' : 'uncheck-some', rows);
    };
	
})(jQuery, angular);