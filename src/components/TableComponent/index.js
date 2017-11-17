import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import logo from '../../logo.svg';
import { ActionCreators } from '../../actions';

import DataTable from './DataTable'
import TablePagination from './TablePagination';
import ConfigField from './ConfigField';

class TableComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sort:{}
		}
	}

	componentDidMount() {
		let {actions, url} = this.props
		actions.loadDataTable(url, 1)
	}

	handleChangePage(page) {
		let {actions, url, pagination} = this.props
		let {filter, sort} = this.state
		if(page < 1 || page > pagination.total ||page === pagination.page) return;
		actions.loadDataTable(url, page, filter, sort)
	}

	handleFilter(filter) {
		let {actions, url, pagination} = this.props
		let {sort} = this.state
		this.setState({filter})
		actions.loadDataTable(url, pagination.page, filter, sort)
	}

	handleSortChange(fieldName) {
		let {actions, url, pagination} = this.props
		let {sort, filter} = this.state
		if(_.isNil(sort[fieldName]) || sort[fieldName] === 0) {
			// sort = {}
			sort[fieldName] = 1;
		} else {
			if(sort[fieldName] === 1) {
				sort[fieldName] = -1
			} else {
				delete sort[fieldName]
			}
		}
		this.setState({sort})
		actions.loadDataTable(url, pagination.page, filter, sort)
	}

	renderHeaderActions() {
		return (
			<div className="header-actions">
				<ConfigField 
					fields={this.props.data.fields || []}
					submit={showFields => this.setState({showFields: showFields})}
					data={this.state.showFields} />
			</div>
		)
	}

	renderTableAndPagination() {
		let {data, fields} = this.props.data
		let {showFields, sort} = this.state
		let loadingComponent = null;
		let tableComponent = null;
		if(this.props.loading) {
			loadingComponent = 
				<div className="loading">
					<img src={logo} className="App-logo" alt="logo" />
				</div>
		} 
		if(!_.isEmpty(data) || !_.isEmpty(fields)) {
			if(!_.isEmpty(showFields)) {
				fields = fields.filter(f => showFields[f.name] === true)
			}
			tableComponent = (
				<div>
					<DataTable 
						data={data} 
						fields={fields}
						sort={sort}
						filterData={this.handleFilter.bind(this)} 
						sortChange={this.handleSortChange.bind(this)}
						/>
					<TablePagination 
						{...this.props.pagination} 
						handleChangePage={this.handleChangePage.bind(this)} 
						/>
				</div>
			)
		}
		return (
			<div>
				{loadingComponent}
				{tableComponent}
			</div>
		)
	}

	render() {
		return (
			<div>
				{this.renderHeaderActions()}
				{this.renderTableAndPagination()}
			</div>
		)
	}
}

TableComponent.propTypes = {
	url: PropTypes.string.isRequired
}

export default connect(
	state => {
		return {
			data: _.get(state, 'TableComponent.data', {}),
			loading: _.get(state, 'TableComponent.loading'),
			pagination: _.get(state, 'TableComponent.pagination', {}),
			display: _.get(state, 'form.ConfigDisplayForm.values')
		}
	},
	dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })	
)(TableComponent);