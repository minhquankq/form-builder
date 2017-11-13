import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SingleDatePicker } from 'react-dates';
import moment from 'moment'
import _ from 'lodash'
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
		let value = input.value
		if(_.isEmpty(value)) {
			value = null;
		} else if(typeof(value) === "string") {
			value = moment(value)
		}
		return (
			<FormGroup>
				<Label>{this.props.label}</Label>
				<FormGroup>
					<SingleDatePicker
						showClearDate={true}
						showDefaultInputIcon={true}
						date={value}
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
	// id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	// onValueChange: PropTypes.func.isRequired
}

export default DateInput