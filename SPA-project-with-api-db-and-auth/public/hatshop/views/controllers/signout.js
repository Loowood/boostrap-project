Controller.controllers.signout = {}
Controller.controllers.signout.refresh = function (matching) {
    var context = {};
    if ( Model.currentUser == null ){
        context.userWasConnected = false;
    } else {
        context.userWasConnected = true;
        Model.currentUser = null;
    }
    View.renderer.signout.render(context);
}
