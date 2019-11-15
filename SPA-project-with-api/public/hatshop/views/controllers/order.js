Controller.controllers.order = {};
Controller.controllers.order.refresh = function (matching) {
	var contex = {};
	console.log(Model.currentId);
	if (Model.currentId != null){
		console.log("Connected user")
		contex.userConnected = true;
		Model.getUserProfile()
			.then( function(data) {
				contex.user = data;
				contex.orderNumber = matching[1];
				console.log("Succes getting the user", data);
				Model.getUserOrder(contex.orderNumber)
					.then( function(data) {
						console.log("Success getting an Order", data)
						contex.order = data;
						View.renderer.order.render(contex);
					})
					.catch ( function (data) {
						console.log("Something went wrong : ", data);
						View.renderer.order.render(contex);
					})
			})
			.catch( function(data) {
				console.log("Something went wrong");
				View.renderer.order.render(contex);
			})

	}
	else{
		contex.userConnected = false;
		contex.user = null;
		View.renderer.order.render(contex);
	}
	console.log("matching", contex.orderNumber);
};
