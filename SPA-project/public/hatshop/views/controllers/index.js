Controller.controllers.index = {};
Controller.controllers.index.refresh = function (matching) {
	View.renderer.index.render({});
};
Controller.controllers.index.goToSignin_clicked = function (event) {
	event.preventDefault();
	Controller.router.go(event.target.href);
};