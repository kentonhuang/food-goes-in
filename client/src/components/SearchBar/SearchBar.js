import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../../index.css';
import { connect } from 'react-redux';
import { yelpSearchLatLng, yelpSearchLocation, getLocation } from '../../actions/index'
import FontAwesome from 'react-fontawesome';

import MoreFilters from './MoreFilters';

class SearchBar extends Component {

	state = {
			term: '',
			location: '',
			latitude: '',
			longitude: '',
			distance: '8046',
			openNow: false,
			price: [],
			showFilters: false,
	}

	handleInputTerm = (event) => {
		this.setState({ term: event.target.value })
	}

	handleInputLocation = (event) => {
		this.setState({ location: event.target.value })
	}

	submitForm = (e) => {
		e.preventDefault();
		if(this.state.location === 'Current Location') {
			this.props.dispatch(yelpSearchLatLng(this.state.term, this.state.latitude, this.state.longitude, this.state.distance, this.state.openNow, this.state.price))
		}
		else if(this.state.location !== 'Current Location') {
			this.props.dispatch(yelpSearchLocation(this.state.term, this.state.location, this.state.distance, this.state.openNow, this.state.price))
		}
	}

	handleOptionChange = (event) => {
		this.setState({
			distance: event.target.value
		})
	}

	handleOpenNow = (event) => {
		this.setState({
			openNow: !this.state.openNow
		})
	}

	handlePriceChange = (event) => {
		const priceArr = this.state.price.slice(0);
		if (this.state.price.includes(event.target.value)) {
			const newArr = this.removeElement(priceArr, event.target.value);
			this.setState({
				price: newArr
			})
		}
		else {
			priceArr.push(event.target.value);
			this.setState({
				price: priceArr
			})
		}
	}

	showMoreFilters = () => {
		this.setState({
			showFilters: !this.state.showFilters
		})
	}

	removeElement = (arr, element) => {
		return arr.filter(e => e !== element)
	}

	useLocation = () => {
		this.setState({location: 'Current Location'})
		this.props.dispatch(getLocation())
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.location.location instanceof Error) {
			this.setState({
					latitude: nextProps.location.location.coords.latitude,
					longitude: nextProps.location.location.coords.longitude,
			})
		}

	}

	render() {
		return (
			<div className="search-bar-container">
				<div className="search-bar">
					<form className="restaurant-form-simple" onSubmit={this.submitForm}>
						<input
							type="text"
							value={this.state.term}
							placeholder="optional search term"
							onChange={this.handleInputTerm}
						/>
						<div className="location">
							<input
								className="location-input"
								type="text"
								value={this.state.location}
								placeholder="Location (Address, Zip, City, etc)"
								onChange={this.handleInputLocation}
							/>
							<span className="location-button" onClick={this.useLocation}>
							<FontAwesome 
								name="map-marker"
							/></span>
						</div>

						<button className="search-submit" type="submit">
							Find Random Restaurant
					</button>
					</form>
				</div>
				<button className="more-filters-button"
					onClick={this.showMoreFilters}
				>
					<span className="more-filters-text">Text</span>
				</button>
				<div>
						<CSSTransition
							in={this.state.showFilters}
							unmountOnExit={true}
							classNames="fade"
							timeout={300}
						>
							<MoreFilters
								handleOption={this.handleOptionChange}
								handlePrice={this.handlePriceChange}
								handleOpenNow={this.handleOpenNow}
								selectedState={{ distance: this.state.distance, price: this.state.price, openNow: this.state.openNow }}
							/>
						</CSSTransition>
				</div>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		search: state.search,
		location: state.location
	}
}

export default connect(mapStateToProps)(SearchBar);
