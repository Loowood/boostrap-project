const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./Product')
const Order = require('./Order')
var schema = Schema({
	orderId: {type: Schema.Types.ObjectId, ref: Order},
	qty: {type: Number, required: true, min: 1},
	price: {type: Number, required: true},
	product: {type: Schema.Types.ObjectID, ref: Product, required: true},
	total: {type: Number, required: true}
})
schema.methods.addOne = function() {
	this.qty++;
	return this.save()
}

schema.methods.updateTotal = function() {
	this.total = this.qty * this.price
}

schema.methods.removeOne = function() {
	this.qty--
	return this.save()
}

schema.pre('save', function (next) {
	this.updateTotal()
	return next()
})

schema.pre('update', function (next) {
	this.updateTotal()
	return next()

})
module.exports = mongoose.model('item', schema)