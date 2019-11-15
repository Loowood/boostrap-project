class Item {
	constructor (orderId, qty, price, product) {
		this.orderId = orderId;
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


module.exports = Item