const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Item = require('./Item')
var schema = Schema({
	date: {type: Date, required: true, default: Date.now},
	address: {type: String, required: true},
	subTotal: {type: Number, required: true},
	tax: {type: Number, required: true},
	total: {type: Number, required: true},
	cardHolder: {type: Number, required: true},
	cardNumber: {type: Number, required: true},
	orderItems: [{type: Schema.Types.ObjectID, ref: Item}]
})


module.exports = mongoose.model('order', schema)