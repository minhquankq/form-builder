import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableComponent from '../components/TableComponent'

import { ActionCreators } from '../actions';

class ExampleTableComponent extends Component {

		constructor(props) {
				super(props);
				this.state = {
				}
		}

		componentDidMount() {
		}

		render() {
				return (
						<TableComponent url="https://vc_cmdb_dev.vng.com.vn/v1/server" />
				)
		}
}

export default connect(
	state => {
		return {}
	},
	dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })	
)(ExampleTableComponent)