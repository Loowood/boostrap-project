Controller.controllers.shoppingcart = {};
Controller.controllers.shoppingcart.refresh = function (matching) {
	var context = {}
	if (Model.currentUser) {
		Model.currentUser.getShoppingCart();
			.then(function (shopingcart) {
				context.shopingcart = shopingcart
				View.renderer.shoppingcart.render(context)
			})
	} else {
		Controller.controllers.shoppingcart.redirectToSignIn()
	}
}
Controller.controllers.shoppingcart.redirectToSignIn = function() {
	Controller.router.go("signin");
	view.renderer.signin.render({})
}
Controller.controllers.shoppingcart.addProductToShoppingCart = function (product) {
	if (Model.currentUser) {
		Model.currentUser.getShoppingCart().then(function (shopingCart) {
			shopingCart.addItem(product).then(function () {
				console.log("item added")
			})
		})
	} else {
		Controller.controllers.shoppingcart.redirectToSignIn()
	}
}