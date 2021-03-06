var Controller = {};
Controller.controllers = {};

Controller.router = {};

Controller.router.go = function (url) {
    history.pushState(null, '', url);
    Controller.router.route();
};

Controller.router.route = function () {
    var path = location.pathname;
    var matching = null;
    console.log('Routing ', path);
    if (matching = path.match(/^\/hatshop\/views\/index$/)) {
        Controller.controllers.index.refresh();
    } else if (matching = path.match(/^\/hatshop\/views\/signin$/)) {
        Controller.controllers.signin.refresh();
    } else if (matching = path.match(/^\/hatshop\/views\/purchase$/)) {
        Controller.controllers.purchase.refresh();
    } else if (matching = path.match(/^\/hatshop\/views\/order-([0-9]+)$/)) {
        Controller.controllers.order.refresh(matching);
    } else if (matching = path.match(/^\/hatshop\/views\/shoppingcart$/)) {
        Controller.controllers.shoppingcart.refresh();
    } else if (matching = path.match(/^\/hatshop\/views\/signup$/)) {
        Controller.controllers.signup.refresh();
    } else if (matching = path.match(/^\/hatshop\/views\/profile/)) {
        Controller.controllers.profile.refresh();
    } else if (matching = path.match(/^\/hatshop\/views\/signout/)) {
        Controller.controllers.signout.refresh();
    } else {
        console.error('Page not found!');
    }
};
