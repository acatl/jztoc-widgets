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
	    }]
	  }
	
    this.elements.datagrid.grid(options);
		this.elements.datagrid.grid("option", "dataProvider", gridData)

		this.elements.removeGrid = $("#removeGrid");
		this.elements.removeGrid.addEventListener("click", this._removeGrid_clickHandler, this);

  },
  
  _init: function(){
    
  },

	_removeGrid_clickHandler: function(e){
		this.elements.datagrid.grid("destroy");
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