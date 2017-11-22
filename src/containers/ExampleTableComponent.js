import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Input} from 'reactstrap'
import {ActionCreators} from '../actions'
import TableComponent from '../components/TableComponent'

class ExampleTableComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			url: 'http://demo2002634.mockable.io/users'
		}
	}
		render() {
				return (
					<div style={{margin: 20}}>
						{/* <code>https://vc_itsm_dev.vng.com.vn/v1/ticket</code>
						<code>https://vc_cmdb_dev.vng.com.vn/v1/product</code>
						<hr />
						<Input value={this.state.url} onChange={(value) => this.setState({url: value.target.value})} /> */}
						{/* <TableComponent url="https://vc_itsm_dev.vng.com.vn/v1/ticket" /> */}
						<TableComponent url={this.state.url} />
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