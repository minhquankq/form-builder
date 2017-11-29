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
let CONFIG = [
  {
    "name": "equals",
    "label": "Equals",
    "type": "String",
    "fields": [
			{name: 'title', label: 'Title'},
			{name: 'description', label: 'Description'}
		],
		default: true
  },
  {
    "name": "equals",
    "label": "Equals number",
    "type": "NumberLong",
    "fields": [
			{name: 'salary', label: 'Salary'}
		]
	},
	{
    "name": "between",
    "label": "Date Range",
    "type": "DateTime",
    "fields": [
			{name: 'create_at', label: 'Create At'}
		]
  }
]
const ALL_OPTION = {name: '*', label: 'All'}

export default class FilterRow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {}
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
		let {data} = this.state

		if(fieldName === 'operator') {
			data = {}
		} else if(fieldName === 'fields' && !_.isEmpty(value) && value.length > 1) {
			// if the selected value contain all and other field, 
			//remove the all option, if select other field and select all, then remove other fields
			let lastSelected = _.last(value);
			if(lastSelected.name === '*') {
				value = [lastSelected]
			} else {
				value = value.filter(v => v.name !== '*')
			}
		}

		data[fieldName] = value
		this.setState({data})
		this.props.filterChange(data)
	}

	renderValueInput(type) {
		let input = FilterInput[type]
		if(input) {
			return (
				<div>
					{input(v => this.handleChange(v, 'value'))}
					<FormText>Input value</FormText>
				</div>
			) 
		} else {
			return null;
		}
	}

	render() {
		let {config, data} = this.state
		let fields = _.get(data, 'operator.fields', [])
		fields = _.concat([ALL_OPTION], fields)
		let type = _.get(data, 'operator.type')

		return (
			<div>
				<div className="row">
					<div className="filter-operator col-md-4">
						<Select
							name="operator"
							options={config}
							onChange={(v) => this.handleChange(v, 'operator')}
							labelKey={'label'}
							valueKey={'name'}
							placeholder={'Select operator'}
							value={data.operator}
						/>
						<FormText>Choose operator</FormText>
					</div>
					<div className="filter-fields col-md-4">
						<Select
							name="fields"
							options={fields}
							onChange={(v) => this.handleChange(v, 'fields')}
							labelKey={'label'}
							valueKey={'name'}
							placeholder={'Select Fields'}
							value={data.fields}
							multi={true}
						/>
						<FormText>Choose operator</FormText>
					</div>
					<div className="filter-value-input col-md-4">
						{this.renderValueInput(type)}
					</div>
				</div>
			</div>
		)
	}
}

FilterRow.propTypes = {
	// config: PropTypes.array.isRequired
}