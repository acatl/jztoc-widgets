var Helper = {
	trace: function (a) {
		console.log(a);
	},
	
	rendererFunctionPreviousVisits: function(cell, listData){
		console.log(cell, listData);
		$('<a href="mailto:' + listData.data + '">' +  listData.data + '</a>').appendTo(cell);		
	}
}

$.ui.document.subclass("ui.view", {

  options: {
    getChildren: true
  },

	_helpers: [Helper],
  
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
	      field: "email",
				rendererFunction: this.rendererFunctionPreviousVisits
	    }, {
	      label: "Phone",
	      width: 200,
	      field: "phone",
	      styleFunction: function (td, index, rowData, columnDefinition) {
	        if ( rowData.phone == "22-95-45") {
	          td.css("color", "blue");
	        }
	      }, 
				labelFunction: function (rowData, columnDefinition) {
					return rowData.phone + "%";
				}
	    }]
	  }
	
    this.elements.datagrid.grid(options);
		this.elements.datagrid.grid("option", "dataProvider", gridData)

  },
  
  _init: function(){
    
  },

	rendererFunction: function(cell, listData){
		console.log(cell, listData);
		$('<a href="mailto:' + listData.data + '">' +  listData.data + '</a>').appendTo(cell);		
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
]