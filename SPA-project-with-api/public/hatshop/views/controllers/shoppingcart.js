Controller.controllers.shoppingcart = {};
Controller.controllers.shoppingcart.refresh = function (matching) {
	var context = {}
	if (Model.currentUser) {
		Model.getShoppingCart(Model.currentUser.id).then(function (shoppingCart) {
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
	if (Model.currentUser) {
		Model.addProductToShoppingCart(Model.currentUser.id, product);
	} else {
		Controller.controllers.shoppingcart.redirectToSignIn()
	}
}

Controller.controllers.shoppingcart.checkout = function(event) {
	event.preventDefault();
	let tempCart = Model.getShoppingCart(Model.currentUser);
	let tempOrder = new Order(Date.now(),new Date().getDate(), Model.currentUser.address, tempCart.subTotal, tempCart.tax, tempCart.total, "Card Holder Example", "Card Number Example", tempCart.items);
	Model.currentUser.userOrders.push(tempOrder); // TODO : Change to API Call
	Controller.router.go("purchase");
	Controller.controllers.purchase.refresh();
}
