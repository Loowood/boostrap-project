var Model = {};
class User {
	constructor (name, surname, email, birth, address, password) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.birth = birth;
		this.address = address;
		this.password = password;
		this.shoppingCart = new ShoppingCart();
		this.userOrders = [];
	}
}
class ShoppingCart {
	constructor() {
		this.subtotal = 0;
		this.total = 0;
		this.tax = 0;
		this.items = [];
	}
	this.addItem(product) {
		for (item of this.items) {
			if (item.product == product) {
				item.addOne()
			}
		}
		item = new Item(null, 1, product.price, product)
		this.items.push(item)
		this.updateSubTotal()
		this.updateTotal()
	}

	this.updateSubTotal() {
		this.subtotal = 0
		for (item of this.items) {
			this.subtotal = this.subtotal + item.total
		}
	}

	this.updateTotal() {
		this.total = this.total + this.tax * this.subtotal
	}

	this.removeItem(product) {
		this.items = array.filter((item, index, arr) => {return item.product !== product})
		this.updateSubTotal()
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
	this.addOne() {
		this.qty++;
		this.updateTotal()
	}
	this.updateTotal() {
		this.total = this.qty * this.price
	}
	this.removeOne() {
		this.qty--
		this.updateTotal()
	}
	this.changeQty(qty) {
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
Model.users = [
	new User("John", "Doe", "example@xyz.com", "08-05-1990", "123 Sesame Street", "azerty123"),
	new User("H@xor", "TheHacker", "haxor@gmail.com", "01-01-2001", "Antarctica", "youwillneverguess")
];
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
Model.addItemToShoppingCart = function(usr, item) {
	var found = false;
	Model.users.forEach(user => {
		if (user.name == usr.name && user.surname == usr.surname) {
			if ( user.shoppingCart == null ){
				user.shoppingCart = new ShoppingCart();
			}
			user.shoppingCart.items.push(item);
			found = true;
		}
	});
	return new Promise(function (resolve, reject) {
		if (found){
			resolve("ok");
		} else {
			reject("NO");
		}
	})
}
