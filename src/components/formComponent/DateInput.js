import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SingleDatePicker } from 'react-dates';
import {
	FormGroup,
	Label,
} from 'reactstrap'


class DateInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

	_onValueChange(date) {
		let {onValueChange, id} = this.props
		let value = date
		onValueChange(id, value);
		this.setState({
			value: value
		})
	}

	render() {
		return (
			<FormGroup>
				<Label for={this.props.id}>{this.props.name}</Label>
				<FormGroup>
					<SingleDatePicker
						showClearDate={true}
						showDefaultInputIcon={true}
						orientation={'vertical'}
						date={this.state.value}
						onDateChange={date => this._onValueChange(date)}
						focused={this.state.focused}
						onFocusChange={({ focused }) => this.setState({ focused })}
					/>
				</FormGroup>
			</FormGroup>
		)
	}
}

DateInput.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onValueChange: PropTypes.func.isRequired
}

export default DateInput