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
  {name:"Polo", email:"polo@email.com", phone:"22-22-34", description: "Lorem ipsum dolor sit\namet, <rtf>sdfgsdfg</rtf>consecte<br/>tur adipiscing elit."},
  {name:"Rafael", email:"rafa@email.com", phone:"22-34-56", description: "Nullam elementum, odio id convallis ultricies, felis felis placerat orci, vel pulvinar felis nulla vel turpis."},
  {name:"Edgar", email:"edgar@email.com", phone:"22-67-45", description: "Donec sed dui mi. Proin purus ante, suscipit ac rutrum non, lobortis et libero."},
  {name:"Luis", email:"luis@email.com", phone:"22-95-45", description: "orbi lorem velit, sodales eu cursus porta, egestas et sem."}
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
		},
		expanded: false
	},

	_create : function()
	{
		this.element.addClass("ui-expandrow");
		
		var expandButton = $("<button>expand</button>")
		.appendTo(this.element)
		.click($.proxy(this._clickHandler, this));
		
		this.elements.expandButton = expandButton;
	},
	
	_clickHandler: function(e) {
		var tr = this.options.listData.tr;
		
		this.options.expanded = !this.options.expanded;
		
		if(this.options.expanded==true) {
			var trExtra = $('<tr></tr>');

			var td = $('<td colspan="4"></td>')
			.addClass("expanded-row")
			.appendTo(trExtra);

			$("<textarea style='width:350px'></textarea>")
			.appendTo(td)
			.text(this.options.listData.data.description);
			

			trExtra.insertAfter(tr);
			
			// cache element into the this.elements object
			this.elements.trExtra = trExtra; 
			
			this.elements.expandButton.text("collapse");
			
		} else {
			this.elements.trExtra.remove();
			
			this.elements.expandButton.text("expand");
		}
		
	  this._dispatchEvent("exapndRow");
	},
	
	// ------------------------------------------------
	destroy : function()
	{
	  this.element.removeClass("ui-customheader");
		$.Widget.prototype.destroy.apply(this, arguments);
	}
});