import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	FormGroup,
	Input,
	Label
} from 'reactstrap'


class CheckBox extends Component {

	multiValueChange(e, key) {
		console.log(e.checked)
		let value = this.props.input.value || {};
		value[key] = e.target.checked;
		this.props.input.onChange(value);
	}

	renderSingleCheckBox(props) {
		return (
			<FormGroup className="form-checkbox">
				<Label>
					<Input 
						type="checkbox"
						onChange={props.input.onChange}
						value={props.input.value} 
					/>
					{' '}
					{props.label}
				</Label>
			</FormGroup>
		)
	}

	renderMultipleCheckBox(props) {
		let value = props.input.value || {};
		let optionComponents = props.options.map(o => {
			return (
				<FormGroup className="form-checkbox" key={o.value}>
					<Label>
						<Input 
							type="checkbox"
							onChange={e => this.multiValueChange(e, o.value)}
							value={value[o.value]}
						/>
						{' '}
						{o.label}
					</Label>
				</FormGroup>
			)
		})
		return (
			<FormGroup tag="fieldset">
				<Label>{props.label}</Label>
				{optionComponents}
			</FormGroup>
		)
	}
	
	render() {
		let {multiple} = this.props
		if(multiple) 
			return this.renderMultipleCheckBox(this.props);
		else 
			return this.renderSingleCheckBox(this.props);
	}
}

CheckBox.propTypes = {
	// id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	// onValueChange: PropTypes.func.isRequired
}

export default CheckBox