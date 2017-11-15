import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import logo from '../../logo.svg';
import { ActionCreators } from '../../actions';

import DataTable from './DataTable'
import TablePagination from './TablePagination';

class TableComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		let {actions, url} = this.props
		actions.loadDataTable(url, 1)
	}

	handleChangePage(page) {
		let {actions, url} = this.props
		actions.loadDataTable(url, page)
	}

	render() {
		let {data, fields} = this.props.data
		let loadingComponent = null;
		let tableComponent = null;
		if(this.props.loading) {
			loadingComponent = <div className="loading"><img src={logo} className="App-logo" alt="logo" /></div>
		} 
		if(!_.isEmpty(data) || !_.isEmpty(fields)) {
			tableComponent = (
				<div>
					<DataTable 
						data={data} 
						fields={fields} />
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
}

TableComponent.propTypes = {
	url: PropTypes.string.isRequired
}

export default connect(
	state => {
		return {
			data: _.get(state, 'TableComponent.data', {}),
			loading: _.get(state, 'TableComponent.loading'),
			pagination: _.get(state, 'TableComponent.pagination', {})
		}
	},
	dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })	
)(TableComponent);