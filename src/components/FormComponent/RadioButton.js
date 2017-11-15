import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	FormGroup,
	Input,
	Label,
} from 'reactstrap'


class RadioButton extends Component {

	render() {
		let optionComponents = this.props.options.map(o => {
			return (
				<FormGroup className="form-checkbox" key={o.value}>
					<Label>
						<Input 
							type="radio"
							checked={this.props.input.value === o.value} 
							onChange={e => this.props.input.onChange(e.target.value)}
							value={o.value}
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
}

RadioButton.propTypes = {
	// id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	// onValueChange: PropTypes.func.isRequired
}

export default RadioButton