var View = {};
View.renderer = {};
View.loadTemplate = function (filename) {
    return $.ajax({
        url: '/hatshop/views/templates/' + filename + '.hbs'
    });
}
View.renderTemplate = function (id, container, context) {
    return View.loadTemplate(id)
        .then(function (source) {
            var template = Handlebars.compile(source);
            var html = template(context);
            return $('#' + container).html(html)
        })
}

View.loadPartial = function (filename) {
    return $.ajax({
        url: '/hatshop/views/partials/' + filename + '.hbs'
    })
        .then(function (contents) {
            return Handlebars.registerPartial(filename, contents);
        });
}

$(function () {
    window.addEventListener('popstate', (event) => Controller.
        router.route(), false);
    var promises = [View.loadPartial('book-partial')];
    Promise.all(promises)
        .then(function () {


            Model.getBooks()
                .then(function (books) {
                    // Controller.controllers.index.refresh()
                    Controller.router.route('Page no found!');
                })

        });

})