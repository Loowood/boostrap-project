const jwtStrategy = require('passport-jwt').Strategy;
const bearerStrategy = require('passport-http-bearer');

const {ExtractJwt} = require('passport-jwt');
const jwtSecret = 'diuf_ueçeiçr_yéèèékkijihhuuhyuygyytyuiuiuiuiu';
const User = require('../model/User');

const jwtOptions = {
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer')
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

exports.jwt = new jwtStrategy(jwtOptions, jwt)