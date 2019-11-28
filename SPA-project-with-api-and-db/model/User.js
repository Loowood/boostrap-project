const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ShoppingCart = require('./ShoppingCart')
const Order = require('./Order')
var schema = Schema({
	name: {type:String, required: true},
	surname: {type:String, required: true},
	email: {type: String, required: true, unique: true, trim: true, lowercase: true, },
	birth: {type: Date, required: true},
	address: {type: String, required: true},
	password: {type: String, required: true, select: false},
	orders: [{type: Schema.Types.ObjectID, ref: Order}],
	shoppingCart: {type: Schema.Types.ObjectID, ref: ShoppingCart, required: true}
})

schema.methods.getOrdersTotal = function() {
	let total = 0;
	this.userOrders.forEach( x => total += parseFloat(x.total) );
	return total;
}


schema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

schema.methods.generateHashPassword = function (next) {
	var user = this
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(42, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next()
		})
	})
}

schema.pre('save', function (next) {
	this.generateHashPassword(next)
})

schema.pre('update', function (next) {
	this.generateHashPassword(next)
})


module.exports = mongoose.model('user', schema)