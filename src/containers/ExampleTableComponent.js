import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {ActionCreators} from '../actions'
import TableComponent from '../components/TableComponent'

class ExampleTableComponent extends Component {
		render() {
				return (
					<div>
						{/* <TableComponent url="https://vc_itsm_dev.vng.com.vn/v1/ticket" /> */}
						<TableComponent url="https://vc_cmdb_dev.vng.com.vn/v1/product" />
					</div>
				)
		}
}

export default connect(state => {
		return {}
}, dispatch => ({
		actions: bindActionCreators(ActionCreators, dispatch),
		dispatch
}))(ExampleTableComponent)