Controller.controllers.signin = {};
Controller.controllers.signin.refresh = function (matching) {
	View.renderer.signin.render({});
};
Controller.controllers.signin.goToIndex_clicked = function (event) {
	event.preventDefault();
	Controller.router.go(event.target.href);
};


Controller.controllers.signin.signIn = function (event) {
	event.preventDefault();
	var email = $('#inputEmail').val();
	var password = $('#inputPassword').val();
	Model.signInUser(email, password)
		.then( function (data) {
			Model.currentId = data.id;
			Controller.router.go("index");
			View.renderer.index.render({});
			console.log(Model.id);
		})
		.catch( function() {
			View.renderer.signin.render({});
		})
}
