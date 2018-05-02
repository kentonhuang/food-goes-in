const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const yelp = require('yelp-fusion')

const app = express();

app.use(bodyParser.json());

const API_KEY = 'kv2SXo2kqTdnhXCwQyrkmPUOdnYTvUTFjvpFoot22iy-XBVIvJ-oovs-YdY4FMZp3_UMAyY6bLT7CznFp6XB74VWGJ7-edkN1v-f3pDiMm3FuhogxaTvDOdKQdS2WnYx'

const auth = 'Bearer '.concat(API_KEY);

const client = yelp.client(API_KEY);

// axios.get('https://api.yelp.com/v3/businesses/search?term=food&latitude=37.786882&longitude=-122.399972', { headers: { Authorization: auth }})
// 	.then(res => {
// 		console.log(res.data);
// 	})

app.get('/api/test', (req, res) => {
	let term = req.query.term;
	if (term === '') {
		term = 'food';
	}
	let latitude = req.query.latitude;
	let longitude = req.query.longitude;
	let price = req.query.price;
	let open_now = req.query.open_now;
	let distance = req.query.distance;
	console.log(req.query);

	client.search({
		term,
		latitude,
		longitude,
		limit: 50,
		price,
		open_now,
		radius: distance,
	}).then(response => {
		res.json(response.jsonBody);
	})
	
})

app.get('/api/test2', (req, res) => {
	let term = req.query.term;
	let location = req.query.location
	let price = req.query.price;
	let open_now = req.query.open_now;
	let distance = req.query.distance;
	console.log(req.query);


	client.search({
		term,
		location,
		limit: 50,
		price,
		open_now,
		radius: distance,
	}).then(response => {
		res.json(response.jsonBody);
	})

})

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`SERVER RUNNNING`)
})