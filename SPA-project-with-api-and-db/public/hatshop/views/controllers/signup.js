Controller.controllers.signup = {};
Controller.controllers.signup.refresh = function (matching) {
	View.renderer.signup.render({});
};

Controller.controllers.signup.signUp = function(event){
	event.preventDefault();
	userInfo = {};
	userInfo.email = $('#exampleInputEmail1').val();
	userInfo.username = $('#exampleInputUsername1').val();
	userInfo.surname = $('#exampleInputSurname1').val();
	userInfo.password = $('#exampleInputPassword1').val();
	userInfo.address = $('#exampleInputAddress1').val();
	userInfo.confirmpassword = $('#exampleInputPassword2').val();
	userInfo.birthdate = $('#exampleInputDate1').val();
	Model.signUp(userInfo.username, userInfo.surname, userInfo.email, userInfo.birthdate, userInfo.address, userInfo.password).then(function(data){
			Controller.router.go("signin");
			View.renderer.signin.render({})
		}).catch(function(){
			View.renderer.signup.render({});
		})
}