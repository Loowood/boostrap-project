Controller.controllers.purchase = {};
Controller.controllers.purchase.refresh = function (matching) {
	var contex = {};
	if (Model.currentId != null){
		contex.userConnected = true;
		Model.getUserProfile()
			.then( function(data) {
				contex.user = data;
				Model.getUserOrders()
					.then(function(data) {
						// contex.user.userOrders = data;
						contex.orders = [];
						data.forEach(x => contex.orders.push(x));
						let reducer = (accumulator, currentValue) => accumulator + currentValue;
						contex.total = contex.orders.map( order => order.total).reduce(reducer);
						console.log("Contex", contex);
						View.renderer.purchase.render(contex);
					})
					.catch(function(data) {
						// alert("Error in Purchase :", data);
						contex.orders = [];
						contex.total = 0;
						View.renderer.purchase.render(contex);
					})
			})
			.catch (function (data) {
				console.log("Something went wrong", data);
				contex.userConnected = false;
				contex.user = null;
				View.renderer.purchase.render(contex);
			})
	}
	else{
		contex.userConnected = false;
		contex.user = null;
		View.renderer.purchase.render(contex);
	}

};

Controller.controllers.purchase.goToOrder_clicked = function (event) {
	event.preventDefault();
	console.log("Go to order", event.target.href);
	Controller.router.go(event.target.href);
};
