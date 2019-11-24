const mongoose = require('mongoose');
const Product = require('../model/Product')

const uri = 'mongodb://localhost/hatshop';
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('connecting', function() {
    console.log(' Connecting to ' , uri);
});
db.on('connected', function() {
    console.log(' Connected to ' , uri);
});
db.on('disconnecting', function() {
    console.log('Disconnecting from ' , uri); });
db.on('disconnected', function() {
    console.log('Disconnected from ', uri);
});
db.on('error', function(err) {
    console.error('Error ', err. message);
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( function() {
        return Product.deleteMany();
    })
    .then( function () {
        var promises = [
            new Product({
                name: "Internet",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim ligula, fringilla at scelerisque sit amet, tempus at risus. Sed ac sapien auctor, cursus nunc et, varius sapien. Morbi pretium interdum augue, ac vestibulum diam eleifend in. Curabitur at iaculis turpis. Nulla dapibus elit tincidunt lorem gravida, at laoreet ipsum pretium. Nam pretium elit convallis feugiat convallis.",
                price: 10,
                url: "/hatshop/images/InternetHat.jpg"}),
            new Product({
                name: "Web dev",
                description: "Morbi tincidunt diam arcu, a elementum massa viverra a. Integer bibendum odio a turpis vestibulum, sit amet aliquet odio tincidunt. Duis eu convallis magna. Curabitur et gravida nulla, quis convallis tortor. Mauris id efficitur velit. Etiam eget ultricies libero. Praesent ac laoreet est. Mauris eu neque tincidunt, viverra lorem eget, cursus ante.",
                price: 0.01,
                url: "/hatshop/images/WebDevHat.jpg"}),
            new Product({
                name: "Australian",
                description: "Ut fringilla ex aliquet, sagittis metus et, hendrerit neque. Aenean quam odio, dapibus ac auctor aliquet, porttitor et velit. Pellentesque mollis, purus non hendrerit iaculis, neque quam semper urna, non pellentesque neque purus eget dui.",
                price: 15,
                url: "/hatshop/images/AussieHat.jpg"}),
            new Product({
                name: "Asian",
                description: "Cras efficitur sed nulla eu hendrerit. Mauris sit amet risus aliquam ipsum vehicula vestibulum. Duis eleifend erat eget justo finibus, at consectetur lorem aliquam. In eleifend consequat quam ac pharetra. In efficitur lorem fringilla dolor cursus, at cursus magna cursus. Nam quis sem sed nunc mollis dignissim. Cras lectus leo, dapibus et augue vitae, luctus accumsan justo. Suspendisse potenti. Sed rhoncus rhoncus risus, nec vehicula augue vehicula sollicitudin. Proin commodo facilisis libero, in auctor urna vehicula in. Nunc vulputate tincidunt semper.",
                price: 5,
                url: "/hatshop/images/ChineseHat.jpg"}),
            new Product({
                name: "High n' Classy",
                description: "Nam tincidunt ligula ut mi congue condimentum. Nulla et malesuada turpis, in interdum mi. Aenean laoreet, arcu in gravida volutpat, nulla purus dictum velit, id mattis nisl sapien sed lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin ex a mollis scelerisque. Duis convallis nunc eget aliquet consequat. Fusce vitae rutrum justo.",
               price: 1254.99,
                url: "/hatshop/images/HighHat.jpg"}),
            new Product({
                name: "Holmes",
                description: "Nulla auctor lectus vulputate fermentum commodo. Mauris accumsan eu justo eu maximus. Etiam vitae erat sit amet est egestas tempor. Integer imperdiet luctus diam et pellentesque. Sed pretium quam ex, ac tristique neque porta eu.",
                price: 40,
                url: "/hatshop/images/HolmesHat.jpg"})
        ]
        return Promise.all(promises);
    })
    .then( function(){
        mongoose.disconnect();
    })
    .catch( function(err){
        console. error(' Error' , err. message);
    });
