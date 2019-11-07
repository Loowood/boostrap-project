var View = {};
View.renderer = {};
View.loadTemplate = function (filename) {
    return $.ajax({
        url: '/hatshop/views/templates/' + filename + '.hbs'
    });
};
View.renderTemplate = function (id, container, context) {
    return View.loadTemplate(id)
        .then(function (source) {
            var template = Handlebars.compile(source);
            var html = template(context);
            return $('#' + container).html(html)
        })
};

View.loadPartial = function (filename) {
    return $.ajax({
        url: '/hatshop/views/partials/' + filename + '.hbs'
    })
        .then(function (contents) {
            return Handlebars.registerPartial(filename, contents);
        });
};


$(function () {
    window.addEventListener('popstate', (event) => Controller.router.route(), false);
    Model.getUsers().then((data) => console.log(data));
    var promises = [View.loadPartial('header-partial'),
                    View.loadPartial('base'),
                    View.loadPartial('footer-partial'),
                    View.loadPartial('index-partial'),
                    View.loadPartial('signin-partial'),
                    View.loadPartial('nav-partial'),
                    View.loadPartial('product-partial')
                ];
    Promise.all(promises)
        .then(function () {
            return $(function () {
                // Controller.controller.index.refresh();

                Controller.router.route();
            })
        });
});
