const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ShoppingCart = require('./ShoppingCart')
const Order = require('./Order')
var schema = Schema({
	name: {type:String, required: true},
	surname: {type:String, required: true},
	email: {type: String, required: true, unique: true, trim: true, lowercase: true, },
	birth: {type: Date, required: true, max: Date.now},
	address: {type: String, required: true},
	password: {type: String, required: true},
	orders: [{type: Schema.Types.ObjectID, ref: Order}],
	shoppingCart: {type: Schema.Types.ObjectID, ref: ShoppingCart, required: true}
})

schema.methods.getOrdersTotal = function() {
	let total = 0;
	this.userOrders.forEach( x => total += parseFloat(x.total) );
	return total;
}


schema.methods.validPassword = function(password) {
	return bcrypt.compare(password, this.password)
}


schema.pre('save', function (next) {
	let user = this
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(5).then(function (salt) {
		bcrypt.hash(user.password, salt).then(function (hash) {
			user.password = hash
			return next()
		}).catch(function (error) {
			return next(error)
		})
	}).catch(function (error) {
		return next(error)
	})
})

module.exports = mongoose.model('user', schema)