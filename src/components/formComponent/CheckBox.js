import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	FormGroup,
	Input,
	Label
} from 'reactstrap'


class CheckBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: {}
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

	_onValueChange(event, option) {
		let {onValueChange, id, multiple} = this.props
		let value = this.state.value
		if(multiple) {
			let checked = event.target.checked
			value[option.value] = checked
		} else {
			value = event.target.checked
		}
		onValueChange(id, value);
		this.setState({
			value: value
		})
		// let validateResult = null;
		// if(validateInput) {
		// 	validateResult = validateInput(id, value)
		// }
		// onValueChange(id, value);
		// this.setState({
		// 	value: value,
		// 	valid: validateResult.length === 0,
		// 	validateResult: validateResult
		// })
	}

	renderSingleCheckBox(props) {
		return (
			<FormGroup className="form-checkbox">
				<Label>
					<Input 
						type="checkbox"
						onChange={this._onValueChange.bind(this)}
						value={this.state.value}
					/>
					{' '}
					{props.name}
				</Label>
			</FormGroup>
		)
	}

	renderMultipleCheckBox(props) {
		let optionComponents = props.options.map(o => {
			return (
				<FormGroup className="form-checkbox" key={o.value}>
					<Label>
						<Input 
							type="checkbox"
							onChange={e => this._onValueChange(e, o)}
							value={this.state.value[o.value]}
						/>
						{' '}
						{o.label}
					</Label>
				</FormGroup>
			)
		})
		return (
			<FormGroup tag="fieldset">
				<Label>{props.name}</Label>
				{optionComponents}
			</FormGroup>
		)
	}
	
	render() {
		// let errorComponent = this.state.validateResult && this.state.validateResult.map((err, index) => {
		// 	return <FormFeedback key={index}>{err.message}</FormFeedback>
		// })
		let {multiple} = this.props
		if(multiple) 
			return this.renderMultipleCheckBox(this.props);
		else 
			return this.renderSingleCheckBox(this.props);
		// return (
		// 	<FormGroup>
		// 		<Label for={this.props.id}>{this.props.name}</Label>
		// 		<Input
		// 			{...this.props} 
		// 			valid={this.state.valid}
		// 			onChange={this._onValueChange.bind(this)}
		// 			value={this.state.value} />
		// 			{errorComponent}
		// 	</FormGroup>
		// )
	}
}

CheckBox.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onValueChange: PropTypes.func.isRequired
}

export default CheckBox