Controller.controllers.index = {};
Controller.controllers.index.refresh = function (matching) {
	View.renderer.index.render({});
};
Controller.controllers.index.goToSignin_clicked = function (event) {
	event.preventDefault();
	Controller.router.go(event.target.href);
};
Controller.controllers.index.addItemToShoppingCart = function (event) {
	Model.addItemToShoppingCart({name: "John", surname: "Doe"}, "A JAR OF SNAILS").then(console.log("Item added"));
	Model.getUsers().then((data) => console.log(data));
};
Controller.controllers.index.addUser = function (event) {
	let newUser = new User("Loris", "GIRAUD", "lorisg01@yahoo.fr", "06-11-1998", "Le Limandas", "Plouf11");
	Model.addUser(newUser).then((item) => {
		Model.getUsers().then((data) => console.log(data));
	});
};
