import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import _ from 'lodash'

import TableCellTemplate from '../../services/tableCellTemplate'

export default class RowSpanTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
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
									style={{width: f.width}}
								>{f.label}</th>
			} else {
				return <th key={f.name} style={{width: f.width}}>{f.label}</th>
			}
			
		})

		return (
			<thead>
				<tr>
					{fieldsComponent}
					<th style={{width: 300}}>Actions</th>
				</tr>
			</thead>
		)
	}

	renderTableContent() {
		let {isShowSubTable} = this.state
		let {fields, data, actionComponents, numOfColSpan = 0} = this.props
		let fieldLength = fields.length + 1

		let groupData = {};
		let tableRowComponent = []
		if(numOfColSpan > 0) {
			let colGroup = _.slice(fields, 0, numOfColSpan)
			groupData = _.groupBy(data, d => {
				return colGroup.map(c=> d[c.name]).join('#')
			})

			_.keys(groupData).map(key => {
				let arr= groupData[key]
				let length = arr.length
				
				tableRowComponent.push(arr.map((d, rowIndex) => {
					let cellComponent = []
					fields.forEach((f, colIndex) => {
						if(rowIndex === 0 ) {
							if(colIndex < numOfColSpan)
								cellComponent.push((<td key={colIndex} rowSpan={length} style={{width: f.width}} className="datatable-cell">{this.cellTemplate(d, f)}</td>))
							else {
								cellComponent.push((<td key={colIndex} style={{width: f.width}} className="datatable-cell">{this.cellTemplate(d, f)}</td>))
							}
						} else {
							if(colIndex >= numOfColSpan)
								cellComponent.push((<td key={colIndex} style={{width: f.width}} className="datatable-cell">{this.cellTemplate(d, f)}</td>))
						}
					})
					return (
							<tr key={rowIndex}>
								{cellComponent}
								<td style={{width: 300}}>
								{actionComponents && actionComponents(d)}
								</td>
							</tr>
					)
				}))
			})


		} else {
			tableRowComponent = data.map((d, index) => {
				let cellComponent = fields.map((f, index) => {
					return (<td key={index} style={{width: 200}} className="datatable-cell">{this.cellTemplate(d, f)}</td>)
				})
				return (
						<tr key={index} onClick={this.showSubTable.bind(this, index)}>
							{cellComponent}
							<td style={{width: 200}}>
								<i onClick={()=>this.props.handleAction('edit', d)} className="btn fa fa-pencil table-row-action edit" />
								<i onClick={()=>this.props.handleAction('delete', d)} className="btn fa fa-trash table-row-action delete" />
							</td>
						</tr>
				)
			})
		}

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
					<Table bordered className="table table-component ">
						{/* {this.renderTableHeader()} */}
						{this.renderTableContent()}
					</Table>
				</div>
			</div>
		)
	}
}

RowSpanTable.propTypes = {
	data: PropTypes.array.isRequired,
	fields: PropTypes.array.isRequired,
	sortChange: PropTypes.func.isRequired,
	subTable: PropTypes.bool,
	subTableKey: PropTypes.string
}