const Model = require('../../model')
var users = {}
users.getUserShoppingCart = function(req, res) {
	Model.getUserShoppingCart(req.params.uid)
		.then((shoppingCart) => {
			res.json(shoppingCart)
		}).catch((error) => {
			console.error(error);
			res.status(500).json(error)
		})
}

users.getUserShoppingCartItems = function(req, res){
	Model.getUserShoppingCart(req.params.uid)
		.then((shoppingCart) => {
			res.json(shoppingCart.items)
		}).catch((error) => {
			console.error(error);
			res.status(500).json(error);
		})
}

users.addProductToShoppingCart = function(req, res){
	Model.addProductToShoppingCart(req.params.uid, req.params.pid)
		.then(() => {
			res.status(201).json({"message": "Item added"})
		}).catch((error) => {
			console.error(error)
			res.status(500).json(error)
		})
}
module.exports = users