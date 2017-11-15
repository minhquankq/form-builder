import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import _ from 'lodash'
import { Input } from 'reactstrap'

export default class DataTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: {}
		}
	}
	
	handleFilterChange(key, value) {
		let filter = this.state.filter || {};
		filter[key] = value;

		this.setState({
			filter: filter
		})
	}

	renderTableHeader() {
		let {fields} = this.props
		let {filter} = this.state
		let fieldsComponent = fields.map(f => <th className={f.sortable === true ? 'sortable' : ''} key={f.name}>{f.label}</th>)
		let filterComponent = fields.map(f => {
			if(f.searchable) {
				return (
					<th key={f.name}>
						<input 
							// value={filter[f.name]} 
							onChange={value => this.handleFilterChange(f.name, value.target.value)} />
					</th>
				)
			} else {
				return <th key={f.name}></th>
			}
		})
		return (
			<thead>
				<tr>{fieldsComponent}</tr>
				<tr>{filterComponent}</tr>
			</thead>
		)
	}

	renderValue(value, isList) {
		if(typeof(value) === 'string') {
			if(isList) {
				return <li key={value}>{value}</li>
			} else {
				return <span key={value}>{value}</span>;
			}
		} else if (typeof(value) === 'object') {
			if(Array.isArray(value)) {
				// Array
				let itemComponent = value.map(v => this.renderValue(v, true));
				return (
					<ul>
						{itemComponent}
					</ul>
				)
			} else {
				// Object
				let itemComponent = _.keys(value).map(k => <li key={k}><strong>{k}</strong> {this.renderValue(value[k])}</li>)
				return (
					<ul key={Math.random()}>
						{itemComponent}
					</ul>
				) 
			}
		}
	}

	renderTableContent() {
		let {fields, data} = this.props
		let tableRowComponent = data.map((d, index) => {
			let cellComponent = fields.map((f, index) => {
				return (<td key={index}>{this.renderValue(_.get(d,f.name))}</td>)
			})
			return (
				<tr key={index}>
					{cellComponent}
				</tr>
			)
		})
		return (
			<tbody>
				{tableRowComponent}
			</tbody>
		)
	}
	render() {
		return (
			<Table striped hover responsive className="table table-fixed">
				{this.renderTableHeader()}
				{this.renderTableContent()}
			</Table>
		)
	}
}

DataTable.propTypes = {
	data: PropTypes.array.isRequired,
	fields: PropTypes.array.isRequired,
}