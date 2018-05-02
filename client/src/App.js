import React, { Component } from 'react';
import MapComponent from './GoogleMap/MapComponent';
import './index.css';

import SearchBar from './components/SearchBar/SearchBar';

class App extends Component {

	render() {
		return (
			<div className="container">
				<div>
					<MapComponent
						className="mapBody"
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeY1NhC8Jj5DxLxXN31uI6MvXJ3094DhM&v=3.exp&libraries=geometry,drawing,places"
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: `100vh` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
				<div className="searchbar-container">
					<SearchBar />
				</div>
			</div>

		);
	}
}

export default App;