var Controller = {};
Controller.controllers = {};

Controller.router = {};
Controller.router.route = function () {}

Controller.router.go = function (url) {
    history.pushState(null, '', url);
    Controller.router.route();
}
