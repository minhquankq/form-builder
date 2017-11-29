import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';


export default class ScrollDataTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filters: {}
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
				return <Cell 
									className={sortClassName} 
									key={f.name}
									onClick={this.handleSort.bind(this, f.name)}
								>{f.label}</Cell>
			} else {
				return <Cell key={f.name}>{f.label}</Cell>
			}
			
		})
		let filterComponent = fields.map(f => {
			if(f.searchable) {
				return (
					<Cell key={f.name}>
						<input
							onChange={value => this.handleFilterChange(f.name, value.target.value)} />
					</Cell>
				)
			} else {
				return <Cell key={f.name}></Cell>
			}
		})
		return (
			<thead>
				<Row>
					{fieldsComponent}
					<Cell>Actions</Cell>
				</Row>
				<Row>
					{filterComponent}
					<Cell></Cell>
				</Row>
			</thead>
		)
	}

	renderTableContent() {
		let {fields, data} = this.props
		let tableRowComponent = data.map((d, index) => {
			let cellComponent = fields.map((f, index) => {
				return (<Cell key={index}>{this.renderValue(_.get(d,f.name))}</Cell>)
			})
			return (
				<Row key={index}>
					{cellComponent}
					{/* <Cell>
						<i onClick={()=>this.props.handleAction('edit', d)} className="btn fa fa-pencil table-row-action edit" />
						<i onClick={()=>this.props.handleAction('delete', d)} className="btn fa fa-trash table-row-action delete" />
					</Cell> */}
				</Row>
			)
		})
		return tableRowComponent
	}

	render() {
		let {data, fields} = this.props
		return (
			<div style={{width: '100%', height: '400px'}}>
				<StickyTable>
					{/* {this.renderTableHeader()} */}
					{this.renderTableContent()}
        </StickyTable>
			</div>
		)
	}
}

ScrollDataTable.propTypes = {
	data: PropTypes.array.isRequired,
	fields: PropTypes.array.isRequired,
	filterData: PropTypes.func.isRequired,
	sortChange: PropTypes.func.isRequired
}