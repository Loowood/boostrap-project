Controller.controllers.shoppingcart = {};
Controller.controllers.shoppingcart.refresh = function (matching) {
	var context = {}
	if (Model.currentId) {
		Model.getShoppingCart(Model.currentId).then(function (shoppingCart) {
				context.shoppingCart = shoppingCart
				View.renderer.shoppingcart.render(context)
			})
	} else {
		Controller.controllers.shoppingcart.redirectToSignIn()
	}
}
Controller.controllers.shoppingcart.redirectToSignIn = function() {
	Controller.router.go("signin");
	View.renderer.signin.render({})
}
Controller.controllers.shoppingcart.addProductToShoppingCart = function (product) {
	if (Model.currentId) {
		Model.addProductToShoppingCart(Model.currentId, product);
	} else {
		Controller.controllers.shoppingcart.redirectToSignIn()
	}
}

Controller.controllers.shoppingcart.checkout = function(event) {
	event.preventDefault();
	let tempCart = Model.getShoppingCart(Model.currentId);
	// let tempOrder = new Order(Date.now(),new Date().getDate(), Model.currentUser.address, tempCart.subTotal, tempCart.tax, tempCart.total, "Card Holder Example", "Card Number Example", tempCart.items);
	Model.addOrder()
		.then(function(message) {
			console.log(message);
			Controller.router.go("purchase");
			Controller.controllers.purchase.refresh();
		})
		.catch(function() {
			console.log("Something went wrong");
			Controller.controllers.shoppingcart.refresh();
		})
	// Model.currentUser.userOrders.push(tempOrder); // TODO : Change to API Call
}
