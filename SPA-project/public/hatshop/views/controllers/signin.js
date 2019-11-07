Controller.controllers.signin = {};
Controller.controllers.signin.refresh = function (matching) {
	View.renderer.signin.render({});
};
Controller.controllers.signin.goToIndex_clicked = function (event) {
	event.preventDefault();
	Controller.router.go(event.target.href);
};


Controller.controllers.signin.checkUser = function (event) {
	event.preventDefault();
	var email = $('#inputEmail').val();
	var password = $('#inputPassword').val();
	Model.checkUser(email, password).then(function (user) {
		Model.currentUser = user;
		Controller.router.go("index");
		View.renderer.index.render({});
		console.log(Model.currentUser);
	}).catch(function () {
		View.renderer.signin.render({});
	})
}