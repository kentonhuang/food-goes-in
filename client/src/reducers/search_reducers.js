import {
	YELP_SEARCH,
	YELP_SEARCH_LOCATION
} from '../actions/types';


export default function (state = {}, action) {
	switch (action.type) {
		case YELP_SEARCH:
			return { ...state, search_result: action.payload };
		case YELP_SEARCH_LOCATION:
			return { ...state, search_result: action.payload }
		default:
			return state;
	}
}