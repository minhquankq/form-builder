import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Select from 'react-select'
import {
	Button, 
	FormText,
	Input
} from 'reactstrap';

import * as FilterInput from '../../services/filterInput'

let CONFIG = {"fields":[{"value":"ticket_id","name":"ID"},{"value":"title","name":"Title"},{"value":"description","name":"Description"},{"value":"status","name":"Status"},{"value":"ticket_category_code","name":"Category"},{"value":"product_info.alias","name":"Product"},{"value":"fid_info.name","name":"Fabric"},{"value":"requester","name":"Requester"},{"value":"priority_id","name":"Priority"},{"value":"source_from","name":"Source from"},{"value":"is_service_catalog_request","name":"Is Service Catelog Request"},{"value":"assigned_to.email","name":"Assignee"},{"value":"expected_at","name":"Expected At"},{"value":"created_at","name":"Created At"},{"value":"closed_at","name":"Closed At"}],"types":{"ticket_id":"String","title":"String","description":"String","status":"Array","ticket_category_code":"Array","product_info.alias":"String","fid_info.name":"String","requester":"String","priority_id":"Array","source_from":"String","is_service_catalog_request":"Boolean","assigned_to.email":"Array","expected_at":"Datetime","created_at":"Datetime","closed_at":"Datetime"},"operators":{"Datetime":["At","NotAt","Before","BeforeOrAt","After","AfterOrAt","InThePast","InTheFuture","Empty","NotEmpty"],"Array":["Includes","Excepts","Anything","Empty","NotEmpty"],"String":["Equals","NotEquals","Empty","NotEmpty","StartsWith","EndsWith","Contains","NotContains","Anything","Same","Different"],"Boolean":["IsTrue","IsFalse","Anything","Empty","NotEmpty"]},"allowInput":{"Datetime":["At","NotAt","Before","BeforeOrAt","After","AfterOrAt"],"Array":["Includes","Excepts"],"String":["Equals","NotEquals","StartsWith","EndsWith","Contains","NotContains","Same","Different"]}}
const ALL_OPTION = {name: '*', label: 'All'}

export default class FilterRow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {},
			config: {}
		}
	}

	componentDidMount() {
		let data = this.props.data || {}
		this.setState({
			config: CONFIG,
			data: data
		})
	}

	handleChange(value, fieldName) {
		let {data, config} = this.state
		let {fields, types, operators, allowInput} = config;
		
		if(fieldName === 'field') {
			data = {}
		}
		data[fieldName] = value
		this.setState({data})
		this.props.filterChange(data)
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
		let {data, config} = this.state
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
	// config: PropTypes.array.isRequired
}