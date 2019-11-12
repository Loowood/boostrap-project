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




module.exports = Order