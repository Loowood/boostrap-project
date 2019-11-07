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
	var email =  $('#inputEmail').val();
	var password = $('#inputPassword').val();
	Model.checkUser(email, password).then(function(){
		console.log("User found")
	}).catch(function(){
		console.log("User not found")
	})
}