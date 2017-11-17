import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import _ from 'lodash'

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
		// call api to filter data
		this.setState({
			filter: filter
		})
		this.filterData(filter)
	}

	handleSort(fieldName) {
		this.props.sortChange(fieldName);
	}

	filterData(filter) {
		if(_.isEmpty(this.timer)) {
			clearTimeout(this.timer)
		}
		this.timer = setTimeout(() => {
			this.props.filterData(filter);
		}, 500)
	}

	renderTableHeader() {
		let {fields, sort} = this.props
		let fieldsComponent = fields.map(f => {
			if(f.sortable === true) {
				let sortClassName = 'sortable';
				if(sort[f.name] === 1) {
					sortClassName = 'sort-increase'
				} else if(sort[f.name] === -1) {
					sortClassName = 'sort-decrease'
				}
				return <th 
									className={sortClassName} 
									key={f.name}
									onClick={this.handleSort.bind(this, f.name)}
								>{f.label}</th>
			} else {
				return <th key={f.name}>{f.label}</th>
			}
			
		})
		let filterComponent = fields.map(f => {
			if(f.searchable) {
				return (
					<th key={f.name}>
						<input
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
			<tbody className="">
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
	filterData: PropTypes.func.isRequired,
	sortChange: PropTypes.func.isRequired
}