const config = {
	production: {
		YELP_KEY: process.env.YELP_KEY
	},
	development: {
		YELP_KEY: 'hihi'
	}
}

exports.get = function get(env) {
	return config[env] || config.default;
}