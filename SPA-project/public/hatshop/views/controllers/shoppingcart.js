Controller.controllers.shoppingcart = {};
Controller.controllers.shoppingcart.refresh = function (matching) {
	var context = {}
	if (Model.currentUser) {
		Model.currentUser.getShoppingCart().then(function (shoppingCart) {
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
	Model.addProductToShoppingCart(product).then(function () {
		console.log("item added")
	}).catch(function () {
		Controller.controllers.shoppingcart.redirectToSignIn()
	})
}
