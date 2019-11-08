Controller.controllers.shoppingcart = {};
Controller.controllers.shoppingcart.refresh = function (matching) {
	var context = {}
	if (Model.currentUser) {
		Model.getShoppingCart().then(function (shoppingCart) {
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
		Model.getShoppingCart().then(function (shopingCart) {
			shopingCart.addItem(product).then(function () {
				console.log("item added")
			})
		})
	} else {
		Controller.controllers.shoppingcart.redirectToSignIn()
	}
}

Controller.controllers.shoppingcart.checkout = function(event) {
	event.preventDefault();
	let tempOrder = new Order(Date.now(),new Date().getDate(), Model.currentUser.address, Model.currentUser.shoppingCart.subtotal, Model.currentUser.shoppingCart.tax, Model.currentUser.shoppingCart.total, "Card Holder Example", "Card Number Example", Model.currentUser.shoppingCart.items);
	Model.currentUser.userOrders.push(tempOrder);
	Model.currentUser.shoppingCart.empty();
	Controller.router.go("purchase");
	Controller.controllers.purchase.refresh();
}
