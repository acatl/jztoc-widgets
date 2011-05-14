$.ui.document.subclass("ui.view", {

  options: {
    getChildren: true
  },
  
  _create: function(){
	
		var options = {
	    columns: [{
	      label: "Name",
	      field: "name",
	      headerStyle: {
	        color: "red"
	      }, 
	      customAttributes: {
	        "data-custom":"some value"
	      }, 

	      customHeaderAttributes: {
	        "data-custom":"some other value"
	      }
	    }, {
	      label: "E-mail",
	      width: 200,
	      field: "email"
	    }, {
	      label: "Phone",
	      width: 200,
	      field: "phone",
	      styleFunction: function (td, index, rowData, columnDefinition) {
	        if ( rowData.phone == "22-95-45") {
	          td.css("color", "blue");
	        }
	      }
	    }, {
				label: "Expand Row",
				width: 100,
				itemRenderer: "expandrow"
			}
			]
	  };
	
    this.elements.datagrid.grid(options);
		this.elements.datagrid.grid("option", "dataProvider", gridData);

  },
  
  _init: function(){
    
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});


$(function(){
  $(document).view();
});

var gridData = [
  {name:"Polo", email:"polo@email.com", phone:"22-22-34"},
  {name:"Rafael", email:"rafa@email.com", phone:"22-34-56"},
  {name:"Edgar", email:"edgar@email.com", phone:"22-67-45"},
  {name:"Luis", email:"luis@email.com", phone:"22-95-45"}
];

/* ****************************************************************************
	ITEM RENDERERS 
**************************************************************************** */

$.ui.itemrenderer.subclass("ui.expandrow", {
	options : {
		listData : {
			owner : null, // reference to the widget's holder
			data : null, // reference to the entire row's data
			column : null, // reference to the column's definition
			index : null, // index of item inside the containing array (data provider)
			th : null, // reference to the td DOM object contairer (when applies)
			tr : null // reference to the tr DOM object contairer (when applies)
		}
	},

	_create : function()
	{
		this.element.addClass("ui-expandrow");
		
		var button = $("<button>expand</button>")
		.appendTo(this.element)
		.click($.proxy(this._clickHandler, this));
	},
	
	_clickHandler: function(e) {
	  this._dispatchEvent("exapndRow");
	},
	
	// ------------------------------------------------
	destroy : function()
	{
	  this.element.removeClass("ui-customheader");
		$.Widget.prototype.destroy.apply(this, arguments);
	}
});