const jwtStrategy = require('passport-jwt').Strategy;
const bearerStrategy = require('passport-http-bearer');
const localStrategy = require('passport-local').Strategy;
const {ExtractJwt} = require('passport-jwt');
const jwtSecret = 'diuf_ueçeiçr_yéèèékkijihhuuhyuygyytyuiuiuiuiu';
const User = require('../model/User');
const model = require('../model');
const jwtOptions = {
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
}

const jwt = async (payload, done) => {
	try {
		const user = await User.findById(payload.sub);
		if (user) return done(null, user);
		return done(null, false)
	} catch (error) {
		return done(error);
}
}

const local = async (userEmail, password, done) => {
	try {
		const user = await User.findOne({"email": userEmail})
		if (user) {
			const validPassword = await user.validPassword(password)
			if (validPassword) {
				return done(null, user["_id"])
			}
		}
		return done(null, false)
	} catch (error) {
		return done(error)
	}
}

const fields = {
	usernameField: 'email',
	passwordField: 'password'
}
exports.jwt = new jwtStrategy(jwtOptions, jwt);
exports.local = new localStrategy(fields, local);
exports.secret = jwtSecret