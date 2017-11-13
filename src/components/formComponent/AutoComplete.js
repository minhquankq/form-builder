import 'react-select/dist/react-select.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Select from 'react-select';
import {
	FormGroup,
	Label
} from 'reactstrap'

class AutoComplete extends Component {

	loadOptions(input) {
		let url = this.props.url
		return fetch(`${url}?q=${input}`)
		.then((response) => {
      return response.json();
    }).then((json) => {
      return { options: json };
    });
	}

	renderStaticSelect() {
		return (
			<FormGroup>
				<Label for={this.props.id}>{this.props.label}</Label>
				<Select 
					{...this.props} 
					onChange={this.props.input.onChange}
					value={this.props.input.value} 
					matchPos="start"
					/>
			</FormGroup>
		)
	}

	renderAsynSelect() {
		return (
			<FormGroup>
				<Label for={this.props.id}>{this.props.name}</Label>
				<Select.Async
					{...this.props} 
					onChange={this.props.input.onChange}
					loadOptions={this.loadOptions.bind(this)}
					value={this.props.input.value}
					/>
			</FormGroup>
		)
	}

	render() {
		let {async} = this.props
		if(async) 
			return this.renderAsynSelect();
		else 
			return this.renderStaticSelect();
	}
}

AutoComplete.propTypes = {
	// id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	// onValueChange: PropTypes.func.isRequired
}

export default AutoComplete