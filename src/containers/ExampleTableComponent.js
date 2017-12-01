import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {ActionCreators} from '../actions'
import TableComponent from '../components/TableComponent'
import { Button } from 'reactstrap';

class ExampleTableComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			url: 'http://demo2002634.mockable.io/users'
			// url: 'https://vc_itsm_dev.vng.com.vn/v1/ticket'
		}
	}

	renderActionComponent(row) {
		return (
			<div>
				<Button className="table-row-action" size="sm" color="info">Edit</Button>
				<Button className="table-row-action" size="sm" color="danger">Remove</Button>
				<Button className="table-row-action" size="sm" color="info">Extend</Button>
			</div>
		)
	}

	render() {
			return (
				<div style={{margin: 20}}>
					<TableComponent url={this.state.url} actionComponents={this.renderActionComponent.bind(this)} />
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