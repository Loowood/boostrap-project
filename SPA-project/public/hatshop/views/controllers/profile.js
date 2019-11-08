Controller.controllers.profile = {};
Controller.controllers.profile.refresh = function (matching) {
    var context = {};
    if ( Model.currentUser != null ) {
        context.userConnected = true;
        context.user = Model.currentUser;
    } else {
        context.userConnected = false;
        context.user = null
    }
    View.renderer.profile.render(context);
};
