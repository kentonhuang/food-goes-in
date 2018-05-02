import React, { Component } from 'react';

class MoreFilters extends Component {

	render() {
		return (
			<div className="more-filters-container">
				<form className="more-filters-form">
					<div className="distance-filter">
						<span>
							Distance
										<div>
								<label>
									<input
										className="radio-button"
										type="radio"
										value="1609"
										checked={this.props.selectedState.distance === '1609'}
										onChange={this.props.handleOption}
									/>
									1 mile
											</label>
							</div>
							<div>
								<label>
									<input
										className="radio-button"
										type="radio"
										value="3218"
										checked={this.props.selectedState.distance === '3218'}
										onChange={this.props.handleOption}
									/>
									2 miles
											</label>
							</div>
							<div>
								<label>
									<input
										className="radio-button"
										type="radio"
										value="8046"
										checked={this.props.selectedState.distance === '8046'}
										onChange={this.props.handleOption}
									/>
									5 miles
											</label>
							</div>
							<div>
								<label>
									<input
										className="radio-button"
										type="radio"
										value="16093"
										checked={this.props.selectedState.distance === '16093'}
										onChange={this.props.handleOption}
									/>
									10 miles
											</label>
							</div>
						</span>
					</div>
					<div className="price-filter">
						<span>
							Price
										<div>
								<label>
									<input
										className="radio-button"
										type="checkbox"
										value="1"
										checked={this.props.selectedState.price.includes('1')}
										onChange={this.props.handlePrice}
									/>
									$
											</label>
							</div>
							<div>
								<label>
									<input
										className="radio-button"
										type="checkbox"
										value="2"
										checked={this.props.selectedState.price.includes('2')}
										onChange={this.props.handlePrice}
									/>
									$$
											</label>
							</div>
							<div>
								<label>
									<input
										className="radio-button"
										type="checkbox"
										value="3"
										checked={this.props.selectedState.price.includes('3')}
										onChange={this.props.handlePrice}
									/>
									$$$
											</label>
							</div>
							<div>
								<label>
									<input
										className="radio-button"
										type="checkbox"
										value="4"
										checked={this.props.selectedState.price.includes('4')}
										onChange={this.props.handlePrice}
									/>
									$$$$
											</label>
							</div>
						</span>
					</div>
					<span>
						Features
										<div>
							<input
								className="radio-button"
								type="checkbox"
								value={true}
								checked={this.props.selectedState.openNow}
								onChange={this.props.handleOpenNow}
							/>
							Open Now
										</div>
					</span>
				</form>
			</div>
		);
	}
}

export default MoreFilters;