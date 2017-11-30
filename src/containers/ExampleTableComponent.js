import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {ActionCreators} from '../actions'
import TableComponent from '../components/TableComponent'

class ExampleTableComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// url: 'http://demo2002634.mockable.io/users'
			url: 'https://vc_itsm_dev.vng.com.vn/v1/ticket'
		}
	}
	render() {
			return (
				<div style={{margin: 20}}>
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