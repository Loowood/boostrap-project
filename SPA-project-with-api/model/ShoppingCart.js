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

module.exports = ShoppingCart