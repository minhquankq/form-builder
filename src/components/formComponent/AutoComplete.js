import 'react-select/dist/react-select.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Select from 'react-select';
import {
	FormGroup,
	Label
} from 'reactstrap'

class AutoComplete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: {}
		}
	}

	componentDidMount() {
		let {value} = this.props
		this.setState({
			value: value
		})
	}
	
	loadOptions(input) {
		let url = this.props.url
		return fetch(`${url}?q=${input}`)
		.then((response) => {
      return response.json();
    }).then((json) => {
      return { options: json };
    });
	}
	
	_onSelectedChange(value) {
		this.props.onValueChange(this.props.id, value)
		this.setState({
			value: value
		})
	}

	renderStaticSelect() {
		return (
			<FormGroup>
				<Label for={this.props.id}>{this.props.name}</Label>
				<Select 
					{...this.props} 
					onChange={this._onSelectedChange.bind(this)}
					value={this.state.value} 
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
					onChange={this._onSelectedChange.bind(this)}
					loadOptions={this.loadOptions.bind(this)}
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
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onValueChange: PropTypes.func.isRequired
}

export default AutoComplete