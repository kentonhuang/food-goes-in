const config = {
	production: {
		YELP_KEY: process.env.YELP_KEY
	},
	development: {
		YELP_KEY: 'kv2SXo2kqTdnhXCwQyrkmPUOdnYTvUTFjvpFoot22iy-XBVIvJ-oovs-YdY4FMZp3_UMAyY6bLT7CznFp6XB74VWGJ7-edkN1v-f3pDiMm3FuhogxaTvDOdKQdS2WnYx'
	}
}

exports.get = function get(env) {
	return config[env] || config.default;
}