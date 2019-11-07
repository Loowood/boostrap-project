var Model = {};
class User {
	constructor (name, surname, email, birth, address, password) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.birth = birth;
		this.address = address;
		this.password = password;
		this.shoppingCart = null;
		this.userOrders = [];
	}
}
class ShoppingCart {
	constructor (){
		this.subtotal = 0;
		this.total = 0;
		this.tax = 0;
		this.items = [];
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
	constructor (order, qty, price, total, product) {
		this.order = order;
		this.qty = qty;
		this.price = price;
		this.total = total;
		this.product = product;
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

Model.checkUser = function (usrEmail, usrPassword) {
	var found = false;
	for(user of Model.users){
		if (user.email == usrEmail){
			if(user.password == usrPassword){
				console.log("Email: " + user.email + " and password: " + user.password + " found!");
				found = true;
				break;
			}
		}
	} 
	return new Promise(function (resolve,reject){
		if(found){
			resolve();
		}else{
			reject();
		}
	}).then(function(){
		console.log("User found");
	}).catch(function(){
		console.log("User not found")
		View.renderer.signin.render({})
	})	
}