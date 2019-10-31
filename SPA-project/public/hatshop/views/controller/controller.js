var Controller = {};
Controller.controllers = {};

Controller.router = {};
Controller.router.route = function () {
    var path = location.pathname;
    var matching = null;

    if (matching = path.match(/^\/webapp\/views\/index$/)) {
        Controller.controllers.index.refresh();
    }

    else if (matching = path.match(/^\/webapp\/views\/book\/(\w*)\/addComment$/)) {

        Controller.controllers.addCommentForm.refresh(matching);
    }

    else {
        console.error('Page not found!');
    }
}

Controller.router.go = function (url) {
    history.pushState(null, '', url);
    Controller.router.route();
}
