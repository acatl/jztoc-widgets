$.ui.uicomponent.subclass("ui.grid", {
	options : {
		dataProvider : null,
		columns : [],
		rowFunction : null
	},

	_create : function() {
		this.element.addClass("ui-grid");
		if (this.options.id == null || this.options.id == "") {
			this.options.id = this._guid();
		}
		this.table = $('<table></table>').attr("id", this.options.id).addClass('grid').appendTo(this.element);
		this.tableHead = $('<thead></thead>').appendTo(this.table);
		this.tableBody = $('<tbody></tbody>').appendTo(this.table);
		this._createTableHeader(this.options.columns);

		if (this.options.dataProvider != null) {
			this._updateData();
		}
	},

	_createTableHeader : function(columns) {
		tr = $('<tr></tr>');
		for ( var columnIndex in columns) {
			var columnDefinition = columns[columnIndex];
			var th = this._createHeaderCell(tr, columnIndex, columnDefinition);
			th.appendTo(tr);
		}
		tr.appendTo(this.tableHead);
	},

	_createHeaderCell: function (tr, columnIndex, columnDefinition) {
		var th = $('<th></th>');

		th.addClass('col' + columnIndex);
		th.addClass("header");
		th.attr("data-field", columnDefinition.field);
		
		if(columnDefinition.customHeaderAttributes != null) {
			try {
				th.attr( columnDefinition.customHeaderAttributes );
			} 
			catch (err) {
				console.log(err);
			}
		}
		
		
		var headerRenderer = null;
		if (columnDefinition.headerRenderer != null) {
			headerRenderer = columnDefinition.headerRenderer;
		} else if(this.options.headerRenderer != null) {
			headerRenderer = this.options.headerRenderer;
		} 
		
		if (headerRenderer != null) {
			var listData = {
				owner : this,
				data : null,
				column : columnDefinition,
				index : columnIndex,
				th : th,
				tr : tr
			};

			var passedObjects = {
				listData : listData
			};
			
			if (columnDefinition.itemRendererOptions != null) {
				jQuery.extend(passedObjects, columnDefinition.headerOptions);
			}
			
			th[headerRenderer](passedObjects);
			
		}	else {
			th.html(columnDefinition.label);
		}
		
		if (columnDefinition.headerAttr != null) {
			th.attr(columnDefinition.headerAttr);
		}

		if (columnDefinition.headerStyle!= null) {
			this._applyStyle(th, columnDefinition.headerStyle);
		}

		if (columnDefinition.width != null) {
			th.css("width", columnDefinition.width);
		}

		if (columnDefinition.visible == false) {
			th.hide();
		}
		
		
		return th;
	},

	_updateData : function() {
		$(this.tableBody).children().remove();

		var rows = this.options.dataProvider;

		for ( var rowIndex in rows) {
			var rowData = rows[rowIndex];
			var tr = this._buildRow(rowIndex, rowData, this.tableBody);
			for ( var columnIndex in this.options.columns) {
				var columnDefinition = this.options.columns[columnIndex];
				var td = this._buildCell(tr, rowIndex, rowIndex, rowData, columnDefinition);
				tr.append(td);
			}
		}
	},
	
	_buildRow: function (rowIndex, rowData, tableBody) {
		
		var tr = $("<tr></tr>").appendTo(tableBody);
		var tr_guid = this._guid();
		tr.attr("data-uid", tr_guid);
		
		if (this.options.rowFunction != null) {
			this.options.rowFunction(tr, rowIndex, rowData);
		}
		
		return tr;
	},
	
	_buildCell: function (tr, rowIndex, columnIndex, rowData, columnDefinition) {
		var td = $('<td></td>');
		
		td.addClass('col' + columnIndex);
		td.addClass("column");

		td.attr("data-field", columnDefinition.field);

		if (columnDefinition.width != null) {
			try {
				td.css("width", columnDefinition.width);
			} 
			catch (err) {
				console.log(err);
			}
		}

		this._applyStyle(td, columnDefinition.style);
		
		if(columnDefinition.customAttributes != null) {
			try {
				td.attr( columnDefinition.customAttributes );
			} 
			catch (err) {
				console.log(err);
			}
		}

		var label = this._assignlabelData(rowData, columnDefinition);

		if (columnDefinition.visible == false) {
			td.hide();
		}

		if (columnDefinition.itemRenderer != null || columnDefinition.rendererFunction != null) {
			var listData = {
				owner : this,
				data : rowData,
				column : columnDefinition,
				index : rowIndex,
				td : td,
				tr : tr
			};

			var passedObjects = {
				data : label,
				listData : listData
			};
			
			if (columnDefinition.itemRendererOptions != null) {
				jQuery.extend(passedObjects, columnDefinition.itemRendererOptions);
			}
			
			if ( columnDefinition.itemRenderer != null) {
				td[columnDefinition.itemRenderer](passedObjects);
			} else if (columnDefinition.rendererFunction != null) {
				columnDefinition.rendererFunction(td, passedObjects);
			}
		} else {
			td.html(label);
		}

		if (typeof label == "string" && columnDefinition.showToolTip == true) {
			td.attr("title", label);
		}

		if (columnDefinition.styleFunction != null) {
			columnDefinition.styleFunction(td, rowIndex, rowData, columnDefinition);
		}
		
		return td;
	},

	_assignlabelData : function(rowData, columnDefinition) {
		if (columnDefinition.labelFunction != null) {
			return columnDefinition.labelFunction(rowData, columnDefinition);
		}

		if (columnDefinition.labelField != null) {
			return rowData[columnDefinition.field][columnDefinition.labelField];
		}

		if (rowData[columnDefinition.field] != null) {
			return rowData[columnDefinition.field];
		}

		return "";
	},

	_setOption : function(key, value) {
		switch (key) {
			case "dataProvider":
				this.options.dataProvider = value;
				this._updateData();
				break;
			case "columns":
				this.options.columns = value;
				this._updateData();
				break;
		}

		$.Widget.prototype._setOption.apply(this, arguments);

	},
	showLoading : function() {

		this.table.addClass("loading");

		this.tableBody.animate( {
			opacity : 0.1
		}, 200);

	},
	hideLoading : function()
	{
		this.table.removeClass("loading");
		this.tableBody.animate({opacity : 1	}, 200);
	},

	_applyStyle : function(target, styleDefinition) {
		if (target == null || styleDefinition == null)
			return;

		if (typeof styleDefinition == "string") {
			target.addClass(styleDefinition);
		} else {
			target.css(styleDefinition);
		}
	},

	_guid : function() {
		var S4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	},

	destroy : function() {
		$.Widget.prototype.destroy.apply(this, arguments);
	}

});
