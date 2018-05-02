import axios from 'axios';

import {
	YELP_SEARCH,
	YELP_SEARCH_LOCATION,
} from './types';

export function yelpSearchLatLng(term = 'food', latitude, longitude, distance = '8046', openNow = false, price = ['1','2','3','4']) {
	let priceTemplate = ''
	if (Array.isArray(price) && price.length) {
		const priceStr = price.toString();
		priceTemplate = `&price=${priceStr}`;
	} else {
		priceTemplate = ''
	}


	const request = axios.get(`/api/test?term=${term}&latitude=${latitude}&longitude=${longitude}&distance=${distance}&open_now=${openNow}${priceTemplate}`)
		.then(res => {
			const restaurant = returnRestaurant(res.data.businesses)
			return {
				businesses: res.data.businesses,
				restaurant
			}
		});
	return {
		type: YELP_SEARCH,
		payload: request
	}
}

export function yelpSearchLocation(term = 'food', location, distance = '8046', openNow = false, price = ['1', '2', '3', '4']) {
	let priceTemplate = ''
	if (Array.isArray(price) && price.length) {
		const priceStr = price.toString();
		priceTemplate = `&price=${priceStr}`;
	} else {
		priceTemplate = ''
	}
	console.log(priceTemplate);

	const request = axios.get(`/api/test2?term=${term}&location=${location}&distance=${distance}&open_now=${openNow}${priceTemplate}`)
		.then(res => {
			const restaurant = returnRestaurant(res.data.businesses)
			return {
				businesses: res.data.businesses,
				restaurant
			}
		});

	return {
		type: YELP_SEARCH_LOCATION,
		payload: request
	}
}

function returnRestaurant(restaurantsList) {
	const length = Math.floor(Math.random() * Math.floor(restaurantsList.length - 1))	
	const restaurant =  restaurantsList[length];
	return restaurant;

}

