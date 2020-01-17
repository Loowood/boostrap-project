Controller.controllers.nav = {}
Controller.controllers.nav.link_clicked = function(event){
    event.preventDefault();
	Controller.router.go(event.target.href);
}
