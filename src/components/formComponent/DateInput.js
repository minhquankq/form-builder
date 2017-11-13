import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SingleDatePicker } from 'react-dates';
import {
	FormGroup,
	Label,
} from 'reactstrap'


class DateInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			focused: false
		}
	}

	render() {
		let {input} =  this.props;
		return (
			<FormGroup>
				<Label for={this.props.id}>{this.props.label}</Label>
				<FormGroup>
					<SingleDatePicker
						showClearDate={true}
						showDefaultInputIcon={true}
						orientation={'vertical'}
						date={input.value}
						onDateChange={date => input.onChange(date)}
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