import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	FormGroup,
	Input,
	Label,
} from 'reactstrap'


class RadioButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null
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
		let {onValueChange, id} = this.props
		let value = event.target.value
		onValueChange(id, value);
		this.setState({
			value: value
		})
	}

	render() {
		let optionComponents = this.props.options.map(o => {
			return (
				<FormGroup className="form-checkbox" key={o.value}>
					<Label>
						<Input 
							type="radio"
							checked={this.state.value === o.value} 
							onChange={this._onValueChange.bind(this)}
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
				<Label>{this.props.name}</Label>
				{optionComponents}
			</FormGroup>
		)
	}
}

RadioButton.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onValueChange: PropTypes.func.isRequired
}

export default RadioButton