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

users.deleteProductToShoppingCart = function(req, res){
	Model.deleteProductToShoppingCart(req.params.uid, req.params.pid)
		.then((message) => {
			res.status(200).json(message)
		}).catch(error => {
			console.error(error)
			res.status(500).json(error)
		})
}

users.decreaseQtyProductToShoppingCart = function(req, res){
	Model.decreaseQtyProductToShoppingCart(req.params.uid, req.params.pid)
		.then((message) => {
			res.status(200).json(message)
		}).catch(error => {
			console.error(error)
			res.status(500).json(error)
		})
}

users.signInUser = function(req, res) {
	console.log(req.body)
	Model.signInUser(req.body.email, req.body.password).then(user => {
		res.json(user)
	}).catch(error => {
		console.error(error)
		res.status(500).json(error)
	})
}
module.exports = users