Controller.controllers.purchase = {};
Controller.controllers.purchase.refresh = function (matching) {
	var contex = {};
	if (Model.currentUser != null){
		contex.userConnected = true;
		contex.user = Model.currentUser;
	}
	else{
		contex.userConnected = false;
		contex.user = null;
	}
	View.renderer.purchase.render(contex);
};

Controller.controllers.purchase.goToOrder_clicked = function (event) {
	event.preventDefault();
	Controller.router.go(event.target.href);
};