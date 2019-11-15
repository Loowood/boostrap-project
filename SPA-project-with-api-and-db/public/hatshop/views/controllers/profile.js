Controller.controllers.profile = {};
Controller.controllers.profile.refresh = function (matching) {
    var context = {};
    if ( Model.currentId != null ) {
        context.userConnected = true;
        Model.getUserProfile()
            .then( (data) => {
                context.user = data;
            })
            .catch ( function(data) {
                console.log("There was an error :" + data);
            })
        console.log(context.user);
    } else {
        context.userConnected = false;
        context.user = null
    }
    View.renderer.profile.render(context);
};
