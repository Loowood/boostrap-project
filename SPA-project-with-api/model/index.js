var Model = {};
const User = require('./User')
const ShoppingCart = require('./ShoppingCart')
const Product = require('./Product')
const Item = require('./Item')
const Order = require('./Order')
// initialisation
// User
Model.users = [
	new User(1, "John", "Doe", "example@xyz.com", "08-05-1990", "123 Sesame Street", "azerty123"),
	new User(2, "H@xor", "TheHacker", "haxor@gmail.com", "01-01-2001", "Antarctica", "youwillneverguess")
]
// Products
Model.products = [
	new Product(1, "Internet", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim ligula, fringilla at scelerisque sit amet, tempus at risus. Sed ac sapien auctor, cursus nunc et, varius sapien. Morbi pretium interdum augue, ac vestibulum diam eleifend in. Curabitur at iaculis turpis. Nulla dapibus elit tincidunt lorem gravida, at laoreet ipsum pretium. Nam pretium elit convallis feugiat convallis.", 10, "/hatshop/images/InternetHat.jpg"),
	new Product(2, "Web dev", "Morbi tincidunt diam arcu, a elementum massa viverra a. Integer bibendum odio a turpis vestibulum, sit amet aliquet odio tincidunt. Duis eu convallis magna. Curabitur et gravida nulla, quis convallis tortor. Mauris id efficitur velit. Etiam eget ultricies libero. Praesent ac laoreet est. Mauris eu neque tincidunt, viverra lorem eget, cursus ante.", 0.01, "/hatshop/images/WebDevHat.jpg"),
	new Product(3, "Australian", "Ut fringilla ex aliquet, sagittis metus et, hendrerit neque. Aenean quam odio, dapibus ac auctor aliquet, porttitor et velit. Pellentesque mollis, purus non hendrerit iaculis, neque quam semper urna, non pellentesque neque purus eget dui.", 15, "/hatshop/images/AussieHat.jpg"),
	new Product(4, "Asian", "Cras efficitur sed nulla eu hendrerit. Mauris sit amet risus aliquam ipsum vehicula vestibulum. Duis eleifend erat eget justo finibus, at consectetur lorem aliquam. In eleifend consequat quam ac pharetra. In efficitur lorem fringilla dolor cursus, at cursus magna cursus. Nam quis sem sed nunc mollis dignissim. Cras lectus leo, dapibus et augue vitae, luctus accumsan justo. Suspendisse potenti. Sed rhoncus rhoncus risus, nec vehicula augue vehicula sollicitudin. Proin commodo facilisis libero, in auctor urna vehicula in. Nunc vulputate tincidunt semper.", 5, "/hatshop/images/ChineseHat.jpg"),
	new Product(5, "High n' Classy", "Nam tincidunt ligula ut mi congue condimentum. Nulla et malesuada turpis, in interdum mi. Aenean laoreet, arcu in gravida volutpat, nulla purus dictum velit, id mattis nisl sapien sed lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin ex a mollis scelerisque. Duis convallis nunc eget aliquet consequat. Fusce vitae rutrum justo.", 1254.99, "/hatshop/images/HighHat.jpg"),
	new Product(6, "Holmes", "Nulla auctor lectus vulputate fermentum commodo. Mauris accumsan eu justo eu maximus. Etiam vitae erat sit amet est egestas tempor. Integer imperdiet luctus diam et pellentesque. Sed pretium quam ex, ac tristique neque porta eu.", 40, "/hatshop/images/HolmesHat.jpg")
]

Model.getUserProfile = function(userId){
	return new Promise(function (resolve, reject) {
		let user = Model.users.find(user => user.id == userId)
		if (user === undefined) {
			reject({"error":"The user doesn't exist"})
		}
		let profile = {}
		profile.name = user.name
		profile.surname = user.surname
		profile.email = user.email
		profile.birth = user.birth
		profile.address = user.address
		resolve(profile)
	})
};

Model.getProducts = function() {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(Model.products);
		}, 500);
	})
}

Model.getProduct = function(pid) {
	return new Promise((resolve, reject) => {
		let product = Model.products.find((product) => product.id == pid)
		if (product === undefined) {
			reject({"error":"Thereis no product with this id"})
		}
		resolve(product)
	})
}
Model.signUpUser = function(name, surname, email, birth, address, password) {
	return new Promise(function (resolve, reject) {
		let findUser = Model.users.find(user => user.email == email)
		if (findUser !== undefined) {
			reject({"error":"the user already exists"})
		}
		let userId = Model.users[Model.users.length -1].id + 1
		let users = new User(userId, name, surname, email, birth, address, password)
		Model.users.push(users)
		resolve({"id":userId})
	})
};

Model.addProductToShoppingCart = function(userId, productId) {
	return new Promise(function (resolve, reject) {
		let userIndex = Model.users.indexOf(Model.users.find(user => user.id == userId))
		if (userIndex === -1) {
			reject({"error": "user doesn't exist"})
		}
		let productIndex = Model.products.indexOf(Model.products.find(product => product.id == productId))
		if (productIndex === -1) {
			reject({"error":"The product doesn't exist"})
		}
		let itemIndex = Model.users[userIndex].shoppingCart.items.indexOf(Model.users[userIndex].shoppingCart.items.find(item => item.product === Model.products[productIndex]))
		if (itemIndex === -1) {
			let product = Model.products[productIndex]
			let item = new Item(null, 1, product.price, product)
			Model.users[userIndex].shoppingCart.items.push(item)
			Model.users[userIndex].shoppingCart.update()
			resolve({"succcess":"Item added"})
		} else {
			Model.users[userIndex].shoppingCart.items[itemIndex].addOne()
			Model.users[userIndex].shoppingCart.update()
			resolve({"success":"Product quantity incremented"})
		}
	})
}

Model.deleteProductToShoppingCart = function(userId, productId) {
	return new Promise(function(resolve, reject) {
		let userIndex = Model.users.indexOf(Model.users.find(user => user.id == userId))
		if (userIndex === -1) {
			reject({"error": "user doesn't exist"})
		}
		let productIndex = Model.products.indexOf(Model.products.find(product => product.id == productId))
		if (productIndex === -1) {
			reject({"error":"The product doesn't exist"})
		}
		let itemIndex = Model.users[userIndex].shoppingCart.items.indexOf(Model.users[userIndex].shoppingCart.items.find(item => item.product === Model.products[productIndex]))
		if (itemIndex === -1) {
			reject({"error":"The product is not in the shopping cart"})
		}
		let newShoppingCartItems = Model.users[userIndex].shoppingCart.items.filter(item => item.product.id != productId)
		Model.users[userIndex].shoppingCart.items = newShoppingCartItems
		Model.users[userIndex].shoppingCart.update()
		resolve({"success":"Item deleted"})
	})
}


Model.decreaseQtyProductToShoppingCart = function(userId, productId){
	return new Promise(function(resolve, reject) {
		let userIndex = Model.users.indexOf(Model.users.find(user => user.id == userId))
		if (userIndex === -1) {
			reject({"error": "user doesn't exist"})
		}
		let productIndex = Model.products.indexOf(Model.products.find(product => product.id == productId))
		if (productIndex === -1) {
			reject({"error":"The product doesn't exist"})
		}
		let itemIndex = Model.users[userIndex].shoppingCart.items.indexOf(Model.users[userIndex].shoppingCart.items.find(item => item.product === Model.products[productIndex]))
		if (itemIndex === -1) {
			reject({"error":"The product is not in the shopping cart"})
		}
		Model.users[userIndex].shoppingCart.items[itemIndex].removeOne()
		Model.users[userIndex].shoppingCart.update()
		resolve({"success":"Quantity decreased"})
	})
}

Model.signInUser = function (userEmail, userPassword) {
	console.log(userEmail, userPassword);
	return new Promise(function (resolve, reject){
		let userIndex = Model.users.indexOf(Model.users.find(user => user.email == userEmail))
		if (userIndex !== -1) {
			if (Model.users[userIndex].password === userPassword) {
				resolve({"id":Model.users[userIndex].id})
			}
		} else {
			reject({"error":"The username or password is incorrect"})
		}
	})
}

Model.signUp = function(userInfo){
	empty = 0;
	duplicateEmail = false;
	passwordMatch = false;
	Object.keys(userInfo).forEach(function(key){
		if(userInfo[key] == "" || userInfo[key] == null){
			empty += 1;
		}
	})
	if (Model.users.map(x => x.email).includes(userInfo.email)) {
		duplicateEmail = true;
	}
	if (userInfo.password != userInfo.confirmpassword){
		passwordMatch = true;
	}
	return new Promise(function (resolve,reject){
		if(empty > 0 || duplicateEmail  || passwordMatch){
			reject();
		}else{
			resolve();
		}
	})
}

Model.getUserShoppingCart = function(userId) {
	return new Promise( function (resolve, reject) {
		setTimeout( function() {
			let user = Model.users.find((user) => user.id == userId)
			if (user === undefined) {
				reject({"error":"No user with this ID"})
			}
			resolve(user.shoppingCart);
		}, 500);
	})
}

Model.getUserOrder = function(userId) {
	return new Promise(function (resolve, reject){
		let user = Model.users.find((user) => user.id == userId)
		if (user === undefined){
			reject({"error":"No user with this ID"})
		}
		resolve(user.order);
	})
}

module.exports = Model;
