import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	FormGroup,
	Input,
	Label
} from 'reactstrap'


class CheckBox extends Component {

	multiValueChange(e, key) {
		let value = this.props.input.value || {};
		value[key] = e.target.checked;
		this.props.input.onChange(value);
	}

	renderSingleCheckBox() {
		return (
			<FormGroup className="form-checkbox">
				<Label>
					<Input 
						type="checkbox"
						onChange={this.props.input.onChange}
						value={this.props.input.value} 
					/>
					{' '}
					{this.props.label}
				</Label>
			</FormGroup>
		)
	}

	renderMultipleCheckBox() {
		let value = this.props.input.value || {};
		let optionComponents = this.props.options.map(o => {
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
				<Label>{this.props.label}</Label>
				{optionComponents}
			</FormGroup>
		)
	}
	
	render() {
		let {multiple} = this.props
		if(multiple) 
			return this.renderMultipleCheckBox();
		else 
			return this.renderSingleCheckBox();
	}
}

CheckBox.propTypes = {
	// id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	// onValueChange: PropTypes.func.isRequired
}

export default CheckBox