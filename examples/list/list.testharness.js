$.ui.document.subclass("ui.listtestharness", {

	options: {

	}, 

	_create: function(){
		var labelFunctionsListOptions = {
			dataProvider: [
				{
					name: "Mia",
					age: "30"
				},
				{
					name: "Jacob",
					age: "30"
				},
				{
					name: "Ethan",
					age: "32"
				},
				{
					name: "Isabella",
					age: "32"
				},
				{
					name: "Alexander",
					age: "20"
				},
				{
					name: "Emily",
					age: "28"
				}
			],
			labelField: "name",
			labelFunction: function(rowData) {
				return rowData.name + " is " + rowData.age;
			},
			loading: {
				label: "loading...",
				imageUrl: "images/ajax-loader-small.gif"
			},
			itemRenderer:"people"
			}

			var labelFunctionsList = $("#labelFunctionsList");

			labelFunctionsList.list(labelFunctionsListOptions);

			labelFunctionsList.addEventListener("itemclick.list", this._labelFunctionsList_itemClickHandler, this);

			$("#showLoading").click(function() {
				$("#labelFunctionsList").list("showLoading");
			});
			$("#hideLoading").click(function() {
				$("#labelFunctionsList").list("hideLoading");
			});

		},

		_init: function(){

		},

		_labelFunctionsList_itemClickHandler: function(e){
			console.log('aaaa', e, e.selectedIndex);
		}
});


$.ui.itemrenderer.subclass("ui.people" , {
	_create: function(){
		this.elements.age = $("<span><span>");
		this.elements.name = $("<span><span>");

		this.elements.age.text(this.options.listData.data.age);
		this.elements.name.text(this.options.listData.data.name);

		this.element.append(this.elements.age);
		this.element.append(this.elements.name);
	},
});
