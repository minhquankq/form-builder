import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { SingleDatePicker } from 'react-dates';
import Datetime from 'react-datetime'
import moment from 'moment'
// import _ from 'lodash'
import {
	FormGroup,
	Label,
} from 'reactstrap'

import '../../react-datetime.css';


class DateInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			focused: false
		}
	}

	onChange(value) {
		let {renderTime, input} = this.props
		if(renderTime) {
			input.onChange(value.format());
		} else {
			input.onChange(value.format('YYYY-MM-DD'));
		}
	}

	render() {
		let {input} =  this.props;
		let value = moment(input.value)

		return (
			<FormGroup>
				<Label>{this.props.label}</Label>
				<FormGroup>
					{/* <SingleDatePicker
						showClearDate={true}
						showDefaultInputIcon={true}
						date={value}
						onDateChange={date => input.onChange(date)}
						focused={this.state.focused}
						onFocusChange={({ focused }) => this.setState({ focused })}
					/> */}
					<Datetime 
						onChange={this.onChange.bind(this)}
						value={value} 
						closeOnSelect={true} 
						timeConstraints={{ minutes: { step: 5 }}}
						dateFormat="YYYY-MM-DD"
						timeFormat={this.props.renderTime}
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