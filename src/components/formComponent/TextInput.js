import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	FormGroup,
	Input,
	Label,
	FormFeedback
} from 'reactstrap'


class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	componentDidMount() {
		let value = this.props.value
		if(value) {
			this.setState({
				value: value
			})
		}
	}

	handleChangeValue(event) {
		let {onValueChange, validateInput, id} = this.props
		let value = event.target.value
		let validateResult = null;
		if(validateInput) {
			validateResult = validateInput(id, value)
		}
		onValueChange(id, value);
		this.setState({
			value: value,
			valid: validateResult.length === 0,
			validateResult: validateResult
		})
	}

	render() {
		let errorComponent = this.state.validateResult && this.state.validateResult.map((err, index) => {
			return <FormFeedback key={index}>{err.message}</FormFeedback>
		})
		let {validateInput, onValueChange, ...transferProps} = this.props
		return (
			<FormGroup>
				<Label for={this.props.id}>{this.props.name}</Label>
				<Input
					{...transferProps}
					valid={this.state.valid}
					onChange={this.handleChangeValue.bind(this)}
					value={this.state.value} />
					{errorComponent}
			</FormGroup>
		)
	}
}

TextInput.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onValueChange: PropTypes.func.isRequired,
	validateInput: PropTypes.func
}

export default TextInput