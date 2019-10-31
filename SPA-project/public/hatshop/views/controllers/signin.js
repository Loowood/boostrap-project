Controller.controllers.signin = {};
Controller.controllers.signing.refresh = function (matching) {
	View.renderer.signin.render({});
};
Controller.controllers.signin.goToIndex_clicked = function (event) {
	event.preventDefault();
	View.go (event.target.href);
};