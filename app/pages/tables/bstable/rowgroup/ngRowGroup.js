
/**
 * 行分组插件
 * @author xiufu.wang
 * @param  {[type]} $       [description]
 * @param  {[type]} angular [description]
 * @return {[type]}         [description]
 */
(function($, angular){
	

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initBody = BootstrapTable.prototype.initBody,
        _updateSelected = BootstrapTable.prototype.updateSelected,
        sprintf = $.fn.bootstrapTable.utils.sprintf,
        getFieldIndex = $.fn.bootstrapTable.utils.getFieldIndex,
        calculateObjectValue = $.fn.bootstrapTable.utils.calculateObjectValue;

    
    function getItemField (item, field, escape) {
        var value = item;

        if (typeof field !== 'string' || item.hasOwnProperty(field)) {
            return escape ? escapeHTML(item[field]) : item[field];
        }
        var props = field.split('.');
        for (var p in props) {
            value = value && value[props[p]];
        }
        return escape ? escapeHTML(value) : value;
    };

    function escapeHTML(text) {
        if (typeof text === 'string') {
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
                .replace(/`/g, '&#x60;');
        }
        return text;
    };

   function createGroupTd(maxRows, column, realItem, item, itemIndex, field, fieldIndex, realItemIndex, csses){
        var text = '',
            that = this,
            value = getItemField(realItem, field, that.options.escape),
            type = '',
            cellStyle = {},
            id_ = '',
            class_ = that.header.classes[fieldIndex],
            data_ = '',
            rowspan_ = '',
            title_ = '';
            
            style = sprintf('style="%s"', csses.concat(that.header.styles[fieldIndex]).join('; '));
            cellStyle = calculateObjectValue(that.header,that.header.cellStyles[fieldIndex], [value, realItem, realItemIndex, item, itemIndex, column], cellStyle);
            value = calculateObjectValue(column,that.header.formatters[fieldIndex], [value, realItem, realItemIndex, item, itemIndex, column], value);
            
            if (item['_' + field + '_id']) {
                id_ = sprintf(' id="%s"', item['_' + field + '_id']);
            }
            
            rowspan_ = sprintf(' rowspan="%s"', maxRows);
            
            if (cellStyle.classes) {
                class_ = sprintf(' class="%s"', cellStyle.classes);
            }
            if (cellStyle.css) {
                var csses_ = [];
                for (var key in cellStyle.css) {
                    csses_.push(key + ': ' + cellStyle.css[key]);
                }
                style = sprintf('style="%s"', csses_.concat(that.header.styles[fieldIndex]).join('; '));
            }

            if (column.checkbox || column.radio) {
                type = column.checkbox ? 'checkbox' : type;
                type = column.radio ? 'radio' : type;

                text = [sprintf('<td style="vertical-align: middle;" class="bs-checkbox %s" %s %s>', column['class'] || '', rowspan_, ' data-groupitemindex=' + realItemIndex),
                    '<input ' +
                    sprintf(' data-index="%s"', itemIndex) +
                    sprintf(' name="%s"', that.options.selectItemName) +
                    sprintf(' type="%s"', type) +
                    sprintf(' value="%s"', item[that.options.idField]) +
                    sprintf(' checked="%s"', value === true ||
                    (value && value.checked) ? 'checked' : undefined) +
                    sprintf(' disabled="%s"', !column.checkboxEnabled ||
                    (value && value.disabled) ? 'disabled' : undefined) +
                    ' />',
                    that.header.formatters[fieldIndex] && typeof value === 'string' ? value : '',
                    '</td>'
                ].join('');
                item[that.header.stateField] = value === true || (value && value.checked);
            } else {
                value = typeof value === 'undefined' || value === null ? that.options.undefinedText : value;
                text = [sprintf('<td%s %s %s %s %s %s %s>', id_, class_, style, data_, rowspan_, title_, ' data-groupitemindex=' + realItemIndex),
                    value,
                    '</td>'
                ].join('');
            }
            
        return text;
    }

    function getGroupsMaxRows(multipleGroups, item){
        var rowCount = 1
        if (!multipleGroups && !multipleGroups.length){
            return 0;
        }
          
        angular.forEach(multipleGroups, function(v){
            rowCount = Math.max(rowCount, getGroupRows(item, v));
        })
          
        return rowCount;
    }

    function getGroupRows(item, groups, index){
        var rowCount = 0;
        index = index || 0;
        if (!groups || !groups.length || !item[groups[index]] || !item[groups[index]].length){
            return rowCount;
        }
        if(groups.length == (index + 1)){
            return item[groups[index]].length;
        }
          var childs = item[groups[index]];
        for (var ii=0; ii<childs.length; ii++){
            rowCount = rowCount + getGroupRows(childs[ii],groups, index + 1);
        }
        return rowCount;
    }

    function createObjectGetPathFn(paths){
        var funBody = [
            'try{',
            'if (!paths || !paths.length){return row;}',
            'return row.',
            paths.join('.'),
            ';',
            '}catch(e){return undefined;}'
        ];
        return new Function('row', funBody.join(''));
    }

    function getRowGroupDatas(item, groups, index, datas){
        if (typeof index === 'undefined'){
            index = 0;
        }
        if (groups.length == (index + 1)){
            angular.forEach(item[groups[index]] || [], function(v){
                datas.push(v);
            })
            return;
        }
        
        angular.forEach(item[groups[index]] || [], function(v){
           getRowGroupDatas(v, groups, (index + 1), datas);
        })
    }

    function getTr(trs, index){
        if (trs[index]){
            return trs[index];
        }
        return (trs[index] = []);
    }

    function getLasetGroupTr(index, $container){
        return $container.find('tr[data-index="'+ index +'"]:last');
    }

     BootstrapTable.prototype.updateSelected = function () {
        var rowGroups = this.options.rowGroup;
        if (!rowGroups || $.trim(rowGroups) == ''){
            _updateSelected.apply(this, Array.prototype.slice.apply(arguments));
            return;
        }

        var that = this;
        var checkAll = this.$selectItem.filter(':enabled').length &&
            this.$selectItem.filter(':enabled').length ===
            this.$selectItem.filter(':enabled').filter(':checked').length;

        this.$selectAll.add(this.$selectAll_).prop('checked', checkAll);

        this.$selectItem.each(function () {
            var _that = this;
            $(this).closest('tr').each(function(){
                var index = $(this).data('index');
                that.$body.find('tr[data-index="'+ index +'"]')[$(_that).prop('checked') ? 'addClass' : 'removeClass']('selected');
            })
        });
    };

    BootstrapTable.prototype.initBody = function (fixedScroll) {
        var rowGroups = this.options.rowGroup;
        if (!rowGroups || $.trim(rowGroups) == ''){
            _initBody.apply(this, Array.prototype.slice.apply(arguments));
            return;
        }
        
        //启用行分组插件
        var that = this,
            html = [],
            multipleGroups = [];
            data = this.getData();

        if (rowGroups.indexOf(',') !== -1){
            rowGroups = rowGroups.split(',');
            angular.forEach(rowGroups, function(v){
                if ($.trim(v) == ''){
                    return;
                }
                multipleGroups.push(v.split('\.'));
            })
        } else{
            multipleGroups.push(rowGroups.split('\.'));
        }
            
        this.trigger('pre-body', data);

        this.$body = this.$el.find('>tbody');
        if (!this.$body.length) {
            this.$body = $('<tbody></tbody>').appendTo(this.$el);
        }

        //Fix #389 Bootstrap-table-flatJSON is not working

        if (!this.options.pagination || this.options.sidePagination === 'server') {
            this.pageFrom = 1;
            this.pageTo = data.length;
        }

        for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
            var key,
                item = data[i],
                style = {},
                csses = [],
                data_ = '',
                attributes = {},
                htmlAttributes = [];

            style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);

            if (style && style.css) {
                for (key in style.css) {
                    csses.push(key + ': ' + style.css[key]);
                }
            }

            attributes = calculateObjectValue(this.options,
                this.options.rowAttributes, [item, i], attributes);

            if (attributes) {
                for (key in attributes) {
                    htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])));
                }
            }

            if (item._data && !$.isEmptyObject(item._data)) {
                $.each(item._data, function (k, v) {
                    // ignore data-index
                    if (k === 'index') {
                        return;
                    }
                    data_ += sprintf(' data-%s="%s"', k, v);
                });
            }

            var groupTrs = [];
            var maxRows = getGroupsMaxRows(multipleGroups, item);
            
            if (this.options.detailView) {
                getTr(groupTrs, 0).push('<td style="vertical-align: middle;" rowspan="'+ maxRows +'">',
                    '<a class="detail-icon" href="javascript:">',
                    sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen),
                    '</a>',
                    '</td>');
            }
            
            $.each(this.header.fields, function (j, field) {
                var column = that.columns[getFieldIndex(that.columns, field)],
                    childPath = column.rowGpChildPath,
                    groupPath = column.rowGpPath,
                    childPaths = [],
                    groupPaths = [],
                    realItems = [];

                if (!column.visible) {
                    return;
                }
                
                //if (that.options.detailView){fieldIndex = fieldIndex + 1}
                
                if ($.trim(childPath) != ''){
                    childPaths = childPath.split('\.');
                }
                
                if ($.trim(groupPath) != ''){
                    groupPaths = groupPath.split('\.');
                }
                
                if (groupPaths.length == 0){
                    realItems.push(item);
                } else {
                    getRowGroupDatas(item, groupPaths, 0, realItems);
                }
                
                angular.forEach(realItems, function(v, index){
                    var rowspan;
                    if (groupPaths.length == 0){
                        rowspan = maxRows;
                    } else {
                        if (childPaths.length === 0){
                            rowspan = 1;
                        } else{
                            var childs = [];
                            getRowGroupDatas(v, childPaths, 0, childs);
                            rowspan = childs.length > 0 ? childs.length : 1;
                        }
                        
                    }
                    getTr(groupTrs, index).push(createGroupTd.call(that ,rowspan, column, v, item, i, field, j, index, csses));
                })
            });
            
            var trDom = ['<tr',
                sprintf(' %s', htmlAttributes.join(' ')),
                sprintf(' id="%s"', $.isArray(item) ? undefined : item._id),
                sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)),
                sprintf(' data-index="%s"', i),
                sprintf(' data-uniqueid="%s"', item[this.options.uniqueId]),
                sprintf('%s', data_),
                '>'
            ].join('');

            for (var r = 0; r < groupTrs.length; r++) {
               html.push(trDom, groupTrs[r].join(''), '</tr>'); 
            }
        }

        // show no records
        if (!html.length) {
            html.push('<tr class="no-records-found">',
                sprintf('<td colspan="%s">%s</td>',
                    this.$header.find('th').length, this.options.formatNoMatches()),
                '</tr>');
        }

        this.$body.html(html.join(''));

        if (!fixedScroll) {
            this.scrollTo(0);
        }

        // click to select by column
        this.$body.find('> tr[data-index] > td').off('click dblclick').on('click dblclick', function (e) {
            var $td = $(this),
                $tr = $td.parent(),
                item = that.data[$tr.data('index')],
                index = $td[0].cellIndex,
                field = that.header.fields[that.options.detailView ? index - 1 : index],
                column = that.columns[getFieldIndex(that.columns, field)],
                value,
                childPath = column.rowGpChildPath,
                groupPath = column.rowGpPath,
                childPaths = [],
                groupPaths = [],
                realItems = [],
                groupitemindex = $td.data('groupitemindex');
        
            if ($td.find('.detail-icon').length) {
                return;
            }
            
            if ($.trim(childPath) != ''){
                childPaths = childPath.split('\.');
            }
            
            if ($.trim(groupPath) != ''){
                groupPaths = groupPath.split('\.');
            }
            //获取value
            if (groupPaths.length == 0){
                realItems.push(item);
            } else {
                getRowGroupDatas(item, groupPaths, 0, realItems);
            }
            var realItem = realItems[parseInt(typeof groupitemindex === 'undefined' ? '0' : groupitemindex)];
            value = getItemField(realItem, field, that.options.escape);
            
            that.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, realItem, $td, item, $tr.data('index'), groupitemindex, column);
            that.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', realItem, $tr, item, $tr.data('index'), groupitemindex, column);

            // if click to select - then trigger the checkbox/radio click
            if (e.type === 'click' && that.options.clickToSelect && column.clickToSelect) {
                var $selectItem = $tr.find(sprintf('[name="%s"]', that.options.selectItemName));
                if ($selectItem.length) {
                    $selectItem[0].click(); // #144: .trigger('click') bug
                }
            }
        });

        this.$body.find('> tr[data-index] > td > .detail-icon').off('click').on('click', function () {
            var $this = $(this),
                $tr = $this.parent().parent(),
                index = $tr.data('index'),
                row = data[index]; // Fix #980 Detail view, when searching, returns wrong row

            // remove and update
            var $lastTr = getLasetGroupTr(index, that.$body);
            if ($lastTr.next().is('tr.detail-view')) {
                $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailOpen));
                $lastTr.next().remove();
                that.trigger('collapse-row', index, row);
            } else {
                $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailClose));
                $lastTr.after(sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.find('td').length));
                var $element = $lastTr.next().find('td');
                var content = calculateObjectValue(that.options, that.options.detailFormatter, [index, row, $element], '');
                if($element.length === 1) {
                    $element.append(content);
                }
                that.trigger('expand-row', index, row, $element);
            }
            that.resetView();
        });

        this.$selectItem = this.$body.find(sprintf('[name="%s"]', this.options.selectItemName));
        this.$selectItem.off('click').on('click', function (event) {
            event.stopImmediatePropagation();

            var $this = $(this),
                checked = $this.prop('checked'),
                row = that.data[$this.data('index')];

            if (that.options.maintainSelected && $(this).is(':radio')) {
                $.each(that.options.data, function (i, row) {
                    row[that.header.stateField] = false;
                });
            }

            row[that.header.stateField] = checked;

            if (that.options.singleSelect) {
                that.$selectItem.not(this).each(function () {
                    that.data[$(this).data('index')][that.header.stateField] = false;
                });
                that.$selectItem.filter(':checked').not(this).prop('checked', false);
            }

            that.updateSelected();
            that.trigger(checked ? 'check' : 'uncheck', row, $this);
        });

        this.updateSelected();
        this.resetView();
        this.trigger('post-body');
    };

})(jQuery, angular);