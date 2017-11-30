import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Select from 'react-select'
import {
	FormText
} from 'reactstrap';

import * as FilterInput from '../../services/filterInput'

export default class FilterRow extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {
		
	}

	handleChange(value, fieldName) {
		let {data} = this.props
		if(fieldName === 'field') {
			// Clear selected
			data = {}
		}
		data[fieldName] = value
		this.props.onChange(data)
	}

	renderValueInput(type, value, props) {
		let input = FilterInput[type]

		if(input) {
			return (
				<div>
					{input(value, v => this.handleChange(v, 'value'), props)}
					<FormText>Input value</FormText>
				</div>
			) 
		} else {
			return null;
		}
	}

	render() {
		let {data, config} = this.props
		let {fields, types, operators, allowInput, moreConfig} = config;
		let fieldName = _.get(data, 'field.value');
		let type = _.get(types, fieldName);
		let operator = _.get(data, 'operator.value');
		let value = _.get(data, 'value')
		let isRenderInput = _.indexOf(_.get(allowInput, type, []), operator) !== -1

		let operatorOptions = []
		if(!_.isEmpty(operators) && !_.isEmpty(operators[type])) {
			operatorOptions = operators[type].map(o=> {return {value: o, name: o}})
		}
		return (
			<div>
				<div className="row">
					<div className="filter-operator col-md-4">
						<Select
							name="fields"
							options={fields}
							onChange={(v) => this.handleChange(v, 'field')}
							labelKey={'name'}
							valueKey={'value'}
							placeholder={'Select field'}
							value={data.field}
						/>
						<FormText>Choose fields</FormText>
					</div>
					<div className="filter-fields col-md-4">
						<Select
							name="operator"
							options={operatorOptions}
							onChange={(v) => this.handleChange(v, 'operator')}
							labelKey={'name'}
							valueKey={'value'}
							placeholder={'Select operator'}
							value={data.operator}
						/>
						<FormText>Choose operator</FormText>
					</div>
					<div className="filter-value-input col-md-4">
						{isRenderInput && this.renderValueInput(type, value, _.get(moreConfig, `${operator}.${fieldName}`))}
					</div>
				</div>
			</div>
		)
	}
}

FilterRow.propTypes = {
	data: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	config: PropTypes.object.isRequired
}