const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const yelp = require('yelp-fusion')
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

app.use(bodyParser.json());

app.use(express.static('client/build'))

const auth = 'Bearer '.concat(config.YELP_KEY);

const client = yelp.client(config.YELP_KEY);

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

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}


const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`SERVER RUNNNING`)
})
