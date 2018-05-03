import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import mapStyle from './styleMap.json';
import { getLocation } from '../actions/location_actions';
import { connect } from 'react-redux';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import '../index.css'

const google = window.google;

class MapComponent extends Component {

	state = {
		location: {
			lat: 37.9081987,
			lng: -122.0568079,
		},
		zoom: 15,
		navigation: false,
		markers: [],
		geomarker: [],
		firstPan: false,

	}
	
	componentWillReceiveProps(nextProps) {	
		if (!(nextProps.location.location instanceof Error) && nextProps.location.location !== this.props.location.location && this.state.firstPan === false) {
			this.centerMap(nextProps.location.location.coords)
			this.setState({firstPan: true})
		}

		if (nextProps.location.location !== this.props.location.location && nextProps.location.location) {
			const geomarker = this.state.geomarker
			if (geomarker.length > 0) {
				geomarker.pop()
			}
			geomarker.push(nextProps.location.location)
			this.setState({ geomarker })
		}

		if (nextProps.search.search_result) {
			if(nextProps.search.search_result.restaurant === undefined) {
				this.setState({ error: 'No places found' })
			}
			else {
				const markers = this.state.markers
				if (markers.length > 0) {
					markers.pop()
				}
				markers.push(nextProps.search.search_result.restaurant);
				this.setState({ markers })
			}
		}
	}

	centerMap = (location) => {
		this.refs.map.panTo({ lat: location.latitude, lng: location.longitude});
	}

	componentDidMount() {
		this.props.dispatch(getLocation());
	}

	mapAddress = (address) => {
		return address.map((item, i) => {
			return (
				<div key={i}>{item}</div>
			)
		})
	}

	mapCateogries = (categories) => {
		return categories.map((item, i) => {
			return (
				<span className="label-category" key={i}>{item.title}</span>
			)
		})
	}

	renderCurrentLocationMarker = () => {
		const geolocation = this.state.geomarker[0].coords
		return (
			this.state.geomarker.map((item, i) => {
				return (<Marker 
					position={{ lat: geolocation.latitude, lng: geolocation.longitude }}
					key={i}
					icon={{
						url: 'https://i.imgur.com/ab4ehMo.png',
						scale: 1
					}}
				>
					{<InfoWindow>
						<div>Your Location</div>
					</InfoWindow>}
				</Marker>)
			})
		)
	}

	renderMarkers = () => {
		const location = this.state.markers[0].coordinates
		this.centerMap(location);
		return (
			this.state.markers.map(item => {
				return <Marker
					position={{ lat: location.latitude, lng: location.longitude }}
					key={item.id}
				>
					{<InfoBox
						options={{ boxClass: "marker-label", closeBoxURL: '', infoBoxClearance: 0, pixelOffset: new google.maps.Size(-233, -345)}}
						
					>
						<div className="label-container">
							<div className="left">
								<div className="label label-name">{item.name}</div>
								<div className="label label-categories">{this.mapCateogries(item.categories)}</div>
								<div className="label-review-price">
									<span className="label label-rating">{item.rating} stars</span>
									<span className="label label-reviews">{item.review_count} reviews</span>
									<span className="label label-price">{item.price}</span>
								</div>
								<div className="label label-address">{this.mapAddress(item.location.display_address)}</div>
								<div className="label-phone">{item.phone}</div>
								<div className="label-distance">{(item.distance * 0.000621371).toFixed(1)} miles</div>
							</div>
							<div className="right">
								<img src={item.image_url} alt="" />
							</div>
						</div>
					</InfoBox>}
				</Marker>
			})
		)
	}

	render() {
		return (
			<div>
				<GoogleMap
					defaultZoom={15}
					defaultCenter={{
						lat: 37.9081987,
						lng: -122.0568079,
					}}
					options={{
						    streetViewControl: false,
								disableDefaultUI: true,
								styles: mapStyle,
					}}
					ref="map"

				
				>
					{/* <MarkerWithLabel
						position={{ lat: -34.397, lng: 150.644 }}
						labelAnchor={new google.maps.Point(0, 0)}
						labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
					>
						<div>Hello There!</div>
					</MarkerWithLabel> */}
					{ this.state.markers.length > 0 ? 
						this.renderMarkers() 
						: null }
					{ this.state.geomarker.length > 0 ?
						this.renderCurrentLocationMarker()
						: null
					}
				</GoogleMap>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		location: state.location,
		search: state.search
	}
}

export default connect(mapStateToProps)(withGoogleMap(MapComponent));