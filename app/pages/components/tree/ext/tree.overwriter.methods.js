(function($, angular){
	$.jstree.core.prototype.select_node = function(obj, supress_event, prevent_open, e){
			var dom, t1, t2, th;
			if($.isArray(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.select_node(obj[t1], supress_event, prevent_open, e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(!obj.state.selected) {
				obj.state.selected = true;
				this._data.core.selected.push(obj.id);
				if(!prevent_open) {
					dom = this._open_to(obj);
				}
				if(dom && dom.length) {
					dom.attr('aria-selected', true).children('.jstree-anchor').addClass('jstree-clicked');
				}
				if(!supress_event) {
					this.trigger('select_node', { 'node' : obj, 'selected' : this._data.core.selected, 'event' : e });	
					this.trigger('changed', { 'action' : 'select_node', 'node' : obj, 'selected' : this._data.core.selected, 'event' : e });
				}
			}
		}


		$.jstree.core.prototype.select_all = function(supress_event){
			var tmp = this._data.core.selected.concat([]), i, j;
			this._data.core.selected = this._model.data[$.jstree.root].children_d.concat();
			for(i = 0, j = this._data.core.selected.length; i < j; i++) {
				if(this._model.data[this._data.core.selected[i]]) {
					this._model.data[this._data.core.selected[i]].state.selected = true;
				}
			}
			this.redraw(true);
			if(!supress_event) {
				this.trigger('select_all', { 'selected' : this._data.core.selected });
				this.trigger('changed', { 'action' : 'select_all', 'selected' : this._data.core.selected, 'old_selection' : tmp });
			}
		}

		$.jstree.core.prototype.deselect_node = function(obj, supress_event, e){
			var t1, t2, dom;
			if($.isArray(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.deselect_node(obj[t1], supress_event, e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(obj.state.selected) {
				obj.state.selected = false;
				this._data.core.selected = $.vakata.array_remove_item(this._data.core.selected, obj.id);
				if(dom.length) {
					dom.attr('aria-selected', false).children('.jstree-anchor').removeClass('jstree-clicked');
				}
				
				if(!supress_event) {
					this.trigger('deselect_node', { 'node' : obj, 'selected' : this._data.core.selected, 'event' : e });
					this.trigger('changed', { 'action' : 'deselect_node', 'node' : obj, 'selected' : this._data.core.selected, 'event' : e });
				}
			}
		}

		$.jstree.core.prototype.deselect_all = function(supress_event){
			var tmp = this._data.core.selected.concat([]), i, j;
			for(i = 0, j = this._data.core.selected.length; i < j; i++) {
				if(this._model.data[this._data.core.selected[i]]) {
					this._model.data[this._data.core.selected[i]].state.selected = false;
				}
			}
			this._data.core.selected = [];
			this.element.find('.jstree-clicked').removeClass('jstree-clicked').parent().attr('aria-selected', false);
			
			if(!supress_event) {
				this.trigger('deselect_all', { 'selected' : this._data.core.selected, 'node' : tmp });
				this.trigger('changed', { 'action' : 'deselect_all', 'selected' : this._data.core.selected, 'old_selection' : tmp });
			}
		}

		var _load_node = $.jstree.core.prototype._load_node;
		$.jstree.core.prototype._load_node = function(obj, callback){
			var s = this.settings.core, t;
			var that = this;
			if (s.ngResource){
				var data =  s.ngResource.data ? s.ngResource.data : {id: (obj && obj.id ? obj.id : undefined)};
				if (typeof data === 'function'){
					data = data(obj);
				}
				var _loadFn = s.ngResource;
				_loadFn(data).$promise.then(function(data){
					return that._append_json_data(obj, data, function(status){
						 callback.call(that, status);
					});
				}, function(response){
					callback.call(that, false);
					that.settings.core.error.call(that, response);
				})
				return;
			}
			_load_node.apply(this, Array.prototype.slice.apply(arguments));
		}
})(jQuery, angular);