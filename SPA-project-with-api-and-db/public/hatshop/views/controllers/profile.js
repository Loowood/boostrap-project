Controller.controllers.profile = {};
Controller.controllers.profile.refresh = function (matching) {
    var context = {};
    if ( Model.currentId != null ) {
        context.userConnected = true;
        Model.getUserProfile()
            .then( (data) => {
                context.user = data;
                console.log("User profile", data);
                Model.getUserOrders()
                    .then( (data) => {
                        console.log("User orders", data);
                        context.user.orders = data;
                        context.user.orders.forEach( (order) => {order["id"] = order._id} );
                        View.renderer.profile.render(context);
                    })
                    .catch ( (error) => {
                        console.log("There was an error", error);
                        View.renderer.profile.render(context);
                    })
            })
            .catch ( function(data) {
                console.log("There was an error :" + data);
                View.renderer.profile.render(context);
            })
    } else {
        context.userConnected = false;
        context.user = null
        View.renderer.profile.render(context);
    }
};
