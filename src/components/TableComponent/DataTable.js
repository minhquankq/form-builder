import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import _ from 'lodash'

import TableCellTemplate from '../../services/tableCellTemplate'

export default class DataTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: {},
			isShowSubTable: {}
		}
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.dataTable).addEventListener('scroll', e => {
			let headerDom = ReactDOM.findDOMNode(this.headerTable)
			if(headerDom) {
				headerDom.scroll({left: e.srcElement.scrollLeft})
			}
		});
	}

	showSubTable(index) {
		let {isShowSubTable} = this.state
		isShowSubTable[index] = !isShowSubTable[index];
		this.setState({isShowSubTable})
	}

	handleSort(fieldName) {
		if(this.props.sortChange) {
			this.props.sortChange(fieldName);
		}
	}

	cellTemplate(row, field) {
		return TableCellTemplate(row, field);
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
									style={{width: 200}}
								>{f.label}</th>
			} else {
				return <th key={f.name} style={{width: 200}}>{f.label}</th>
			}
			
		})

		return (
			<thead>
				<tr>
					{fieldsComponent}
					<th style={{width: 200}}>Actions</th>
				</tr>
			</thead>
		)
	}

	renderTableContent() {
		let {isShowSubTable} = this.state
		let {fields, data} = this.props
		let fieldLength = fields.length + 1
		let tableRowComponent = data.map((d, index) => {
			let cellComponent = fields.map((f, index) => {
				return (<td key={index} style={{width: 200}}>{this.cellTemplate(d, f)}</td>)
			})
			return (
					[<tr key={index} onClick={this.showSubTable.bind(this, index)}>
						{cellComponent}
						<td style={{width: 200}}>
							<i onClick={()=>this.props.handleAction('edit', d)} className="btn fa fa-pencil table-row-action edit" />
							<i onClick={()=>this.props.handleAction('delete', d)} className="btn fa fa-trash table-row-action delete" />
						</td>
					</tr>,
					isShowSubTable[index] === true ? 
					<tr key={'sub' + index}>
						<td colSpan={fieldLength}>
						<table size="sm">
								<thead>
								<tr>
									<td>id</td>
									<td>title</td>
									<td>description</td>
									<td>email</td>
									<td>ola</td>
								</tr>
								</thead>
								<tbody>
									<tr>
										<td>id</td>
										<td>title</td>
										<td>description description</td>
										<td>email@vng.com.vn</td>
										<td>ola</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr> : null
					]
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
			<div>
				<div ref={(headerTable) => { this.headerTable = headerTable; }} className="table-header-fixed">
					<Table className="table table-component ">
						{this.renderTableHeader()}
					</Table>
				</div>
				<div className="table-fixed" ref={(dataTable) => { this.dataTable = dataTable; }}>
					<Table striped inverse bordered className="table table-component ">
						{/* {this.renderTableHeader()} */}
						{this.renderTableContent()}
					</Table>
				</div>
			</div>
		)
	}
}

DataTable.propTypes = {
	data: PropTypes.array.isRequired,
	fields: PropTypes.array.isRequired,
	sortChange: PropTypes.func.isRequired,
	subTable: PropTypes.bool,
	subTableKey: PropTypes.string
}