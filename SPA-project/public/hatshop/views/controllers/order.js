Controller.controllers.order = {};
Controller.controllers.order.refresh = function (matching) {
	var contex = {};
	if (Model.currentUser != null){
		contex.userConnected = true;
		contex.user = Model.currentUser;
		contex.orderNumber = matching[1];
		contex.order = Model.currentUser.userOrders.filter( x => x.number == contex.orderNumber)[0];
		console.log(contex);
	}
	else{
		contex.userConnected = false;
		contex.user = null;
	}
	console.log("matching", contex.orderNumber)
	View.renderer.order.render(contex);
};
