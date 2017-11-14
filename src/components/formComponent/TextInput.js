import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
	FormGroup,
	Input,
	Label,
	FormFeedback
} from 'reactstrap'


class TextInput extends Component {

	render() {
		// let errorComponent = this.state.validateResult && this.state.validateResult.map((err, index) => {
		// 	return <FormFeedback key={index}>{err.message}</FormFeedback>
		// })
		let errorComponent = null;
		let { dirty, error, warning, invalid } = this.props.meta
		let valid = dirty === false ? null : !invalid
		
		if(!_.isEmpty(error)) {
			errorComponent = error.map((err, index) => {
				return <FormFeedback key={index}>{err.message}</FormFeedback>
			})
		}
		return (
			<FormGroup>
				<Label for={this.props.id}>{this.props.label}</Label>
				<Input
					{...this.props}
					valid={valid}
					onChange={this.props.input.onChange}
					value={this.props.input.value}
					/>
					{errorComponent}
			</FormGroup>
		)
	}
}

TextInput.propTypes = {
	// id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	// onValueChange: PropTypes.func.isRequired,
	// validateInput: PropTypes.func
}

export default TextInput