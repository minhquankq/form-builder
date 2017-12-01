import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import { Button } from 'reactstrap';
// import logo from '../../logo.svg';
import { ActionCreators } from '../../actions';

// import ScrollDataTable from './ScrollDataTable'
import DataTable from './DataTable'
// import Create from './Create';
import TablePagination from './TablePagination';
import ConfigField from './ConfigField';
import Edit from './Edit';
import AdvanceFilter from './AdvanceFilter'
import SimpleFilter from './SimpleFilter';
import RowSpanTable from './RowSpanTable';

class TableComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sort:{},
			numberPage: 10
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
		pagination.page = page
		actions.loadDataTable(url, pagination, filter, sort)
	}

	handleNumPerPageChange(num) {
		let {actions, url, pagination} = this.props
		let {filter, sort} = this.state
		pagination.numPerpage = num
		actions.loadDataTable(url, pagination, filter, sort)
	}

	reload() {
		let {actions, url, pagination} = this.props
		let {filter, sort} = this.state
		actions.loadDataTable(url, pagination, filter, sort)
	}

	handleFilter(filter) {
		let {actions, url, pagination} = this.props
		let {sort} = this.state
		this.setState({filter})
		actions.loadDataTable(url, pagination, filter, sort)
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
		actions.loadDataTable(url, pagination, filter, sort)
	}

	handleAction(actionName, value) {
		let {actions, url} = this.props
		switch(actionName) {
			case 'edit':
				actions.loadEdit(url, value); // maybe url + id
				break;
			case 'delete':
				actions.remove(url, value);
				break;
			default:
				return;
		}
	}

	renderHeaderActions() {
		return (
			<div className="header-actions row">
				<ConfigField 
					fields={this.props.data.fields || []}
					submit={showFields => this.setState({showFields: showFields})}
					data={this.state.showFields} />
				<AdvanceFilter url={this.props.url} />	
				{/* <Create url={this.props.url} /> */}
				<div>
					<Button outline color="info" onClick={this.reload.bind(this)} >
						<i className="fa fa-refresh"/> Reload
					</Button>
				</div>
			</div>
		)
	}

	renderTableAndPagination() {
		let {actionComponents} = this.props
		let {data, fields} = this.props.data
		let {showFields, sort} = this.state
		// let tableComponent = null;

		// if(!_.isEmpty(data) || ) {
		if(!_.isEmpty(fields) && !_.isEmpty(showFields)  ) {
			fields = fields.filter(f => showFields[f.name] === true)
		}
		let tableComponent = (
			<div>
				{/* <DataTable 
					data={data || []} 
					fields={fields || []}
					sort={sort}
					sortChange={this.handleSortChange.bind(this)}
					handleAction={this.handleAction.bind(this)}
					hasSubTable={false}
					actionComponents={actionComponents}
					/> */}
				<RowSpanTable 
					data={data || []} 
					fields={fields || []}
					sort={sort}
					sortChange={this.handleSortChange.bind(this)}
					actionComponents={actionComponents}
					numOfColSpan={2}
					/>
				<TablePagination 
					{...this.props.pagination} 
					onChangeNumPerPage={this.handleNumPerPageChange.bind(this)}
					handleChangePage={this.handleChangePage.bind(this)} 
				/>
			</div>
		)
		// }
		return (
			<div>
				<Loading show={this.props.loading} color="red" />
				{tableComponent}
			</div>
		)
	}

	render() {
		return (
			<div>
				{this.renderHeaderActions()}
				<SimpleFilter />
				{this.renderTableAndPagination()}
				<Edit url={this.props.url} />
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
			pagination: _.get(state, 'TableComponent.pagination', {page: 0, total: 0}),
			display: _.get(state, 'form.ConfigDisplayForm.values')
		}
	},
	dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })	
)(TableComponent);