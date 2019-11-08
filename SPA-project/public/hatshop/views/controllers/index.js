Controller.controllers.index = {};
Controller.controllers.index.refresh = function (matching) {
	var context = {};
	Model.getProducts()
		.then( function (products) {
			context.products = products;
			View.renderer.index.render(context);
		});
};
Controller.controllers.index.goToSignin_clicked = function (event) {
	event.preventDefault();
	Controller.router.go(event.target.href);
};
Controller.controllers.index.addUser = function (event) {
	let newUser = new User("Loris", "GIRAUD", "lorisg01@yahoo.fr", "06-11-1998", "Le Limandas", "Plouf11");
	Model.addUser(newUser).then((item) => {
		Model.getUsers().then((data) => console.log(data));
	});
};

Controller.controllers.index.buyOnClick = function (event, product) {
	event.preventDefault()
	Controller.controllers.shoppingcart.addProductToShoppingCart(product)

}