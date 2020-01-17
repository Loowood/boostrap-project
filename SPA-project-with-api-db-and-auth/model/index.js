const User = require('./User')
const ShoppingCart = require('./ShoppingCart')
const Product = require('./Product')
const Order = require('./Order')
const Item = require('./Item')
let Model = {}
Model.getProducts = function() {
	return Product.find()
}

Model.getProduct = function(productId) {
	return new Promise((resolve, reject) => {
		Product.findById(productId).then(function (product) {
			if (product != undefined) {
				resolve(product)
			} else {
				reject({"error":"the product doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}

Model.signUpUser = function(name, surname, email, birth, address, password){
	return new Promise((resolve, reject) => {
		new ShoppingCart().save().then(function (shoppingCart) {
			new User({
				"name": name,
				"surname": surname,
				"email": email,
				"birth": birth,
				"address": address,
				"password": password,
				"shoppingCart": shoppingCart
			}).save().then(function (user) {
				resolve({"id":user["_id"]})
			}).catch(function (error) {
				reject(error)
			})
		}).catch(function (error) {
			reject(error)
		})
	})
};

Model.addProductToShoppingCart = function(userId, productId) {
	return new Promise((resolve, reject) => {
		User.findById(userId).populate({path:"shoppingCart", populate:{path:"items"}}).then(function (user) {
			if (user != undefined) {
				Product.findById(productId).then(function (product) {
					if (product != undefined) {
						user.shoppingCart.addItem(product).then(function (shoppingCart) {
							shoppingCart.save().then(function () {
								resolve({"success": "item added"})
							}).catch(function (error) {
								reject(error)
							})
						}).catch(function (error) {
							reject(error)
						})
					} else {
						reject({"error":"The product Id doesn't exist"})
					}
				}).catch(function (error) {
					reject(error)

				})
			} else {
				reject({"error":"User doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}

Model.deleteProductToShoppingCart = function(userId, productId) {
	return new Promise(function(resolve, reject) {
		User.findById(productId).populate({path:"shoppingCart", populate: {path: "items"}}).then(function (user) {
			if (user != undefined) {
				Product.findById(productId).then(function (product) {
					if (product != undefined) {
						user.shopingCart.deleteItemToShoppingCart(product).then(function (shoppingCart) {
							shoppingCart.save().then(function (shoppingCart) {
								resolve({"success": "Item deleted"})
							}).catch(function (error) {
								reject(error)
							})
						}).catch(function (error) {
							reject(error)
						})
					} else {
						reject({"error": "The product doesn't exist"})
					}
				}).catch(function (error) {
					reject(error)
				})
			} else {
				reject({"error":"The user doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}


Model.decreaseQtyProductToShoppingCart = function(userId, productId) {
	return new Promise(function (resolve, reject) {
		User.findById(userId).populate({path:"shoppingCart", populate:{path: "items"}}).then(function (user) {
			if (user != undefined) {
				Product.findById(productId).then(function (product) {
					if (product != undefined) {
						user.shopingCart.decreaseQtyProductToShoppingCart(product).then(function (shoppingCart) {
							shoppingCart.save().then(function () {
								resolve({"success": "Qantity decreased"})
							}).catch(function (error) {
								reject(error)
							})
						}).catch(function (error) {
							reject(error)
						})
					} else {
						reject({"error": "the product doesn't exist"})
					}
				}).catch(function (error) {
					reject(error)
				})
			} else {
				reject({"error": "The user doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}





Model.getUserShoppingCart = function(userId) {
	return new Promise((resolve, reject) => {
		User.findById(userId).populate({path:"shoppingCart", populate:{path: "items", populate: {path: "product"}}}).then(function (user) {
			if (user != undefined) {
				resolve(user.shoppingCart)
			} else {
				reject({"error":"the user dosn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}


Model.getUserOrders = function(userId) {
	return new Promise(function (resolve, reject) {
		User.findById(userId).populate({path:"orders"}).then(function (user) {
			if (user != undefined) {
				console.log("User orders", user.orders);
				resolve(user.orders)
			} else {
				reject({"error": "User doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}

Model.newOrder = function(userId, cardHolder, cardNumber) {
	return new Promise(function (resolve, reject) {
		User.findById(userId).populate({path:"shoppingCart", populate: {path: "items"}}).populate({path:"orders"}).then(function (user) {
			if (user != undefined) {
				let shoppingCart = user.shoppingCart;
				console.log("Shopping Cart in new Order", shoppingCart);
				new Order({
					"address":user.address,
					"subTotal":shoppingCart.subTotal,
					"tax":shoppingCart.tax,
					"total":shoppingCart.total,
					"cardHolder":cardHolder,
					"cardNumber":cardNumber,
					"items":shoppingCart.items
				}).save().then(function (order) {
					user.orders.push(order);
					console.log("User orders after new order", user.orders);
					user.save()
						.then( function(user) {
							user.shoppingCart.clean()
							user.shoppingCart.save().then(function () {
								resolve(order)
							}).catch(function (error) {
								reject(error)
							})
						})
						.catch( function (error) {
							reject(error);
						})
				}).catch(function (error) {
					reject(error)
				})
			} else {
				reject({"error":"user doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}

Model.getUserOrder = function(userId, orderId) {
	return new Promise((resolve, reject) => {
		Order.findById(orderId).then(function (order) {
			if (order != undefined) {
				resolve(order)
			} else {
				reject({"error":"order doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}

Model.getUserOrderItems = function(userId, orderId) {
	return new Promise((resolve, reject) => {
		Order.findById(orderId).populate({path:"items", populate: {path: "product"}}).then(function (order) {
			if (order != undefined) {
				resolve(order.items);
			} else {
				reject({"error":"order doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}

Model.getUserProfile = function(userId) {
	return new Promise((resolve, reject) => {
		User.findById(userId).populate({path:"orders", populate: {path:"items", populate: {path: "product"}}}).then(function (user) {
			if (user != undefined) {
				console.log("get user Profile, all good");
				resolve(user)
			} else {
				reject({"error":"user doesn't exist"})
			}
		}).catch(function (error) {
			reject(error)
		})
	})
}
module.exports = Model;
