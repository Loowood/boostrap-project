var Model = {};
class User {
	constructor (id, name, surname, email, birth, address, password) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.birth = birth;
		this.address = address;
		this.password = password;
		this.shoppingCart = new ShoppingCart();
		this.userOrders = [];
		this.id = id;
	}

	getOrdersTotal() {
		let total = 0;
		this.userOrders.forEach( x => total += parseFloat(x.total) );
		return total;
	}


}

Model.getShoppingCart = function(uid) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: "/api/users/"+uid+"/cart",
			method: "GET"
		})
		.done( (data) => {
			resolve(data);
		})
		.fail( (error) => {
			reject(error);
		})
	});
}

Model.currentId = null;


class ShoppingCart {
	constructor() {
		this.subTotal = 0;
		this.total = 0;
		this.tax = 0;
		this.items = [];
	}
	empty() {
		this.subtotal = 0;
		this.total = 0;
		this.tax = 0;
		this.items = [];
	}
	addItem(product) {
		var self = this;
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				self.items.forEach( item => {
					if (item.product == product) {
						item.addOne();
					}
				});
				var item = new Item(null, 1, product.price, product);
				self.items.push(item);
				self.update();
				resolve();
			}, 500);
		})
	}

	updateSubTotal() {
		this.subtotal = 0
		this.items.forEach( (item) => {
			this.subtotal = this.subtotal + item.total
		})
		this.subtotal = Math.round(this.subtotal * 100) / 100;
	}

	updateTotal() {
		this.total = this.subtotal + this.tax
	}
	updateTax() {
		this.tax = 0.20 * this.subTotal
	}

	update() {
		this.updateSubTotal()
		this.updateTax()
		this.updateTotal()
	}
}
class Product {
	constructor (name, description, price, url) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.url = url;
	}
}
class Item {
	constructor (order, qty, price, product) {
		this.order = order;
		this.qty = qty;
		this.price = price;
		this.updateTotal()
		this.product = product;
	}
	addOne() {
		this.qty++;
		this.updateTotal()
	}
	updateTotal() {
		this.total = this.qty * this.price
	}
	removeOne() {
		this.qty--
		this.updateTotal()
	}
	changeQty(qty) {
		this.qty = qty
		this.updateTotal()
	}
}
class Order {
	constructor (number, date, address, subtotal, tax, total, cardHolder, cardNumber, items) {
		this.number = number;
		this.date = date;
		this.address = address;
		this.subtotal = subtotal;
		this.tax = tax;
		this.total = total;
		this.cardHolder = cardHolder;
		this.cardNumber = cardNumber;
		this.orderItems = items;
	}
}


// === Initialisation
// Users
Model.users = [
	new User(1, "John", "Doe", "example@xyz.com", "08-05-1990", "123 Sesame Street", "azerty123"),
	new User(2, "H@xor", "TheHacker", "haxor@gmail.com", "01-01-2001", "Antarctica", "youwillneverguess")
];
// Products
Model.products = [
	new Product("Internet", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim ligula, fringilla at scelerisque sit amet, tempus at risus. Sed ac sapien auctor, cursus nunc et, varius sapien. Morbi pretium interdum augue, ac vestibulum diam eleifend in. Curabitur at iaculis turpis. Nulla dapibus elit tincidunt lorem gravida, at laoreet ipsum pretium. Nam pretium elit convallis feugiat convallis.", 10, "/hatshop/images/InternetHat.jpg"),
	new Product("Web dev", "Morbi tincidunt diam arcu, a elementum massa viverra a. Integer bibendum odio a turpis vestibulum, sit amet aliquet odio tincidunt. Duis eu convallis magna. Curabitur et gravida nulla, quis convallis tortor. Mauris id efficitur velit. Etiam eget ultricies libero. Praesent ac laoreet est. Mauris eu neque tincidunt, viverra lorem eget, cursus ante.", 0.01, "/hatshop/images/WebDevHat.jpg"),
	new Product("Australian", "Ut fringilla ex aliquet, sagittis metus et, hendrerit neque. Aenean quam odio, dapibus ac auctor aliquet, porttitor et velit. Pellentesque mollis, purus non hendrerit iaculis, neque quam semper urna, non pellentesque neque purus eget dui.", 15, "/hatshop/images/AussieHat.jpg"),
	new Product("Asian", "Cras efficitur sed nulla eu hendrerit. Mauris sit amet risus aliquam ipsum vehicula vestibulum. Duis eleifend erat eget justo finibus, at consectetur lorem aliquam. In eleifend consequat quam ac pharetra. In efficitur lorem fringilla dolor cursus, at cursus magna cursus. Nam quis sem sed nunc mollis dignissim. Cras lectus leo, dapibus et augue vitae, luctus accumsan justo. Suspendisse potenti. Sed rhoncus rhoncus risus, nec vehicula augue vehicula sollicitudin. Proin commodo facilisis libero, in auctor urna vehicula in. Nunc vulputate tincidunt semper.", 5, "/hatshop/images/ChineseHat.jpg"),
	new Product("High n' Classy", "Nam tincidunt ligula ut mi congue condimentum. Nulla et malesuada turpis, in interdum mi. Aenean laoreet, arcu in gravida volutpat, nulla purus dictum velit, id mattis nisl sapien sed lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin ex a mollis scelerisque. Duis convallis nunc eget aliquet consequat. Fusce vitae rutrum justo.", 1254.99, "/hatshop/images/HighHat.jpg"),
	new Product("Holmes", "Nulla auctor lectus vulputate fermentum commodo. Mauris accumsan eu justo eu maximus. Etiam vitae erat sit amet est egestas tempor. Integer imperdiet luctus diam et pellentesque. Sed pretium quam ex, ac tristique neque porta eu.", 40, "/hatshop/images/HolmesHat.jpg")
]

//Order number, date, address, subtotal, tax, total, cardHolder, cardNumber, items




Model.getProducts = function(){

	return new Promise(function (resolve, reject) {
		$.ajax({
			url: "/api/products",
			method: "GET"
		})
		.done( (data) => {
			resolve(data);
		})
		.fail( (error) => {
			reject(error);
		})
	});

}

Model.getProduct = function(id) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: "/api/product/"+id,
			method: "GET"
		})
		.done( (data) => {
			resolve(data);
		})
		.fail( (error) => {
			reject(error);
		})
	});
}

Model.getUsers = function(){
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(Model.users);
		}, 1000);
	})
};
Model.addUser = function(user) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			Model.users.push(user);
			resolve("User added");
		}, 2000);
	})
};
Model.addProductToShoppingCart = function(uid, product) {
	return new Promise( function (resolve, reject) {
		$.ajax({
			url: '/api/users/'+uid+'/cart/items/'+product["_id"],
			method: 'POST',
			contents: product
		})
		.done( (data) => {
			resolve(data);
		})
		.fail( (error) => {
			reject(error);
		})
	})
}

Model.signInUser = function (usrEmail, usrPassword) {
	return new Promise( function (resolve, reject) {
		$.ajax({
			url: '/api/users/signin',
			type: 'POST',
			data: {'email': usrEmail, 'password': usrPassword}
		})
		.done( (data) => {
			console.log(data);
			resolve(data);
		})
		.fail( (error) => {
			reject(error);
		})
	})
}

Model.getUserProfile = function () {
	return new Promise ( function (resolve, reject) {
		$.ajax({
			url: '/api/users/'+Model.currentId,
			type: 'GET'
		})
		.done( (data) => {
			resolve(data);
		})
		.fail( (data) => {
			reject(data);
		})
	})
}

Model.addOrder = function(orderToAdd) {
	return new Promise ( function (resolve, reject) {
		$.ajax({
			url: '/api/users/'+ Model.currentId +'/orders',
			type: 'POST',
			data: {'cardHolder': 'Card Holder Example', 'cardNumber': 1245845200}
		})
		.done( (data) => {
			resolve(data);
		})
		.fail( (data) => {
			reject(data);
		})
	})
}

Model.getUserOrders = function() {
	return new Promise( function (resolve, reject) {
		$.ajax({
			url: '/api/users/'+ Model.currentId +'/orders',
			type: 'GET'
		})
		.done( (data) => {
			console.log("success getting user orders", data);
			resolve(data);
		})
		.fail( (data) => {
			console.log("error getting user orders", data);
			reject(data);
		})
	})
}

Model.getUserOrder = function (number) {
	return new Promise( function (resolve, reject) {
		$.ajax({
			url: '/api/users/'+ Model.currentId + '/orders/' + number,
			type: 'GET'
		})
		.done( (data) => {
			resolve(data);
		})
		.fail( (data) => {
			reject(data);
		})
	})
}

Model.getUserOrderItems = function(number) {
	return new Promise( function (resolve, reject) {
		$.ajax({
			url: '/api/users/'+ Model.currentId + '/orders/' + number + '/items',
			type: 'GET'
		})
			.done( (data) => {
				resolve(data);
			})
			.fail( (data) => {
				reject(data);
			})
	})
}

Model.signUp = function (username, surname, email, birthdate, address, password){
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: '/api/users/signup',
			type: 'POST',
			data: {'name':username,'surname':surname,'email':email,'birth':birthdate,'address':address,'password':password}
		})
			.done((data) => {
				resolve(data);
			})
			.fail((error) => {
				reject(error);
			})
	})
}
