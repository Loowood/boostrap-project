const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Item = require('./Item')
var schema = Schema({
	subTotal: {type: Number, required: true, default: 0},
	total: {type: Number, required: true, default: 0},
	tax: {type: Number, required: true, default: 0},
	items: [{type: Schema.Types.ObjectID, ref: Item}]
})

schema.methods.clean = function () {
	this.subtotal = 0;
	this.total = 0;
	this.tax = 0;
	this.items = [];
}

schema.methods.addItem = function(product) {
	let shoppingCart = this
	return new Promise((resolve, reject) => {
		let found = false
		shoppingCart.items.forEach(item => {
			if (item.product == product) {
				item.addOne().then(function (item) {
					resolve(shoppingCart)
				}).catch(function (error) {
					reject(error)
				})
				found=true
			}
		})
		if (!found) {
			new Item({
				"qty":1,
				"price":product.price,
				"product":product
			}).save().then(function (item) {
				shoppingCart.items.push(item)
				resolve(shoppingCart)
			}).catch(function (error) {
				reject(error)
			})
		}
	})
}

schema.methods.deleteItemToShoppingCart = function(product) {
	return new Promise((resolve, reject) => {
		if (this.items.find(item => item.product["_id"] === product["_id"]) === undefined) {
			reject({"error":"The product is not in the shopping Cart"})
			return;
		}
		this.items = this.items.filter(item => item.product["_id"] === product["_id"])
		resolve(this)
	})
}

schema.methods.decreaseQtyProductShoppingCart = function(product) {
	return new Promise((resolve, reject) => {
		let itemIndex = this.items.indexOf(this.items.find(item => item.product["_id"] === product["_id"]))
		if (itemIndex === -1) {
			reject({"errror":"No item with this product"})
			return;
		}
		let item = this.items[itemIndex]
		if (item.qty == 1) {
			reject({"error":"please delete this item"})
			return;
		}
		item.removeOne().then(function (item) {
			resolve(this)
		}).catch(function (error) {
			reject(error)
		})
	})
}
schema.pre('save', function (next) {
	this.subtotal = 0
	this.items.forEach((item) => {
		this.subtotal = this.subtotal + item.total
	})
	this.subtotal = Math.round(this.subtotal * 100) / 100;
	this.tax = 0.20 * this.subtotal
	this.total = this.subtotal + this.tax
	return next()
})
module.exports = mongoose.model('shoppingcart', schema)