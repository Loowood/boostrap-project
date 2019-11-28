const Model = require('../../model')
var users = {}
users.getUserShoppingCart = function(req, res) {
	Model.getUserShoppingCart(
		req.params.uid,
		req.body.cardHolder,
		req.body.cardNumber
	)
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

users.signUpUser = function(req, res) {
	Model.signUpUser(
		req.body.name,
		req.body.surname,
		req.body.email,
		req.body.birth,
		req.body.address,
		req.body.password
	).then(user => {
		res.json(user)
	}).catch(error => {
		console.error(error)
		res.status(500).json(error)
	})
}

users.getUserProfile = function(req, res) {
	Model.getUserProfile(req.params.uid).then(profile => {
		if (profile == undefined) {
			res.status(400).json({"error":"tthe user id dosen't exist"})
		}
		res.json(profile)
	}).catch(error => {
		console.error(error)
		res.status(500).json(error)
	})
}

users.getUserOrders = function(req, res) {
	Model.getUserOrders(req.params.uid)
		.then((order) => {
			res.json(order)
		}).catch((error) => {
		console.error(error);
		res.status(500).json(error)
	})
}
users.newOrder = function(req, res) {
	Model.newOrder(
		req.params.uid,
		req.body.cardHolder,
		req.body.cardNumber
	).then(message => {
		res.json(message)
	}).catch(error => {
		res.status(500).json(error)
	})
}

users.getUserOrder = function(req, res) {
	Model.getUserOrder(req.params.uid, req.params.number).then(order => {
		res.json(order)
	}).catch(error => {
		console.error(error)
		res.status(500).json(error)
	})
}

users.getUserOrderItems = function(req, res) {
	Model.getUserOrderItems(req.params.uid, req.params.number).then(items => {
		res.json(items)
	}).catch(error => {
		console.error(error)
		res.status(500).json(error)
	})
}

module.exports = users