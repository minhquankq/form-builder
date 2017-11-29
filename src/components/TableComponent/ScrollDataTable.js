import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {Button} from 'primereact/components/button/Button';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';

import TableCellTemplate from '../../services/tableCellTemplate'

export default class ScrollDataTable extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	actionTemplate(row, column) {
		return (
			<div>
				<Button 
					type="button" 
					icon="fa-edit" 
					className="ui-button-warning"
					onClick={()=>this.props.handleAction('edit', row)}
				></Button>
				<Button 
					type="button" 
					icon="fa-remove" 
					className="ui-button-danger"
					onClick={()=>this.props.handleAction('delete', row)}
					></Button>
			</div>
		)
	}

	onLazyLoad(event) {
		// let filter = {}
		let sort = {}
		// if(!_.isEmpty(event.filters)) {
		// 	_.keys(event.filters).forEach(f => {
		// 		filter[f] = event.filters[f].value
		// 	})
		// }
		if(!_.isEmpty(event.sortField)) {
			sort[event.sortField] = event.sortOrder
		}
		
		if(_.isEmpty(this.timer)) {
			clearTimeout(this.timer)
		}
		this.timer = setTimeout(() => {
			this.props.handleReload(sort);
		}, 500)
		
	}

	cellTemplate(row, column) {
		return TableCellTemplate(row, column.columnData);
	}

	render() {
		let {data, fields} = this.props
		return (
			<div>
			<DataTable 
				value={data} 
				scrollable={true} 
				scrollHeight="300px" 
				lazy={true} 
				onLazyLoad={this.onLazyLoad.bind(this)}
				frozenWidth="200px"
				>
				{!_.isEmpty(fields) && fields.map(f => {
					return <Column 
										key={f.name} 
										field={f.name} 
										header={f.label}
										columnData={f}
										className="scoll-table-column" 
										sortable={f.sortable === true} 
										// filter={f.searchable === true}
										body={this.cellTemplate.bind(this)}
										// frozen={f.name === 'code'}
										/>
				})}
				<Column body={this.actionTemplate.bind(this)} style={{textAlign:'center', width: '6em'}}/>
			</DataTable>
			</div>
		)
	}
}

ScrollDataTable.propTypes = {
	data: PropTypes.array,
	fields: PropTypes.array,
	handleAction: PropTypes.func.isRequired,
	handleReload: PropTypes.func.isRequired
}