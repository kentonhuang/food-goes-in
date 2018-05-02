import { combineReducers } from 'redux';
import search from './search_reducers';
import location from './location_reducers';

export default combineReducers({
	search,
	location
});