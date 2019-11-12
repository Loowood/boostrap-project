const ShoppingCart = require('./ShoppingCart')
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


module.exports = User;